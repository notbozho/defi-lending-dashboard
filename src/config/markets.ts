import {
  AaveV3Arbitrum,
  AaveV3Ethereum,
  AaveV3Polygon,
  AaveV3Sepolia,
} from "@bgd-labs/aave-address-book";
import { arbitrum, mainnet, polygon, sepolia } from "wagmi/chains";

export type MarketDataType = {
  marketTitle: string;
  chainId: number;
  subgraphUrl?: string;
  addresses: {
    LENDING_POOL_ADDRESS_PROVIDER: string;
    LENDING_POOL: string;
  };
};

export const MARKETS: Record<string, MarketDataType> = {
  AaveV3Ethereum: {
    marketTitle: "Core V3",
    chainId: mainnet.id,
    // subgraphUrl: "https://api.thegraph.com/subgraphs/name/aave/protocol-v3-ethereum",
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
      LENDING_POOL: AaveV3Ethereum.POOL,
    },
  },
  AaveV3Sepolia: {
    marketTitle: "Aave V3 Sepolia",
    chainId: sepolia.id,
    // subgraphUrl: "https://api.thegraph.com/subgraphs/name/aave/protocol-v3-sepolia",
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: AaveV3Sepolia.POOL_ADDRESSES_PROVIDER,
      LENDING_POOL: AaveV3Sepolia.POOL,
    },
  },
  AaveV3Polygon: {
    marketTitle: "Aave V3 Polygon",
    chainId: polygon.id,
    // subgraphUrl: "https://api.thegraph.com/subgraphs/name/aave/protocol-v3-polygon",
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: AaveV3Polygon.POOL_ADDRESSES_PROVIDER,
      LENDING_POOL: AaveV3Polygon.POOL,
    },
  },
  AaveV3Arbitrum: {
    marketTitle: "Aave V3 Arbitrum",
    chainId: arbitrum.id,
    // subgraphUrl: "https://api.thegraph.com/subgraphs/name/aave/protocol-v3-arbitrum",
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: AaveV3Arbitrum.POOL_ADDRESSES_PROVIDER,
      LENDING_POOL: AaveV3Arbitrum.POOL,
    },
  },
};

export const MARKET_BY_CHAIN_ID = (chainId: number): MarketDataType | undefined => {
  return Object.values(MARKETS).find((market) => market.chainId === chainId);
};
