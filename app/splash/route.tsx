import { Button } from "frames.js/next";

import { frames } from "@/lib/frames";
import { APP_URL, DEFAULT_IMAGE_OPTIONS } from "@/app/config";
import { FrameLayout } from "@/components/frame-layout";

const handleRequest = frames(async (ctx) => {
  const isRSKaster = ctx.baseUrl?.origin.includes("rskaster");
  return {
    image: (
      <FrameLayout>
        <img src={`${APP_URL}/rootstock.png`} alt="gloomers rootstock nfts" height={500} width={500} />
        <h1 tw="text-4xl font-bol mt-0">Welcome to Rootstock!</h1>
        <p tw="text-4xl my-0">1. Add Rootstock (EVM compatible!)</p>
        <p tw="text-4xl my-0">2. Bridge assets using Symbiosis</p>
        <p tw="text-4xl my-0">3. Mint a free Gloomer on Rootstock!</p>
        <p tw="text-4xl mt-0 mb-4">4. Cast in /rootstock channel for rewards</p>
      </FrameLayout>
    ),
    imageOptions: DEFAULT_IMAGE_OPTIONS,
    buttons: [
      <Button
        key="btn-chain-info"
        action="link"
        target="https://chainswitch.xyz/?chain=Rootstock&redirect=app.symbiosis.finance%2Fswap%3FamountIn%26chainIn%3DBase%26chainOut%3DRootstock%26tokenIn%3DETH%26tokenOut%3DRBTC"
      >
        Add Chain
      </Button>,
      <Button
        key="btn-bridge"
        action="link"
        target="https://app.symbiosis.finance/swap?amountIn&chainIn=Base&chainOut=Rootstock&tokenIn=ETH&tokenOut=RBTC"
      >
        Bridge
      </Button>,
      <Button
        key="btn-mint"
        action={isRSKaster ? "tx" : "link"}
        target={isRSKaster ? "api/tx-mint" : APP_URL}
        post_url={isRSKaster ? "/tx-mint-result" : undefined}
      >
        {isRSKaster ? "Mint" : "Mint on RSKaster"}
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
