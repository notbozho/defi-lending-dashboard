"use client";

import Image from "next/image";

import { MarketMetrics } from "@/app/(market)/reserves/MarketMetrics";
import { MarketReservesTable } from "@/app/(market)/reserves/MarketReservesTable";
import { Card, CardHeader } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import { MARKETS } from "@/config";
import { useMarketContext } from "@/context/MarketContext";

export function MarketReservesView() {
  const { market, isLoading, supplyReserves } = useMarketContext();

  const marketConfig = MARKETS[market?.name || ""];

  const totalBorrows = market?.borrowReserves.reduce((acc, reserve) => {
    const value = reserve.borrowInfo?.total.usd ?? 0;
    return acc + Number(value);
  }, 0);

  return (
    <div className="container mx-auto min-h-screen w-full space-y-6 px-2 py-6">
      <Card>
        <CardHeader className="flex items-center gap-4">
          {isLoading || !market ? (
            <Skeleton className="size-12 bg-white/80" />
          ) : (
            <Image
              src={market.icon}
              alt={market?.name || "market logo"}
              className="size-12 rounded-full"
              width={40}
              height={40}
            />
          )}
          <div className="flex flex-col">
            {isLoading ? (
              <Skeleton className="h-6 w-32 bg-white/80" />
            ) : (
              <span className="text-3xl font-medium">{marketConfig?.marketTitle}</span>
            )}
          </div>
        </CardHeader>
        <MarketMetrics
          loading={isLoading}
          totalSupply={market?.totalMarketSize ?? 0}
          totalAvailable={market?.totalAvailableLiquidity ?? 0}
          totalBorrows={totalBorrows ?? 0}
          assetsCount={market?.supplyReserves.length ?? 0}
        />
      </Card>

      <MarketReservesTable reserves={Object.values(supplyReserves)} loading={isLoading} />
    </div>
  );
}
