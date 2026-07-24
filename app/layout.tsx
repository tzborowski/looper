import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const base = new URL(`${protocol}://${host}`);

  return {
    metadataBase: base,
    title: "LOOPR — Znajdź miejsce. Bez krążenia.",
    description:
      "LOOPR to aplikacja mobilna, która łączy kierowcę szukającego miejsca parkingowego z kierowcą, który właśnie je zwalnia.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "LOOPR — Znajdź miejsce. Bez krążenia.",
      description: "Szukasz miejsca? LOOPR łączy Cię z kierowcą, który właśnie je zwalnia.",
      images: [{ url: new URL("/og-v2.png", base).toString(), width: 1200, height: 630 }],
      locale: "pl_PL",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "LOOPR — Znajdź miejsce. Bez krążenia.",
      description: "Szukasz miejsca? LOOPR łączy Cię z kierowcą, który właśnie je zwalnia.",
      images: [new URL("/og-v2.png", base).toString()],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
