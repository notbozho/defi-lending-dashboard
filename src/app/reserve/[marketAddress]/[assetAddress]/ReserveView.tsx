"use client";

import { useEffect } from "react";
import { useChainId } from "wagmi";

import { Card } from "@/components/ui/card";
import { NETWORK_BY_CHAIN_ID, type NetworkConfig } from "@/config/networks";
import { useMarketAsset } from "@/hooks/useMarketAssets";
import { useReserveStore } from "@/stores/reserve";

import ReserveActions from "./ReserveActions";
import ReserveCharts from "./ReserveCharts";
import ReserveHeader from "./ReserveHeader";
import ReserveStats from "./ReserveStats";
import { ReserveHeaderSkeleton, ReserveStatsSkeleton } from "./Skeletons";

interface ReserveViewProps {
  marketAddress: string;
  assetAddress: string;
}

export default function ReserveView({ marketAddress, assetAddress }: ReserveViewProps) {
  const chainId = useChainId();

  const { asset, loading, error } = useMarketAsset({
    cid: chainId,
    marketAddress,
    assetAddress,
  });

  const setReserveData = useReserveStore((s) => s.setReserveData);
  const currentChain: NetworkConfig | undefined = NETWORK_BY_CHAIN_ID[chainId];

  useEffect(() => {
    setReserveData({ asset, loading, error });
  }, [asset, loading, error, setReserveData]);

  if (error) return <div>Error loading reserve: {error}</div>;

  return (
    <main className="bg-background min-h-screen w-full py-6">
      <div className="container mx-auto space-y-6">
        <Card>
          {loading ? (
            <>
              <ReserveHeaderSkeleton />
              <ReserveStatsSkeleton />
            </>
          ) : (
            <>
              {asset && currentChain && (
                <>
                  <ReserveHeader asset={asset} chain={currentChain} />
                  <ReserveStats asset={asset} />
                </>
              )}
            </>
          )}
        </Card>

        <div className="flex gap-x-6">
          <ReserveActions />
          <ReserveCharts marketAddress={marketAddress} assetAddress={assetAddress} />
        </div>
      </div>
    </main>
  );
}
