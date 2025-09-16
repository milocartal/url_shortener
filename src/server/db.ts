import { createClient } from "redis";
import { env } from "~/env";

export const redisClient = createClient({ url: env.REDIS_URL }).on(
  "error",
  (error) => {
    console.error("Redis client error", error);
  },
);

await redisClient.connect();
