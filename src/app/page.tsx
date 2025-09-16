import { api, HydrateClient } from "~/trpc/server";
import { CreateShortUrl } from "~/app/_components/create";
import { ShortUrlList } from "~/app/_components/list";

export default async function Home() {
  const urls = await api.url.list();

  return (
    <HydrateClient>
      <main className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center gap-4 py-10">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Maskly
        </h1>

        <p className="text-muted-foreground w-[80vw] text-center text-lg md:w-[60vw] md:text-xl">
          Un service de raccourcissement d&apos;URL simple et efficace.
        </p>

        <CreateShortUrl />

        <ShortUrlList list={urls} />

        <footer className="text-muted-foreground mt-10 text-center text-sm">
          <p>Développé par Milo Cartal et ses ratons laveurs.</p>
        </footer>
      </main>
    </HydrateClient>
  );
}
