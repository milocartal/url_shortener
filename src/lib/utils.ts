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

export function formatDuration(seconds: number): string {
  const units = [
    { label: "an", value: 31536000 },
    { label: "mois", value: 2592000 },
    { label: "semaine", value: 604800 },
    { label: "jour", value: 86400 },
    { label: "heure", value: 3600 },
    { label: "minute", value: 60 },
    { label: "seconde", value: 1 },
  ];

  for (const unit of units) {
    if (seconds >= unit.value) {
      const count = Math.floor(seconds / unit.value);
      return `${count} ${unit.label}${count > 1 && unit.label !== "mois" ? "s" : ""}`;
    }
  }
  return "0 seconde";
}
