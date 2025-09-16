import { TRPCError } from "@trpc/server";
import shortid from "shortid";
import { z } from "zod";
import { extractKeyFromShortUrl, formatShortUrl } from "~/lib/utils";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { redisClient } from "~/server/db";

export const urlRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ shorten: z.string() }))
    .query(async ({ input }) => {
      const url = await redisClient.get(input.shorten);

      if (!url) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No URL found for shorten: ${input.shorten}`,
        });
      }

      return { url };
    }),

  list: publicProcedure.query(async () => {
    const keys = await redisClient.keys("*");
    const urls = await Promise.all(
      keys.map(async (key) => {
        const originalUrl = await redisClient.get(key);
        const shortUrl = formatShortUrl(key);
        return { shortUrl, originalUrl };
      }),
    );
    return urls;
  }),

  shorten: publicProcedure
    .input(z.object({ url: z.string().url() }))
    .mutation(async ({ input }) => {
      let id = shortid.generate();
      while (await redisClient.get(`${id}`)) {
        id = shortid.generate();
      }

      const shortUrl = formatShortUrl(id);

      await redisClient
        .set(id, input.url)
        .then(() => {
          console.log(`URL shortened: ${input.url} -> ${shortUrl}`);
        })
        .catch((error) => {
          console.error("Error setting value in Redis", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to shorten URL",
          });
        });

      return { shortUrl };
    }),

  delete: publicProcedure
    .input(z.object({ shorten: z.string() }))
    .mutation(async ({ input }) => {
      const result = await redisClient.del(
        extractKeyFromShortUrl(input.shorten),
      );
      if (result === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No URL found for shorten: ${input.shorten}`,
        });
      }
      return { success: true };
    }),
});
