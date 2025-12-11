import { useShallow } from "zustand/shallow";

import MetricItem from "@/components/shared/MetricItem";
import { CardContent } from "@/components/ui/card";
import { useMarketStore } from "@/stores/useMarketStore";

export function MarketMetrics() {
  const {
    isLoading: loading,
    market,
    supplyReserves,
  } = useMarketStore(
    useShallow((s) => ({
      isLoading: s.isLoading,
      market: s.market,
      supplyReserves: s.supplyReserves,
    }))
  );

  const totalBorrows = market?.borrowReserves.reduce((acc, reserve) => {
    const value = reserve.borrowInfo?.total.usd ?? 0;
    return acc + Number(value);
  }, 0);

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
        value={Object.values(supplyReserves).length}
        loading={loading}
        decimals={0}
      />
    </CardContent>
  );
}
