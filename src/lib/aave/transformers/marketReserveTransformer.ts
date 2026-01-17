import { valueToBigNumber } from "@aave/math-utils";
import { Reserve } from "@aave/react";

import { MarketReserve } from "@/lib/aave/types/MarketReserve";

export function transformMarketReserve(raw: Reserve): MarketReserve {
  return {
    underlyingAddress: raw.underlyingToken.address,
    chainId: raw.market.chain.chainId,
    name: raw.underlyingToken.name,
    symbol: raw.underlyingToken.symbol,
    decimals: raw.underlyingToken.decimals,
    imageUrl: raw.underlyingToken.imageUrl,
    isPaused: raw.isPaused,
    isFrozen: raw.isFrozen,
    marketAddress: raw.market.address,
    oraclePrice: valueToBigNumber(raw.usdExchangeRate || 0),
    oracleContractAddress: raw.usdOracleAddress,
    underlyingTokens: {
      aTokenAddress: raw.aToken.address,
      vTokenAddress: raw.vToken.address,
    },
    supplyInfo: {
      totalSupplied: valueToBigNumber(raw.supplyInfo.total.value),
      totalSuppliedUsd: Number(raw.size.usd),
      supplyApy: Number(raw.supplyInfo.apy.value),
      supplyCapReached: raw.supplyInfo.supplyCapReached,
    },
    borrowInfo: {
      totalBorrowed: valueToBigNumber(raw.borrowInfo?.total.amount.value || 0),
      totalBorrowedUsd: Number(raw.borrowInfo?.total.usd),
      borrowApy: Number(raw.borrowInfo?.apy.value),
      userMaxBorrowable: raw.userState?.borrowable,
      borrowCapReached: raw.borrowInfo?.borrowCapReached || false,
    },
    utilizationRate: String(raw.borrowInfo?.utilizationRate.value),
    maxLTV: String(raw.supplyInfo.maxLTV.value),
    optimalUsageRatio: String(raw.borrowInfo?.optimalUsageRate.raw),
    variableRateSlope1: String(raw.borrowInfo?.variableRateSlope1.raw),
    variableRateSlope2: String(raw.borrowInfo?.variableRateSlope2.raw),
    baseVariableBorrowRate: String(raw.borrowInfo?.reserveFactor.raw),
    canBeCollateral: raw.supplyInfo.canBeCollateral,
  };
}

export function transformMarketReserves(reserves: Reserve[]): MarketReserve[] {
  return reserves.map(transformMarketReserve);
}

export function filterActiveMarketReserves(reserves: MarketReserve[]): MarketReserve[] {
  return reserves
    .filter((reserve) => !reserve.isPaused) // todo: use this function, remove isFrozen
    .sort((a, b) =>
      new BigNumber(b.supplyInfo.totalSuppliedUsd).minus(a.supplyInfo.totalSuppliedUsd).toNumber()
    );
}
