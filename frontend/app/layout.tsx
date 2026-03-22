import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteHeader } from "@/components/SiteHeader";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eventpinger — Kids’ & cultural events, matched to your family",
  description:
    "Get notified about the right kids’ and cultural events in your neighborhood, based on your family profile.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-dvh flex-col bg-zinc-50 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50"
        suppressHydrationWarning
      >
        <SiteHeader />
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
