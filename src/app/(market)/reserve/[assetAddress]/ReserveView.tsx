"use client";

import { useChainId } from "wagmi";

import { Card } from "@/components";
import { NETWORK_BY_CHAIN_ID, type NetworkConfig } from "@/config/networks";
import { useMarketContext } from "@/context/MarketContext";

import ReserveActions from "./components/ReserveActions";
import ReserveCharts from "./components/ReserveCharts";
import ReserveHeader from "./components/ReserveHeader";
import ReserveStats from "./components/ReserveStats";
import { ReserveHeaderSkeleton, ReserveStatsSkeleton } from "./Skeletons";

export default function ReserveView({ assetAddress }: { assetAddress: string }) {
  const chainId = useChainId();

  const { isLoading, error, supplyReserves } = useMarketContext();
  const reserve = supplyReserves[assetAddress];

  const currentChain: NetworkConfig | undefined = NETWORK_BY_CHAIN_ID[chainId]; // TODO: export to a web3 context

  if (error) return <div>Error loading reserve</div>;

  return (
    <main className="bg-background min-h-screen w-full py-6">
      <div className="container mx-auto space-y-6 px-2">
        <Card>
          {isLoading ? (
            <>
              <ReserveHeaderSkeleton />
              <ReserveStatsSkeleton />
            </>
          ) : (
            <>
              {reserve && currentChain && (
                <>
                  <ReserveHeader asset={reserve} chain={currentChain} />
                  <ReserveStats asset={reserve} />
                </>
              )}
            </>
          )}
        </Card>

        <div className="flex gap-x-6">
          <ReserveActions loading={isLoading} />
          <ReserveCharts reserve={reserve} loading={isLoading} />
        </div>
      </div>
    </main>
  );
}
