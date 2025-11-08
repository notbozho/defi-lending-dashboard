import { AaveV3Ethereum } from "@bgd-labs/aave-address-book";

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
    marketTitle: "Aave V3 Ethereum",
    chainId: 1,
    subgraphUrl: "https://api.thegraph.com/subgraphs/name/aave/protocol-v3-ethereum",
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
      LENDING_POOL: AaveV3Ethereum.POOL,
    },
  },
};
