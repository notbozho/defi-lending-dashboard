"use client";

import { useChainId } from "wagmi";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useMarketAsset } from "@/hooks/useMarketAssets";

import AprChart from "./AprChart";
import { AssetMetrics } from "./AssetMetrics";

interface ReserveViewProps {
  marketAddress: string;
  assetAddress: string;
}

export default function ReserveView({ marketAddress, assetAddress }: ReserveViewProps) {
  const chainId = useChainId();

  const { asset, error, loading } = useMarketAsset({
    cid: chainId,
    marketAddress,
    assetAddress,
  });

  return (
    <main className="bg-background min-h-screen w-full">
      <div className="container mx-auto space-y-6">
        <h1 className="mb-2 text-2xl font-bold">reserve #{marketAddress}</h1>
        <AssetMetrics
          loading={loading}
          reserveSize={asset?.totalSuppliedUsd ?? 0}
          liquidity={asset?.totalSuppliedUsd.minus(asset?.totalBorrowedUsd) ?? 0}
          oraclePrice={asset?.oraclePrice ?? 0}
        />

        <div className="flex space-y-0 gap-x-6">
          <Card className="order-2 max-h-[calc(100vh-48px)] w-[400px] self-start overflow-x-auto">
            test
          </Card>

          <div className="order-1 grow space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium">Supply Info</h2>
              </CardHeader>
              <CardContent>
                <AprChart type="supply" marketAddress={marketAddress} assetAddress={assetAddress} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium">Borrow Info</h2>
              </CardHeader>
              <CardContent>
                <AprChart type="borrow" marketAddress={marketAddress} assetAddress={assetAddress} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
