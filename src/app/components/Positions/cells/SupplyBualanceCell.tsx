import { valueToBigNumber } from "@aave/math-utils";
import { MarketUserReserveSupplyPosition } from "@aave/react";

import { FormattedNumber } from "@/components/shared/FormattedNumber";
import { Badge } from "@/components/ui/badge";

export function SupplyBalanceCell({ position }: { position: MarketUserReserveSupplyPosition }) {
  const balance = position.balance;

  if (!balance) return null;

  return (
    <div className="flex items-center gap-2">
      <FormattedNumber
        value={balance.amount.value}
        symbol={position.currency.symbol}
        compact
        className="text-sm"
      />

      {valueToBigNumber(balance.usd).isGreaterThan(0) && (
        <Badge variant="subtle" className="text-[0.70rem] font-normal">
          <FormattedNumber value={balance.usd} symbol="USD" compact />
        </Badge>
      )}
    </div>
  );
}
