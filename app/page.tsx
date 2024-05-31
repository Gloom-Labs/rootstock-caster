import type { Metadata } from "next";
import Link from "next/link";

import { fetchMetadata } from "frames.js/next";

import { APP_URL, DEBUGGER_URL } from "@/app/config";
import { ClientFrame } from "@/components/client-frame";
import { ConnectButton } from "@/components/connect-button";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Rootstock Frame",
    description: "Onboarding Users to Rootstock via Farcaster Frames!",
    other: await fetchMetadata(new URL("/splash", APP_URL)),
  } satisfies Metadata;
}

const TEST_FRAME_URL = `${DEBUGGER_URL}/?url=${APP_URL}`;

export default async function Home() {
  return (
    <div
      className="flex flex-col h-screen w-full items-center justify-between p-10 text-center bg-gradient-to-b from-fuchsia-400 from-80% to-amber-500
     text-white space-y-4 md:pt-20"
    >
      <div className="flex w-full justify-end">
        <ConnectButton />
      </div>
      <div className="flex flex-col items-center space-y-4">
        <p className="text-4xl md:text-6xl font-bold">RSKaster</p>
        <div className="flex items-center mt-4" />
        <div className="size-96">
          {/* <ClientFrame /> */}
        </div>
      </div>

      <div className="flex space-x-4 md:text-xl">
        <Link
          href={TEST_FRAME_URL}
          className="hover:text-fuchsia-400 max-md:p-2 p-4 text-black active:text-white"
          target="_blank"
        >
          Test Frame ↗
        </Link>
        <Link
          href={`https://warpcast.com/~/compose?embeds%5B%5D=${APP_URL}`}
          className="hover:text-fuchsia-400 max-md:p-2 p-4 text-black active:text-white "
          target="_blank"
        >
          Cast Frame ↗
        </Link>
      </div>
    </div>
  );
}
