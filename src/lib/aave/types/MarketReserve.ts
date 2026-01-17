import { TokenAmount } from "@aave/react";
import { Address } from "viem";

export type MarketReserve = {
  marketAddress: Address;
  underlyingAddress: Address;
  chainId: number;
  name: string;
  symbol: string;
  decimals: number;
  imageUrl?: string;
  isPaused?: boolean;
  isFrozen?: boolean;
  oraclePrice: BigNumber;
  oracleContractAddress: Address;
  underlyingTokens: {
    aTokenAddress: Address;
    vTokenAddress: Address;
  };
  supplyInfo: {
    totalSupplied: BigNumber;
    totalSuppliedUsd: number;
    supplyApy: number;
    supplyCapReached?: boolean;
  };
  borrowInfo: {
    totalBorrowed: BigNumber;
    totalBorrowedUsd: number;
    borrowApy: number;
    userMaxBorrowable?: TokenAmount;
    borrowCapReached?: boolean;
  };
  utilizationRate: string;
  maxLTV: string;
  optimalUsageRatio: string;
  variableRateSlope1: string;
  variableRateSlope2: string;
  baseVariableBorrowRate: string;
  canBeCollateral?: boolean;
};
