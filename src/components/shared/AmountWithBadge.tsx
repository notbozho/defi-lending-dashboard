import { FormattedNumber } from "@/components/shared/FormattedNumber";
import { Badge } from "@/components/ui/badge";

export default function AmountWithBadge({
  value,
  symbol,
  usdAmount,
}: {
  value: number | BigNumber;
  symbol: string;
  usdAmount: number;
}) {
  return (
    <div className="flex grow-0 gap-2">
      <FormattedNumber value={value} symbol={symbol} className="text-sm" compact />
      {!value || !usdAmount ? undefined : (
        <Badge
          asChild
          variant="subtle"
          className="text-muted-foreground text-[0.70rem] font-normal"
        >
          <FormattedNumber value={usdAmount} symbol="USD" compact />
        </Badge>
      )}
    </div>
  );
}
