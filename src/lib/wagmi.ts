import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Lending dashboard",
  projectId: process.env.WALLETCONNECT_PROJECT_ID || "b6091df2b99e4571ee68b3e52d5afe80",
  chains: [mainnet, polygon],
  ssr: true,
});
