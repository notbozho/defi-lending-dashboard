"use client";

import { useEffect } from "react";
import { useChainId } from "wagmi";

import { marketColumns } from "@/app/markets/MarketColumns";
import { MarketsTable } from "@/app/markets/MarketsTable";
import { Skeleton } from "@/components/ui/skeleton";
import { useMarketAssets } from "@/hooks/useMarketAssets";

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

  const { assets, loading, error } = useMarketAssets(cid);

  useEffect(() => {
    console.log("Loaded assets:", assets);
  }, [assets]);
  if (loading) {
    return <Skeleton className="h-9 w-32 rounded-md" />;
  }

  if (error || !assets) {
    return <div>Error loading markets: {error}</div>;
  }

  return (
    <div className="bg-background flex min-h-screen w-full flex-col items-center p-8 px-6 py-8 md:px-12">
      <div className="mx-auto w-full space-y-6">
        <h1 className="mb-4 text-2xl font-bold">Markets</h1>

        <MarketsTable columns={marketColumns} data={assets} />
      </div>
    </div>
  );
}
