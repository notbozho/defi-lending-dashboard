import { AaveV3Ethereum } from "@bgd-labs/aave-address-book";
import { mainnet } from "viem/chains";

type MarketDataType = {
  marketTitle: string;
  chainId: number;
  subgraphUrl?: string;
  addresses: {
    LENDING_POOL_ADDRESS_PROVIDER: string;
    LENDING_POOL: string;
  };
};

export const MARKETS: Record<string, MarketDataType> = {
  aaveV3Ethereum: {
    marketTitle: "Core V3",
    chainId: mainnet.id,
    subgraphUrl: "https://api.thegraph.com/subgraphs/name/aave/protocol-v3-ethereum",
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
      LENDING_POOL: AaveV3Ethereum.POOL,
    },
  },
};

export const MARKET_BY_CHAIN_ID = (chainId: number): MarketDataType | undefined => {
  return Object.values(MARKETS).find((market) => market.chainId === chainId);
};
