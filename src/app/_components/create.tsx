"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "~/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/_components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";
import { api } from "~/trpc/react";
import { Input } from "~/app/_components/ui/input";
import { useRouter } from "next/navigation";
import { Switch } from "~/app/_components/ui/switch";
import { useEffect } from "react";

const CreateShortUrlSchema = z
  .object({
    url: z
      .string({ required_error: "Veuillez entrer une URL valide" })
      .url("Veuillez entrer une URL valide"),
    isTemp: z.boolean(),
    expTime: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isTemp && (!data.expTime || data.expTime <= 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Veuillez entrer un temps d'expiration valide",
      });
    } else if (!data.isTemp && data.expTime) {
      data.expTime = undefined;
    }
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
      expTime: values.expTime,
      isTemp: values.isTemp,
    });
  }

  const form = useForm<z.infer<typeof CreateShortUrlSchema>>({
    resolver: zodResolver(CreateShortUrlSchema),
    defaultValues: {
      url: "",
      isTemp: false,
      expTime: undefined,
    },
  });

  const isTemp = form.watch("isTemp");
  const expTime = form.watch("expTime");

  useEffect(() => {
    if (!isTemp) {
      form.setValue("expTime", undefined);
    } else if (isTemp && !expTime) {
      form.setValue("expTime", 300); // Default to 5 minutes
    }
  }, [isTemp, expTime, form]);

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

        <FormField
          control={form.control}
          name="isTemp"
          render={({ field }) => (
            <FormItem className="flex w-full flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>URL temporaire</FormLabel>
                <FormDescription>
                  Cochez cette case si vous souhaitez que l&apos;URL expire
                  après un certain temps.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {form.watch("isTemp") && (
          <FormField
            control={form.control}
            name="expTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Temps d&apos;expiration</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value, 10))}
                >
                  <FormControl>
                    <SelectTrigger
                      className="w-full"
                      disabled={form.watch("isTemp") === false}
                    >
                      <SelectValue placeholder="Sélectionnez un temps d'expiration" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="60">1 minute</SelectItem>
                    <SelectItem value="300">5 minutes</SelectItem>
                    <SelectItem value="600">10 minutes</SelectItem>
                    <SelectItem value="1800">30 minutes</SelectItem>
                    <SelectItem value="3600">1 heure</SelectItem>
                    <SelectItem value="86400">1 jour</SelectItem>
                    <SelectItem value="604800">1 semaine</SelectItem>
                    <SelectItem value="2592000">1 mois</SelectItem>
                    <SelectItem value="7776000">3 mois</SelectItem>
                    <SelectItem value="15552000">6 mois</SelectItem>
                    <SelectItem value="31536000">1 an</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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
