import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "sonner";
import { env } from "~/env";

export const metadata: Metadata = {
  title: "Maskly - Raccourcisseur d'URL",
  description: "Un service de raccourcissement d'URL simple et efficace.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: [
    "raccourcisseur d'URL",
    "URL shortener",
    "Maskly",
    "liens courts",
    "partage de liens",
    "service web",
    "efficace",
    "rapide",
    "sécurisé",
  ],
  authors: [{ name: "Milocartal" }],
  creator: "Milocartal",
  publisher: "Maskly",
  applicationName: "Maskly",
  category: "utility",
  generator: "Next.js",
  robots: "index, follow",
  metadataBase: new URL(env.NEXT_PUBLIC_URL ?? "http://localhost:3000"),
  appleWebApp: {
    title: "Maskly",
    statusBarStyle: "default",
    capable: true,
  },
  openGraph: {
    title: "Maskly - Raccourcisseur d'URL",
    description: "Un service de raccourcissement d'URL simple et efficace.",
    url: new URL(env.NEXT_PUBLIC_URL ?? "http://localhost:3000"),
    siteName: "Maskly",
    images: [
      {
        url: "/icon1.png",
        width: 1200,
        height: 630,
        alt: "Maskly - Raccourcisseur d'URL",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maskly - Raccourcisseur d'URL",
    description: "Un service de raccourcissement d'URL simple et efficace.",
    images: ["/icon1.png"],
    creator: "@maskly_app",
  },
};

export const viewport = {
  themeColor: "#F4F1EA",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${geist.variable}`}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icon1.png" />
        <link
          rel="icon"
          type="image/svg+xml"
          sizes="1024x1024"
          href="/icon0.svg"
        />
        <link rel="manifest" href="/manifest.json" />

        <meta name="apple-mobile-web-app-title" content="Maskly" />
      </head>
      <body>
        <TRPCReactProvider>
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
