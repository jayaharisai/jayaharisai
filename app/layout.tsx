import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  // Trimmed to only the weights we actually use — saves ~60% of font payload
  weight: ["300", "400", "500"],
  display: "swap", // critical: prevents invisible text during font load
  preload: true,
  variable: "--font-poppins",
});

import { PROFILE_DATA } from "@/data/profile";

export const metadata: Metadata = {
  title: `${PROFILE_DATA.fullName} | Portfolio`,
  description: `${PROFILE_DATA.cv.subtitle} - ${PROFILE_DATA.hero.description}`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#734f96",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        {/* Warm up DNS for Pexels early — saves 100-300ms on first image load */}
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        {/* Preconnect to the font origin (already handled by next/font, but explicit doesn't hurt) */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
