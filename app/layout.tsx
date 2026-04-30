import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Luar System - Desenvolvimento Web Profissional",
  description:
    "Transformamos ideias em experiências digitais extraordinárias. Desenvolvimento de sistemas web personalizados para sua empresa.",
  keywords: "desenvolvimento web, sistemas web, aplicações web, software sob medida",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080F1C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={spaceGrotesk.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-[#080F1C]">{children}</body>
    </html>
  );
}
