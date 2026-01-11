import { valueToBigNumber } from "@aave/math-utils";
import { MarketUserReserveSupplyPosition } from "@aave/react";

import AmountWithBadge from "@/components/shared/AmountWithBadge";

export function SupplyBalanceCell({ position }: { position: MarketUserReserveSupplyPosition }) {
  const balance = position.balance;

  if (!balance) return null;

  return (
    <AmountWithBadge
      value={valueToBigNumber(balance.amount.value)}
      symbol={position.currency.symbol}
      usdAmount={Number(balance.usd)}
    />
  );
}
