import { Button } from "frames.js/next";

import type { Hash } from "viem";

import { frames } from "@/lib/frames";
import { APP_URL, DEFAULT_IMAGE_OPTIONS } from "@/app/config";
import { FrameLayout } from "@/components/frame-layout";
import { publicClient } from "@/lib/viem";

const handleRequest = frames(async (ctx) => {
  const { castId, requesterFid, transactionId, isValid } = ctx.message || {};
  const txId = (transactionId || ctx.searchParams?.tx) as Hash;

  const txReceipt = await publicClient.getTransactionReceipt({
    hash: txId,
  });

  const tokenId = Number(txReceipt?.logs?.[0]?.topics?.[3] || 0);

  return {
    image: (
      <FrameLayout title="Mint TX Result">
        <div tw="flex flex-col grow w-full items-between justify-center">
          <div tw="flex w-full items-center justify-between">
            {txReceipt?.status === "success" ? (
              <p tw="text-4xl md:text-6xl text-green-500 font-bold">Tx Success!</p>
            ) : txReceipt?.status === "reverted" ? (
              <p tw="text-4xl md:text-6xl text-red-500 font-bold">Tx Failed!</p>
            ) : (
              <p tw="text-4xl md:text-6xl text-yellow-500 font-bold">Tx Pending...</p>
            )}
            <p tw="text-4xl font-bold">Block: {txReceipt?.blockNumber}</p>
          </div>

          <div tw="flex flex-col items-center mt-4">
            {tokenId ? <p tw="text-4xl font-bold">Minted Gloomer Token ID: {tokenId}</p> : null}

            <p tw="text-4xl font-bold">From: {txReceipt?.from}</p>
            <p tw="text-4xl font-bold">To: {txReceipt?.to}</p>
          </div>
        </div>
      </FrameLayout>
    ),
    imageOptions: DEFAULT_IMAGE_OPTIONS,
    buttons: [
      <Button key="btn-back" action="post">
        Home
      </Button>,
      <Button key="btn-refresh" action="post" target={{ pathname: "tx-mint-result", query: { tx: txId } }}>
        Refresh
      </Button>,
      <Button key="btn-share" action="link" target={`https://explorer.rootstock.io/tx/${txId}`}>
        View on Explorer
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
