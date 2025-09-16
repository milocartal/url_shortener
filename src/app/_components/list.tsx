"use client";

import type { RedisUrl } from "~/lib/models/Url";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ShortUrlEmpty: React.FC = () => {
  return (
    <div className="flex w-full flex-col rounded-md bg-white p-4">
      <p className="text-muted-foreground break-all">
        Aucune URL courte créée pour le moment.
      </p>
    </div>
  );
};

const ShortUrlElement: React.FC<{
  urlObject: RedisUrl;
}> = ({ urlObject }) => {
  const router = useRouter();

  const deleteUrl = api.url.delete.useMutation({
    onSuccess: () => {
      toast.success("URL courte supprimée avec succès");
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Une erreur est survenue ", {
        description: error.message,
      });
    },
  });

  async function handleDelete() {
    await deleteUrl.mutateAsync({ shorten: urlObject.shortUrl });
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(urlObject.shortUrl);
    toast.success("URL courte copiée dans le presse-papiers");
  }

  return (
    <div className="flex w-full flex-col gap-4 rounded-md bg-white p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-2">
        <p className="break-all">
          <strong>Original URL:</strong> {urlObject.originalUrl}
        </p>
        <p className="break-all">
          <strong>Short URL:</strong>{" "}
          <a
            href={urlObject.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            {urlObject.shortUrl}
          </a>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="secondary" onClick={handleCopy}>
          Copier l&apos;URL courte
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          Supprimer
        </Button>
      </div>
    </div>
  );
};

export const ShortUrlList: React.FC<{ list: RedisUrl[] }> = ({ list }) => {
  return (
    <div className="w-[80vw] max-w-2xl space-y-2">
      {list.length === 0 ? (
        <ShortUrlEmpty />
      ) : (
        list.map((shortUrlObject) => (
          <ShortUrlElement
            key={shortUrlObject.shortUrl}
            urlObject={shortUrlObject}
          />
        ))
      )}
    </div>
  );
};
