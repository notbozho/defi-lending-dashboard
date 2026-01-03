import { BigDecimal } from "@aave/react";

import { FormattedNumber } from "@/components/shared/FormattedNumber";
import { IconTooltip } from "@/components/shared/IconTooltip";
import { Skeleton } from "@/components/ui";

interface MetricItemProps {
  label: string;
  tooltipText: string;
  value?: BigNumber | number | BigDecimal;
  symbol?: string;
  loading: boolean;
  decimals?: number;
  compactThreshold?: number;
}

export default function MetricItem({
  label,
  tooltipText,
  value,
  symbol,
  loading,
  decimals,
  compactThreshold,
}: MetricItemProps) {
  const isLoading = loading || value === undefined || value === null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-secondary-foreground leading-none">{label}</span>
        <IconTooltip text={tooltipText} />
      </div>

      {isLoading ? (
        <Skeleton className="h-9 w-28 rounded-md align-middle" />
      ) : (
        <FormattedNumber
          value={value}
          symbol={symbol}
          compact
          decimals={decimals}
          compactThreshold={compactThreshold}
          tone="mutedSymbol"
          className="text-3xl"
        />
      )}
    </div>
  );
}
