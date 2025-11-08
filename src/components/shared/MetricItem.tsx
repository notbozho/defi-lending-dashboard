import { BigDecimal } from "@aave/react";

import { FormattedNumber } from "@/components/shared/FormattedNumber";

interface MetricItemProps {
  label: string;
  value?: BigNumber | number | BigDecimal;
  symbol?: string;
  loading: boolean;
  decimals?: number;
  compactThreshold?: number;
  children?: React.ReactNode;
}

export default function MetricItem({
  label,
  value,
  symbol,
  loading,
  decimals,
  compactThreshold,
  children,
}: MetricItemProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-start">
        <span className="text-muted-foreground text-sm">{label}</span>
        <FormattedNumber
          value={value}
          symbol={symbol}
          compact
          animated={true}
          decimals={decimals}
          loading={loading}
          compactThreshold={compactThreshold}
          tone="mutedSymbol"
          className="text-base font-medium"
        />
      </div>
      {children}
    </div>
  );
}
