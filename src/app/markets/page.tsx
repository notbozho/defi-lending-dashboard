"use client";

import { chainId, useAaveMarkets } from "@aave/react";
import { useChainId } from "wagmi";

import { DataTable } from "@/app/markets/DataTable";
import { marketColumns } from "@/app/markets/MarketColumns";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * 
 * asset: string;
  totalSupplied: number;
  supplyApy: number;
  totalBorrowed: number;
  borrowApy: number;
 */

export default function Page() {
  const cid = useChainId();
  const { data, loading, error } = useAaveMarkets({
    chainIds: [chainId(cid)],
  });

  if (loading) {
    return <Skeleton className="h-9 w-32 rounded-md" />;
  }

  if (error) {
    return <div>Error loading markets: {error}</div>;
  }

  const markets = data
    .flatMap((market) => market.supplyReserves)
    .map((s) => ({
      asset: s.underlyingToken,
      totalSupplied: s.supplyInfo.total.raw,
      supplyApy: s.supplyInfo.apy.raw,
      totalBorrowed: s.borrowInfo?.total.usd,
      borrowApy: s.borrowInfo?.apy.raw,
    }));

  return (
    <div className="bg-background flex flex-col items-center p-8">
      <h1 className="mb-4 text-2xl font-bold">Markets</h1>
      <DataTable columns={marketColumns} data={markets} />
    </div>
  );
}
