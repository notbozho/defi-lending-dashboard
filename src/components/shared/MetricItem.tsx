import { BigDecimal } from "@aave/react";

import { FormattedNumber } from "@/components/FormattedNumber";

interface MetricItemProps {
  label: string;
  value?: BigNumber | number | BigDecimal;
  symbol?: string;
  loading: boolean;
  decimals?: number;
}

export default function MetricItem({ label, value, symbol, loading, decimals }: MetricItemProps) {
  return (
    <div className="flex flex-col items-start not-last:pr-6">
      <span className="text-muted-foreground text-sm">{label}</span>
      <FormattedNumber
        value={value}
        symbol={symbol}
        compact
        decimals={decimals}
        loading={loading}
        className="text-base font-medium"
      />
    </div>
  );
}
