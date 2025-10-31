"use client";

import { useEffect } from "react";
import { useChainId } from "wagmi";

import { MarketView } from "@/app/markets/MarketView";
import { useMarketAssets } from "@/hooks/useMarketAssets";
import { useMarketStore } from "@/stores/market";

export default function Page() {
  const cid = useChainId();
  const { assets, loading, error, market } = useMarketAssets(cid);
  const setMarketData = useMarketStore((s) => s.setMarketData);

  useEffect(() => {
    setMarketData({ assets, market, loading, error });
  }, [assets, market, loading, error, setMarketData]);

  if (error) {
    return <div>Error loading markets: {error}</div>;
  }

  return (
    <main className="bg-background min-h-screen w-full">
      <MarketView />
    </main>
  );
}
