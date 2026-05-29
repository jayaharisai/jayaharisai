import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

import { PROFILE_DATA } from "@/data/profile";

export const metadata: Metadata = {
  title: `${PROFILE_DATA.fullName} | Portfolio`,
  description: `${PROFILE_DATA.cv.subtitle} - ${PROFILE_DATA.hero.description}`,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}