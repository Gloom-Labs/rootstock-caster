import { createFrames } from "frames.js/next";
import { farcasterHubContext } from "frames.js/middleware";

import { APP_URL, NEYNAR_API_KEY, isProd } from "@/app/config";

export const frames = createFrames({
  middleware: [
    farcasterHubContext({
      hubHttpUrl: "https://hub-api.neynar.com",
      hubRequestOptions: {
        headers: {
          api_key: NEYNAR_API_KEY,
        },
      },
    }),
  ],
});

export const SHARE_URL = `https://warpcast.com/~/compose?embeds%5B%5D=${APP_URL}`;
