import { valueToBigNumber } from "@aave/math-utils";
import { MarketUserReserveBorrowPosition } from "@aave/react";

import { FormattedNumber } from "@/components/shared/FormattedNumber";
import { Badge } from "@/components/ui/badge";

export function BorrowAmountCell({ position }: { position: MarketUserReserveBorrowPosition }) {
  const debt = position.debt;

  if (!debt) return null;

  return (
    <div className="flex items-center gap-2">
      <FormattedNumber
        value={debt.amount.value}
        symbol={position.currency.symbol}
        compact
        className="text-sm"
      />

      {valueToBigNumber(debt.usd).isGreaterThan(0) && (
        <Badge variant="subtle" className="text-[0.70rem] font-normal">
          <FormattedNumber value={debt.usd} symbol="USD" compact />
        </Badge>
      )}
    </div>
  );
}
