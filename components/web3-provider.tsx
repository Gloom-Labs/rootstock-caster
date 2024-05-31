"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http } from "wagmi";
import { rootstock } from "viem/chains";

const queryClient = new QueryClient();

const APP_URL = process.env.NEXT_PUBLIC_APP_URL as string;
const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID as string;

const config = getDefaultConfig({
  appName: "RSKaster",
  appDescription: "Onboarding Users to Rootstock via Farcaster Frames!",
  appUrl: APP_URL,
  appIcon: `${APP_URL}/rootstock.png`,
  projectId: PROJECT_ID,
  chains: [
    {
      ...rootstock,
      iconUrl: `${APP_URL}/rootstock.png`,
    },
  ],
  transports: {
    [rootstock.id]: http(),
  },
  ssr: true,
});

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider reconnectOnMount config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
