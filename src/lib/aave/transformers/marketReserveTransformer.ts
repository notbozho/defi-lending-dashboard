import { valueToBigNumber } from "@aave/math-utils";
import { Reserve } from "@aave/react";
import { Address } from "viem";

export interface MarketReserve {
  underlyingAddress: Address;
  marketAddress: Address;
  name: string;
  symbol: string;
  aTokenAddress: Address;
  vTokenAddress: Address;
  imageUrl?: string;
  decimals: number;
  totalSupplied: BigNumber;
  totalSuppliedUsd: number;
  totalBorrowed: BigNumber;
  totalBorrowedUsd: number;
  supplyApy: number;
  borrowApy: number;
  isPaused?: boolean;
  isFrozen?: boolean;
  oraclePrice: BigNumber;
  oracleContractAddress: Address;
  utilizationRate: string;
  optimalUsageRatio: string;
  variableRateSlope1: string;
  variableRateSlope2: string;
  baseVariableBorrowRate: string;
}

export function transformMarketReserve(raw: Reserve): MarketReserve {
  return {
    underlyingAddress: raw.underlyingToken.address,
    name: raw.underlyingToken.name,
    symbol: raw.underlyingToken.symbol,
    aTokenAddress: raw.aToken.address,
    vTokenAddress: raw.vToken.address,
    imageUrl: raw.underlyingToken.imageUrl,
    decimals: raw.underlyingToken.decimals,
    totalSupplied: valueToBigNumber(raw.supplyInfo.total.value),
    totalSuppliedUsd: Number(raw.size.usd),
    totalBorrowed: valueToBigNumber(raw.borrowInfo?.total.amount.value || 0),
    totalBorrowedUsd: Number(raw.borrowInfo?.total.usd),
    supplyApy: Number(raw.supplyInfo.apy.value),
    borrowApy: Number(raw.borrowInfo?.apy.value),
    isPaused: raw.isPaused,
    isFrozen: raw.isFrozen,
    marketAddress: raw.market.address,
    oraclePrice: valueToBigNumber(raw.usdExchangeRate || 0),
    oracleContractAddress: raw.usdOracleAddress,
    utilizationRate: String(raw.borrowInfo?.utilizationRate.value),
    optimalUsageRatio: String(raw.borrowInfo?.optimalUsageRate.raw),
    variableRateSlope1: String(raw.borrowInfo?.variableRateSlope1.raw),
    variableRateSlope2: String(raw.borrowInfo?.variableRateSlope2.raw),
    baseVariableBorrowRate: String(raw.borrowInfo?.reserveFactor.raw),
  };
}

export function transformMarketReserves(reserves: Reserve[]): MarketReserve[] {
  return reserves.map(transformMarketReserve);
}

export function filterActiveMarketReserves(reserves: MarketReserve[]): MarketReserve[] {
  return reserves
    .filter((reserve) => !reserve.isPaused && !reserve.isFrozen)
    .sort((a, b) => new BigNumber(b.totalSuppliedUsd).minus(a.totalSuppliedUsd).toNumber());
}
