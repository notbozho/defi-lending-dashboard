import { BigDecimal } from "@aave/react";

import { FormattedNumber } from "@/components/shared/FormattedNumber";
import { IconTooltip } from "@/components/shared/IconTooltip";

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
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="leading-none">{label}</span>
        <IconTooltip text={tooltipText} />
      </div>
      <FormattedNumber
        value={value}
        symbol={symbol}
        compact
        decimals={decimals}
        loading={loading}
        compactThreshold={compactThreshold}
        tone="mutedSymbol"
        className="text-3xl"
      />
    </div>
  );
}
