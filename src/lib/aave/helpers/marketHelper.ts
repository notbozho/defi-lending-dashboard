import { MarketUserReserveBorrowPosition, MarketUserReserveSupplyPosition } from "@aave/react";

import { HasApy, HasCurrency } from "@/lib/aave/types";

export function getAssetName<T extends HasCurrency>(row: T) {
  return row.currency.name;
}

export function getBorrowUsdDebt(row: MarketUserReserveBorrowPosition) {
  return Number(row.debt?.usd ?? 0);
}

export function getApy<T extends HasApy>(row: T) {
  return Number(row.apy?.value ?? 0);
}

export function getSupplyUsdBalance(row: MarketUserReserveSupplyPosition) {
  return Number(row.balance?.usd ?? 0);
}

export function canToggleCollateral(row: MarketUserReserveSupplyPosition) {
  return row.canBeCollateral;
}
