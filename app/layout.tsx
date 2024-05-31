import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "@/app/globals.css";
import { Web3Provider } from "@/components/web3-provider";

const fontSans = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rootstock Frame",
  description: "Onboarding Users to Rootstock via Farcaster Frames!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontSans.className}>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
