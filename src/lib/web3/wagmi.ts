import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { Chain } from "wagmi/chains";

import { SUPPORTED_NETWORKS } from "@/config";

export const config = getDefaultConfig({
  appName: "Lending dashboard",
  projectId: process.env.WALLETCONNECT_PROJECT_ID || "b6091df2b99e4571ee68b3e52d5afe80",
  chains: SUPPORTED_NETWORKS.map((n) => n.chain) as unknown as readonly [Chain, ...Chain[]],
  ssr: true,
});
