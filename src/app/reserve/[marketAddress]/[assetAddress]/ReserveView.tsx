"use client";

import { useChainId } from "wagmi";

import { Card } from "@/components";
import { NETWORK_BY_CHAIN_ID, type NetworkConfig } from "@/config/networks";
import { useMarketReserve } from "@/hooks";

import ReserveActions from "./components/ReserveActions";
import ReserveCharts from "./components/ReserveCharts";
import ReserveHeader from "./components/ReserveHeader";
import ReserveStats from "./components/ReserveStats";
import { ReserveHeaderSkeleton, ReserveStatsSkeleton } from "./Skeletons";

type ReserveViewProps = {
  marketAddress: string;
  assetAddress: string;
};

export default function ReserveView({ marketAddress, assetAddress }: ReserveViewProps) {
  const chainId = useChainId();

  const { asset, loading, error } = useMarketReserve({
    cid: chainId,
    marketAddress,
    underlyingToken: assetAddress,
  });

  const currentChain: NetworkConfig | undefined = NETWORK_BY_CHAIN_ID[chainId];

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
          <ReserveActions loading={loading} />
          <ReserveCharts marketAddress={marketAddress} assetAddress={assetAddress} />
        </div>
      </div>
    </main>
  );
}
