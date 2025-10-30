export interface MarketAsset {
  id: string;
  name: string;
  symbol: string;
  imageUrl?: string;
  decimals: number;
  totalSupplied: BigNumber;
  totalSuppliedUsd: BigNumber;
  totalBorrowed: BigNumber;
  totalBorrowedUsd: BigNumber;
  supplyApy: number;
  borrowApy: number;
  isPaused?: boolean;
  isFrozen?: boolean;
}
