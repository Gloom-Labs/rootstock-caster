import { Button } from "frames.js/next";

import { frames } from "@/lib/frames";
import { APP_URL, DEFAULT_IMAGE_OPTIONS } from "@/app/config";
import { FrameLayout } from "@/components/frame-layout";

const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <FrameLayout title="Rootstock Chain Info">
        <img
          className="rounded"
          src={`${APP_URL}/chainlist.png`}
          alt="gloomers rootstock nfts"
          height={400}
          width={800}
        />
      </FrameLayout>
    ),
    imageOptions: DEFAULT_IMAGE_OPTIONS,
    buttons: [
      <Button key="btn-chain-info" action="post" target="/chain-info">
        Add Chain
      </Button>,
      <Button key="btn-bridge" action="post" target="/bridge">
        Bridge
      </Button>,
      <Button key="btn-mint" action="tx" target="api/tx-mint" post_url="/tx-mint-result">
        Mint
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
