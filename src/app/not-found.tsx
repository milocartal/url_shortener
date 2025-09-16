import { HydrateClient } from "~/trpc/server";
import { Link } from "~/app/_components/ui/link";

export default async function NotFound() {
  return (
    <HydrateClient>
      <main className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center gap-4 py-10">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Maskly
        </h1>

        <p className="text-muted-foreground w-[80vw] text-center text-lg md:w-[60vw] md:text-xl">
          Un service de raccourcissement d&apos;URL simple et efficace.
        </p>

        <div className="flex w-[80vw] flex-col items-center justify-center gap-4 rounded-md bg-white p-4">
          <p className="text-muted-foreground">
            Aucune URL raccourcie trouvée.
          </p>

          <Link href="/">Retour à l&apos;accueil</Link>
        </div>

        <footer className="text-muted-foreground mt-10 text-center text-sm">
          <p>Développé par Milo Cartal et ses ratons laveurs.</p>
        </footer>
      </main>
    </HydrateClient>
  );
}
