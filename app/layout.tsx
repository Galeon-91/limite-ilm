import type { Metadata } from "next";
import { Suspense } from "react";
import { Manrope, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";

// Sans-serif para titulares
const fontSans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Serif para el cuerpo de texto (lectura editorial larga)
const fontSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const SITE_DESCRIPTION =
  "Revista digital de divulgación científica: ciencia y fe, física, astronomía, biología, química, geología, matemáticas y más.";

export const metadata: Metadata = {
  metadataBase: new URL("https://limiteilm.com"),
  title: {
    default: "Límite ILM — Revista de divulgación científica",
    template: "%s · Límite ILM",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "ciencia y fe",
    "divulgación científica",
    "milagros científicos del Corán",
    "cosmología",
    "biología",
    "física",
    "astronomía",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo192.png",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Límite ILM",
    url: "https://limiteilm.com",
    images: ["/logo512.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Límite ILM — Revista de divulgación científica",
    description: SITE_DESCRIPTION,
    images: ["/logo512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fontSans.variable} ${fontSerif.variable}`}>
      <body className="min-h-screen bg-paper-50 font-serif text-ink-900 antialiased selection:bg-electric-200 selection:text-electric-900">
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
