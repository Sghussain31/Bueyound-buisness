import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://businessandbeyondindia.com"),
  title: "Business & Beyond | Curated Founder & Business Community",
  description:
    "Business & Beyond is a curated community for founders, entrepreneurs, business owners and ambitious builders. We bring the right people into the right room to create meaningful conversations, collaborations and opportunities.",
  icons: {
    icon: "/favicon.ico",
    // apple: "/images/bb-logo.png",
  },
  openGraph: {
    title: "Business & Beyond | Curated Founder & Business Community",
    description:
      "Business & Beyond is a curated community for founders, entrepreneurs, business owners and ambitious builders.",
    url: "https://businessandbeyondindia.com",
    siteName: "Business & Beyond",
    images: [{ url: "/images/bb-logo.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business & Beyond",
    description:
      "Business & Beyond is a curated community for founders, entrepreneurs, business owners and ambitious builders.",
    images: ["/images/bb-logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#020B24] text-[#F4F0E6]">{children}</body>
    </html>
  );
}
