"use client";

import { useChainId } from "wagmi";

import { marketColumns } from "@/app/markets/MarketColumns";
import { MarketsTable } from "@/app/markets/MarketsTable";
import { FormattedNumber } from "@/components/FormattedNumber";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useMarketAssets } from "@/hooks/useMarketAssets";

export default function Page() {
  const cid = useChainId();

  const { assets, loading, error, market } = useMarketAssets(cid);

  if (loading) {
    return <Skeleton className="h-9 w-32 rounded-md" />;
  }

  if (error || !assets) {
    return <div>Error loading markets: {error}</div>;
  }

  const totalBorrows = market.borrowReserves.reduce((acc, reserve) => {
    const value = reserve.borrowInfo?.total.usd ?? 0;
    return acc + Number(value);
  }, 0);

  return (
    <div className="bg-background flex min-h-screen w-full flex-col items-center p-8 px-6 py-8 md:px-12">
      <div className="container mx-auto w-full space-y-6">
        <h1 className="mb-4 text-2xl font-bold">Markets</h1>

        <div className="bg-card border-border flex w-full items-center rounded-md p-4 *:not-first:pl-8 *:not-last:border-r *:not-last:pr-8">
          <div className="flex flex-col items-center gap-2">
            <span className="text-muted-foreground text-sm">Total Supply</span>
            <FormattedNumber
              value={market.totalMarketSize}
              tone="mutedSymbol"
              symbol="usd"
              compact
              size="lg"
              className="text-xl font-bold"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="text-muted-foreground text-sm">Total Available</span>
            <FormattedNumber
              value={market.totalAvailableLiquidity}
              tone="mutedSymbol"
              symbol="usd"
              compact
              size="lg"
              className="text-xl font-bold"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="text-muted-foreground text-sm">Total Borrows</span>
            <FormattedNumber
              value={totalBorrows}
              tone="mutedSymbol"
              symbol="usd"
              compact
              size="lg"
              className="text-xl font-bold"
            />
          </div>
        </div>

        <MarketsTable columns={marketColumns} data={assets} />
      </div>
    </div>
  );
}
