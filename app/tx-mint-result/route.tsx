import { Button } from "frames.js/next";

import { frames, validateMessage } from "@/lib/frames";
import { APP_URL, DEFAULT_IMAGE_OPTIONS } from "@/app/config";
import { FrameLayout } from "@/components/frame-layout";

const handleRequest = frames(async (ctx) => {
  const { castId, requesterFid, transactionId, isValid } = ctx.message || {};
  validateMessage(isValid);
  const txId = transactionId || ctx.searchParams?.tx;
  const r = ctx.searchParams?.r;
  const randomParam = r ? `?r=${r}` : "";

  if (!castId || !txId || !requesterFid) {
    throw new Error("Missing required parameters.");
  }

  return {
    image: (
      <FrameLayout>
        <p tw="text-6xl">Welcome to the Gloomiverse!</p>
        <img tw="rounded" src={`https://og.onceupon.xyz/card/${txId}${randomParam}`} height={524} width={1000} />
      </FrameLayout>
    ),
    imageOptions: DEFAULT_IMAGE_OPTIONS,
    buttons: [
      <Button key="btn-back" action="post">
        Home
      </Button>,
      <Button
        key="btn-refresh"
        action="post"
        target={{ pathname: "tx-mint-result", query: { tx: txId, r: Math.random() } }}
      >
        Refresh
      </Button>,
      <Button
        key="btn-share"
        action="link"
        target={`https://warpcast.com/~/compose?text=${encodeURIComponent(
          `Just minted my Gloomer on Warpcast!`
        )}&embeds%5B%5D=${APP_URL}/tx-mint-result?tx=${txId}`}
      >
        Share
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
