import { Market } from "@aave/react";

import MetricItem from "@/components/shared/MetricItem";
import { CardContent } from "@/components/ui/card";
import { MarketReserve } from "@/lib/aave/types/MarketReserve";

type MarketMetricsProps = {
  market?: Market;
  supplyReserves: MarketReserve[];
  loading: boolean;
};

export function MarketMetrics({ market, supplyReserves, loading }: MarketMetricsProps) {
  const totalBorrows =
    market?.borrowReserves.reduce((acc, reserve) => {
      const value = reserve.borrowInfo?.total.usd ?? 0;
      return acc + Number(value);
    }, 0) ?? 0;

  const assetsCount = loading ? undefined : supplyReserves.length;

  return (
    <CardContent className="flex flex-row gap-24">
      <MetricItem
        label="Total Supply"
        tooltipText="The total amount of assets supplied to the market."
        value={market?.totalMarketSize}
        loading={loading}
        symbol="usd"
      />
      <MetricItem
        label="Total Available"
        tooltipText="The total amount of assets available for borrowing."
        value={market?.totalAvailableLiquidity}
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
