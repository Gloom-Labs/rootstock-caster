"use client";

import { FrameUI, fallbackFrameContext } from "@frames.js/render";
import { signFrameAction, type FarcasterSigner } from "@frames.js/render/farcaster";
import { FrameImageNext } from "@frames.js/render/next";
import { useFrame } from "@frames.js/render/use-frame";
import { useWriteContract } from "wagmi";

const APP_URL = "http://localhost:3000";
//process.env.NEXT_PUBLIC_APP_URL;

export const ClientFrame = () => {
  const { data, writeContractAsync } = useWriteContract();

  // TODO: replace with your farcaster signer
  const farcasterSigner: FarcasterSigner = {
    fid: 1,
    status: "approved",
    publicKey: "0x00000000000000000000000000000000000000000000000000000000000000000",
    privateKey: "0x00000000000000000000000000000000000000000000000000000000000000000",
  };

  const frameState = useFrame({
    // replace with your frame url
    homeframeUrl: APP_URL,
    // corresponds to the name of the route for POST in step 3
    frameActionProxy: "/frames",
    connectedAddress: undefined,
    // corresponds to the name of the route for GET in step 3
    frameGetProxy: "/frames",
    frameContext: fallbackFrameContext,
    // map to your identity if you have one
    signerState: {
      hasSigner: farcasterSigner !== undefined,
      signer: farcasterSigner,
      onSignerlessFramePress: () => {
        // Only run if `hasSigner` is set to `false`
        // This is a good place to throw an error or prompt the user to login
        alert("A frame button was pressed without a signer. Perhaps you want to prompt a login");
      },
      signFrameAction: signFrameAction,
    },
    onTransaction: async (onTxArgs): Promise<`0x${string}` | null> => {
      // This is a good place to handle a transaction
      const abi = onTxArgs.transactionData.params.abi as any;
      const functionName = onTxArgs.frameButton.target?.includes("mint") ? "mint" : "bridge";

      const res = await writeContractAsync({
        abi,
        args: [],
        address: onTxArgs.transactionData.params.to,
        functionName,
      });

      return res;
    },
  });

  return (
    <FrameUI
      frameState={frameState}
      theme={{
        bg: "amber-500",
        buttonBg: "orange",
        buttonBorderColor: "black",
        buttonColor: "black",
        buttonHoverBg: "white",
      }}
      FrameImage={FrameImageNext}
    />
  );
};
