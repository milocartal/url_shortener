import { notFound, redirect } from "next/navigation";

import "~/styles/globals.css";
import { api } from "~/trpc/server";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ClassDetail({ params }: Props) {
  const { slug } = await params;

  const url = await api.url.get({ shorten: slug }).catch(() => {
    console.error("URL not found");
    notFound();
  });

  redirect(url.url);
}
