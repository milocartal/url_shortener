import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { env } from "~/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatShortUrl(key: string) {
  const final = env.BASE_URL.endsWith("/")
    ? `${env.BASE_URL}${key}`
    : `${env.BASE_URL}/${key}`;

  return final;
}

export function extractKeyFromShortUrl(shortUrl: string) {
  const key = shortUrl.replace(env.BASE_URL, "");
  return key.startsWith("/") ? key.slice(1) : key;
}
