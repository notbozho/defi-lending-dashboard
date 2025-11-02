import MetricItem from "@/components/shared/MetricItem";
import { Card } from "@/components/ui/card";

interface AssetMetricsProps {
  loading: boolean;
  reserveSize: BigNumber | number;
  liquidity: BigNumber | number;
  oraclePrice: BigNumber | number;
}

export function AssetMetrics({ loading, reserveSize, liquidity, oraclePrice }: AssetMetricsProps) {
  return (
    <Card className="bg-card divide-border flex-row divide-x p-6">
      <MetricItem label="Reserve Size" value={reserveSize} loading={loading} symbol="usd" />
      <MetricItem label="Liquidity" value={liquidity} loading={loading} symbol="usd" />
      <MetricItem
        label="Oracle Price"
        value={oraclePrice}
        loading={loading}
        symbol="usd"
        compactThreshold={10_000}
      />
    </Card>
  );
}
