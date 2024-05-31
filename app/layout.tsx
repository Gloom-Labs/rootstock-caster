import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "@/app/globals.css";

const fontSans = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rootstock Frame",
  description: "Rootstock Farcaster Frame!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontSans.className}>{children}</body>
    </html>
  );
}
