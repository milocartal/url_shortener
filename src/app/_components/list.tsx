"use client";

import type { StoredUrl } from "~/lib/models/Url";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formatDuration } from "~/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Separator } from "./ui/separator";

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
  urlObject: StoredUrl;
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
          <strong>Url originale :</strong> <br className="lg:hidden" />
          {urlObject.urlData.url}
        </p>
        <p className="break-all">
          <strong>URL courte :</strong> <br className="lg:hidden" />
          <a
            href={urlObject.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            {urlObject.shortUrl}
          </a>
        </p>
        <Separator className="w-full" />
        <div className="flex w-full flex-col gap-1 md:flex-row md:gap-4">
          <p>
            <strong>Type :</strong>{" "}
            {urlObject.urlData.isTemp ? "Temporaire" : "Permanente"}
          </p>
          {urlObject.urlData.isTemp && urlObject.urlData.expTime && (
            <p>
              <strong>Valable :</strong>{" "}
              {formatDuration(urlObject.urlData.expTime)}
            </p>
          )}
        </div>
        {urlObject.urlData.isTemp && (
          <p>
            <strong>Créé le :</strong> <br className="lg:hidden" />
            {format(urlObject.urlData.createdAt, "PPP à HH:mm", { locale: fr })}
          </p>
        )}
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

export const ShortUrlList: React.FC<{ list: StoredUrl[] }> = ({ list }) => {
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
