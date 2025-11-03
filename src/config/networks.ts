import { Chain } from "viem";
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from "viem/chains";

import { linkBuilder } from "@/utils/explorer";

export type NetworkConfig = {
  id: number;
  name: string;
  rpcUrl: string;
  explorerUrl: string;
  isTestnet: boolean;
  chain: Chain;
  buildExplorerUrl: ReturnType<typeof linkBuilder>;
};

export const NETWORKS: Record<string, NetworkConfig> = {
  mainnet: {
    id: mainnet.id,
    name: "Ethereum Mainnet",
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
    explorerUrl: "https://etherscan.io",
    isTestnet: false,
    chain: mainnet,
    buildExplorerUrl: linkBuilder({ baseUrl: "https://etherscan.io" }),
  },
  sepolia: {
    id: sepolia.id,
    name: "Sepolia Testnet",
    rpcUrl: "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID",
    explorerUrl: "https://sepolia.etherscan.io",
    isTestnet: true,
    chain: sepolia,
    buildExplorerUrl: linkBuilder({ baseUrl: "https://sepolia.etherscan.io" }),
  },
  arbitrum: {
    id: arbitrum.id,
    name: "Arbitrum One",
    rpcUrl: "https://arbitrum-mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
    explorerUrl: "https://arbiscan.io",
    isTestnet: false,
    chain: arbitrum,
    buildExplorerUrl: linkBuilder({ baseUrl: "https://arbiscan.io" }),
  },
};

export const SUPPORTED_NETWORKS = Object.values(NETWORKS);

export const NETWORK_BY_CHAIN_ID: Record<number, NetworkConfig> = Object.values(NETWORKS).reduce(
  (acc, net) => {
    acc[net.id] = net;
    return acc;
  },
  {} as Record<number, NetworkConfig>
);
