import { valueToBigNumber } from "@aave/math-utils";
import { MarketUserReserveBorrowPosition } from "@aave/react";

import AmountWithBadge from "@/components/shared/AmountWithBadge";

export function BorrowAmountCell({ position }: { position: MarketUserReserveBorrowPosition }) {
  const debt = position.debt;

  if (!debt) return null;

  return (
    <AmountWithBadge
      value={valueToBigNumber(debt.amount.value)}
      symbol={position.currency.symbol}
      usdAmount={Number(debt.usd)}
    />
  );
}
