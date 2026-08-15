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
  title: "Business & Beyond - Connecting Businesses, Creating Opportunities",
  description: "A curated premium community for founders, business owners, investors, operators, and creators to network, collaborate, and create opportunities.",
  icons: {
    icon: "https://businessandbeyond.in/assets/img/favicon.ico",
  }
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
