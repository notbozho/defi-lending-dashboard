import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { Chain } from "wagmi/chains";

import { SUPPORTED_NETWORKS } from "@/config";

export const config = getDefaultConfig({
  appName: "Lending dashboard",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: SUPPORTED_NETWORKS.map((n) => n.chain) as unknown as readonly [Chain, ...Chain[]],
  ssr: true,
});
