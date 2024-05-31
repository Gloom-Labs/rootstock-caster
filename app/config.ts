import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFileSync } from "node:fs";
import { cwd } from "node:process";

import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import xior from "xior";

const NODE_ENV = process.env.NODE_ENV;
export const isProd = NODE_ENV === "production";
export const PRODUCTION_APP_URL = process.env.NEXT_PUBLIC_APP_URL as string;
export const APP_URL = isProd ? PRODUCTION_APP_URL : "http://localhost:3000";
export const DEBUGGER_URL = isProd ? "https://warpcast.com/~/developers/frames" : "http://localhost:3010";

export const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY as string;

const xiorInstance = xior.create();
export const neynar = new NeynarAPIClient(NEYNAR_API_KEY, {
  axiosInstance: xiorInstance as any,
});

const fontRegularPath = join(cwd(), "./public/Montserrat-Regular.ttf");
const fontBoldPath = join(cwd(), "./public/Montserrat-Bold.ttf");
export const fontDataRegular = readFileSync(fontRegularPath);
export const fontDataBold = readFileSync(fontBoldPath);

type FrameImageOptions = {
  aspectRatio?: "1.91:1" | "1:1";
} & ConstructorParameters<typeof ImageResponse>[1];

export const DEFAULT_IMAGE_OPTIONS = {
  aspectRatio: "1:1" as const,
  fonts: [
    {
      data: fontDataRegular,
      name: "Montserrat",
      style: "normal",
      weight: 400,
    },
    {
      data: fontDataBold,
      name: "Montserrat",
      style: "normal",
      weight: 700,
    },
  ],
} satisfies FrameImageOptions;
