import { createPublicClient, http } from "viem";
import { rootstock } from "viem/chains";

export const publicClient = createPublicClient({
  chain: rootstock,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL as string),
});
