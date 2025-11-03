export interface MarketAsset {
  id: string;
  name: string;
  symbol: string;
  underlyingTokenAddress: `0x${string}`;
  aTokenAddress: `0x${string}`;
  vTokenAddress: `0x${string}`;
  imageUrl?: string;
  decimals: number;
  totalSupplied: BigNumber;
  totalSuppliedUsd: BigNumber;
  totalBorrowed: BigNumber;
  totalBorrowedUsd: BigNumber;
  supplyApy: number;
  borrowApy: number;
  utilizationRate: number;
  isPaused?: boolean;
  isFrozen?: boolean;
  marketAddress: string;
  oraclePrice: BigNumber;
  oracleContractAddress: `0x${string}`;
}
