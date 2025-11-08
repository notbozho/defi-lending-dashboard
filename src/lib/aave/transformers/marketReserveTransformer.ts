import { valueToBigNumber } from "@aave/math-utils";
import { Reserve } from "@aave/react";
import { Address } from "viem";

export interface MarketReserve {
  address: Address;
  marketAddress: Address;
  name: string;
  symbol: string;
  aTokenAddress: Address;
  vTokenAddress: Address;
  imageUrl?: string;
  decimals: number;
  totalSupplied: BigNumber;
  totalSuppliedUsd: string;
  totalBorrowed: BigNumber;
  totalBorrowedUsd: string;
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
    address: raw.underlyingToken.address,
    name: raw.underlyingToken.name,
    symbol: raw.underlyingToken.symbol,
    aTokenAddress: raw.aToken.address,
    vTokenAddress: raw.vToken.address,
    imageUrl: raw.underlyingToken.imageUrl,
    decimals: raw.underlyingToken.decimals,
    totalSupplied: valueToBigNumber(raw.supplyInfo.total.value),
    totalSuppliedUsd: String(raw.size.usd),
    totalBorrowed: valueToBigNumber(raw.borrowInfo?.total.amount.value || 0),
    totalBorrowedUsd: String(raw.borrowInfo?.total.usd),
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

export function transformMarketAssets(reserves: Reserve[]): MarketReserve[] {
  return reserves.map(transformMarketReserve);
}

export function filterActiveMarketAssets(assets: MarketReserve[]): MarketReserve[] {
  return assets
    .filter((asset) => !asset.isPaused && !asset.isFrozen)
    .sort((a, b) => new BigNumber(b.totalSuppliedUsd).minus(a.totalSuppliedUsd).toNumber());
}
