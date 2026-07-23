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
    title: "長亭 CHOTEI | 中華料理と日本酒の邂逅",
    description: "伝統中華にフランス料理のエスプリと日本の懐石の美意識を重ね、地方の日本酒とともにお届けする長亭の公式サイト。",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "長亭 CHOTEI | 中華料理と日本酒の邂逅",
      description: "異郷で出会い、一つの食卓になる。",
      images: [{ url: new URL("/og.png", base), width: 1800, height: 900, alt: "長亭 CHOTEI" }],
      type: "website",
      locale: "ja_JP",
    },
    twitter: {
      card: "summary_large_image",
      title: "長亭 CHOTEI",
      description: "中華料理と日本酒の邂逅",
      images: [new URL("/og.png", base)],
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
