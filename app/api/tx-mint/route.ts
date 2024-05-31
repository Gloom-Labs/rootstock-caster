import { NextResponse } from "next/server";

import { encodeFunctionData } from "viem";
import { rootstock } from "viem/chains";

import { frames } from "@/lib/frames";
import { GLOOMERS_CONTRACT_CONFIG } from "@/lib/contracts";

export const POST = frames(async (ctx) => {
  const gloomersContractAddress = GLOOMERS_CONTRACT_CONFIG.address;
  const calldata = encodeFunctionData({
    abi: GLOOMERS_CONTRACT_CONFIG.abi,
    functionName: "mint",
  });

  return NextResponse.json({
    chainId: `eip155:${rootstock.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: GLOOMERS_CONTRACT_CONFIG.abi,
      to: gloomersContractAddress,
      data: calldata,
    },
  });
});
