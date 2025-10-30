import { valueToBigNumber } from "@aave/math-utils";
import { Reserve } from "@aave/react";

import { MarketAsset } from "@/lib/aave/transformed-types";

export function transformMarketAsset(raw: Reserve): MarketAsset {
  return {
    id: raw.underlyingToken.address,
    name: raw.underlyingToken.name,
    symbol: raw.underlyingToken.symbol,
    imageUrl: raw.underlyingToken.imageUrl,
    decimals: raw.underlyingToken.decimals,
    totalSupplied: valueToBigNumber(raw.supplyInfo.total.value),
    totalSuppliedUsd: valueToBigNumber(raw.size.usd),
    totalBorrowed: valueToBigNumber(raw.borrowInfo?.total.amount.value || 0),
    totalBorrowedUsd: valueToBigNumber(raw.borrowInfo?.total.usd || 0),
    supplyApy: Number(raw.supplyInfo.apy.formatted),
    borrowApy: Number(raw.borrowInfo?.apy.formatted),
    isPaused: raw.isPaused,
    isFrozen: raw.isFrozen,
  };
}

export function transformMarketAssets(reserves: Reserve[]): MarketAsset[] {
  return reserves.map(transformMarketAsset);
}

export function filterActiveMarketAssets(assets: MarketAsset[]): MarketAsset[] {
  return assets
    .filter((asset) => !asset.isPaused && !asset.isFrozen)
    .sort((a, b) => b.totalSuppliedUsd.minus(a.totalSuppliedUsd).toNumber());
}
