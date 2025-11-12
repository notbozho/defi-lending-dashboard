import { BigDecimal } from "@aave/react";

import MetricItem from "@/components/shared/MetricItem";
import { Card } from "@/components/ui/card";

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
    <Card className="flex-row divide-x px-6">
      <MetricItem label="Total Supply" value={totalSupply} loading={loading} symbol="usd" />
      <MetricItem label="Total Available" value={totalAvailable} loading={loading} symbol="usd" />
      <MetricItem label="Total Borrows" value={totalBorrows} loading={loading} symbol="usd" />
      <MetricItem label="Assets" value={assetsCount} loading={loading} decimals={0} />
    </Card>
  );
}
