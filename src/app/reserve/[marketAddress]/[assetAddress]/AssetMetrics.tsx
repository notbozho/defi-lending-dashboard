import { BigDecimal } from "@aave/react";

import MetricItem from "@/components/shared/MetricItem";
import { Card } from "@/components/ui/card";

interface AssetMetricsProps {
  loading: boolean;
  totalSupply: BigNumber | number | BigDecimal;
  totalAvailable: BigNumber | number | BigDecimal;
  totalBorrows: BigNumber | number | BigDecimal;
  assetsCount: number;
}

export function AssetMetrics({
  loading,
  totalSupply,
  totalAvailable,
  totalBorrows,
  assetsCount,
}: AssetMetricsProps) {
  return (
    <Card className="bg-card divide-border flex-row divide-x p-6">
      <MetricItem label="Reserve Size" value={totalSupply} loading={loading} symbol="usd" />
      <MetricItem label="Liquidity" value={totalAvailable} loading={loading} symbol="usd" />
      <MetricItem label="Oracle Price" value={totalBorrows} loading={loading} symbol="usd" />
    </Card>
  );
}
