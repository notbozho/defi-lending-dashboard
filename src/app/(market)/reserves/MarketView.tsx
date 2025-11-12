"use client";

import Image from "next/image";

import { MarketMetrics } from "@/app/(market)/reserves/MarketMetrics";
import { MarketReservesTable } from "@/app/(market)/reserves/MarketReservesTable";
import { Skeleton } from "@/components/ui/skeleton";
import { useMarketContext } from "@/context/MarketContext";

export function MarketView() {
  const { market, isLoading, supplyReserves } = useMarketContext();

  const totalBorrows = market?.borrowReserves.reduce((acc, reserve) => {
    const value = reserve.borrowInfo?.total.usd ?? 0;
    return acc + Number(value);
  }, 0);

  return (
    <div className="container mx-auto w-full space-y-6 px-4 py-10">
      <div className="flex items-center gap-4">
        {isLoading || !market ? (
          <Skeleton className="h-12 w-12 bg-white/80" />
        ) : (
          <Image
            src={market.icon}
            alt={market?.name || "market logo"}
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

      <MarketReservesTable reserves={Object.values(supplyReserves)} loading={isLoading} />
    </div>
  );
}
