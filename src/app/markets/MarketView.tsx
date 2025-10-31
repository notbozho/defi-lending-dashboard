import Image from "next/image";

import { MarketsAssetsTable } from "@/app/markets/MarketAssetsTable";
import { MarketMetrics } from "@/app/markets/MarketMetrics";
import { FormattedNumber } from "@/components/FormattedNumber";
import { Skeleton } from "@/components/ui/skeleton";
import { useMarketStore } from "@/stores/market";

export function MarketView() {
  const { assets, market, totalBorrows, loading } = useMarketStore();

  const isLoading = loading || !assets.length || !market;

  return (
    <div className="container mx-auto w-full space-y-6 px-4 py-10">
      <div className="flex items-center gap-4">
        {isLoading ? (
          <Skeleton className="h-12 w-12 bg-white/80" />
        ) : (
          <Image
            src={market?.icon ?? ""}
            alt={market?.name ?? ""}
            className="h-12 w-12"
            width={40}
            height={40}
          />
        )}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Market Assets</h1>
          {isLoading ? <Skeleton className="h-6 w-32 bg-white/80" /> : <span>{market?.name}</span>}
        </div>
      </div>
      <MarketMetrics
        loading={isLoading}
        totalSupply={market?.totalMarketSize ?? 0}
        totalAvailable={market?.totalAvailableLiquidity ?? 0}
        totalBorrows={totalBorrows ?? 0}
        assetsCount={market?.supplyReserves.length ?? 0}
      />

      <MarketsAssetsTable />
    </div>
  );
}
