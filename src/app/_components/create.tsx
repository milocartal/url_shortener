"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "~/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/_components/ui/form";
import { api } from "~/trpc/react";
import { Input } from "~/app/_components/ui/input";
import { useRouter } from "next/navigation";

const CreateShortUrlSchema = z.object({
  url: z
    .string({ required_error: "Veuillez entrer une URL valide" })
    .url("Veuillez entrer une URL valide"),
});

export const CreateShortUrl: React.FC = () => {
  const router = useRouter();

  const createShortUrl = api.url.shorten.useMutation({
    onSuccess: () => {
      form.reset();
      toast.success("URL courte créée avec succès");
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Une erreur est survenue " + error.message);
    },
  });

  async function onSubmit(values: z.infer<typeof CreateShortUrlSchema>) {
    await createShortUrl.mutateAsync({
      url: values.url,
    });
  }

  const form = useForm<z.infer<typeof CreateShortUrlSchema>>({
    resolver: zodResolver(CreateShortUrlSchema),
    defaultValues: {
      url: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-[80vw] flex-col items-start gap-4 rounded-md bg-white p-4"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="gap-1">
                URL à raccourcir
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.example.com/articles/2024/06/10/how-to-use-url-shortener"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row">
          <Button
            type="submit"
            variant={"default"}
            disabled={createShortUrl.isPending}
            className="w-full md:w-auto"
          >
            {createShortUrl.isPending ? "Création..." : "Créer l'URL courte"}
          </Button>

          <Button
            onClick={() => form.reset()}
            type="reset"
            disabled={createShortUrl.isPending}
            variant={"accent"}
            className="w-full md:w-auto"
          >
            Réinitialiser
          </Button>
        </div>
      </form>
    </Form>
  );
};
