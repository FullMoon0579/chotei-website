import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);

  return {
    metadataBase: base,
    title: "長亭 CHOTEI | 中国料理の技で、四季を奏でる",
    description: "中国料理の技法で日本の四季を映し出す、東京・六本木の長亭。旬の料理、コース、空間、店舗情報とご予約をご案内します。",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "長亭 CHOTEI | 中国料理の技で、四季を奏でる",
      description: "Where Chinese Cuisine Meets Japanese Seasons",
      images: [{ url: new URL("/og.webp", base), width: 1200, height: 630, alt: "長亭 CHOTEI 六本木" }],
      type: "website",
      locale: "ja_JP",
    },
    twitter: {
      card: "summary_large_image",
      title: "長亭 CHOTEI",
      description: "中国料理の技で、日本の四季を奏でる。",
      images: [new URL("/og.webp", base)],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
