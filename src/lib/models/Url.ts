export type RedisUrl = {
  shortUrl: string;
  originalUrl: string | null;
};

export type UrlData = {
  url: string;
  createdAt: Date;
  expTime?: number;
  isTemp: boolean;
};

export type StoredUrl = {
  shortUrl: string;
  urlData: UrlData;
};
