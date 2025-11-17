import { BigDecimal } from "@aave/react";

import MetricItem from "@/components/shared/MetricItem";
import { CardContent } from "@/components/ui/card";

interface MarketMetricsProps {
  loading: boolean;
  totalSupply: BigNumber | number | BigDecimal;
  totalAvailable: BigNumber | number | BigDecimal;
  totalBorrows: BigNumber | number | BigDecimal;
  assetsCount: number;
}

export function MarketMetrics({
  loading,
  totalSupply,
  totalAvailable,
  totalBorrows,
  assetsCount,
}: MarketMetricsProps) {
  return (
    <CardContent className="flex flex-row gap-24">
      <MetricItem
        label="Total Supply"
        tooltipText="The total amount of assets supplied to the market."
        value={totalSupply}
        loading={loading}
        symbol="usd"
      />
      <MetricItem
        label="Total Available"
        tooltipText="The total amount of assets available for borrowing."
        value={totalAvailable}
        loading={loading}
        symbol="usd"
      />
      <MetricItem
        label="Total Borrows"
        tooltipText="The total amount of assets borrowed from the market."
        value={totalBorrows}
        loading={loading}
        symbol="usd"
      />
      <MetricItem
        label="Assets"
        tooltipText="The total number of unique assets in the market."
        value={assetsCount}
        loading={loading}
        decimals={0}
      />
    </CardContent>
  );
}
