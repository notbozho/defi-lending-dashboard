"use client";

import { InterestRateChart } from "@/app/(market)/reserve/[assetAddress]/components/InterestRateChart";
import { IconTooltip } from "@/components/shared/IconTooltip";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MarketReserve } from "@/lib/aave";

import AprChart from "./AprChart";

type ReserveChartsProps = {
  reserve: MarketReserve;
  loading: boolean;
};

export default function ReserveCharts({ reserve, loading }: ReserveChartsProps) {
  return (
    <div className="grow space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-medium">Supply Info</h2>
            <IconTooltip text="The historical annual percentage rate (APR) for supplying this asset." />
          </div>
        </CardHeader>
        <CardContent>
          <AprChart
            type="supply"
            marketAddress={reserve?.marketAddress}
            assetAddress={reserve?.underlyingAddress}
            currentApr={reserve?.supplyApy || 0}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-medium">Borrow Info</h2>
            <IconTooltip text="The historical annual percentage rate (APR) for borrowing this asset." />
          </div>
        </CardHeader>
        <CardContent>
          <AprChart
            type="borrow"
            marketAddress={reserve?.marketAddress}
            assetAddress={reserve?.underlyingAddress}
            currentApr={reserve?.borrowApy || 0}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-medium">Interest Rate Model</h2>
        </CardHeader>
        <CardContent>
          <InterestRateChart
            baseVariableBorrowRate={reserve?.baseVariableBorrowRate || ""}
            optimalUsageRatio={reserve?.optimalUsageRatio || ""}
            totalLiquidityUSD={reserve?.totalSuppliedUsd || 0}
            variableRateSlope1={reserve?.variableRateSlope1 || ""}
            variableRateSlope2={reserve?.variableRateSlope2 || ""}
            utilizationRate={reserve?.utilizationRate || ""}
            totalDebtUSD={reserve?.totalBorrowedUsd || 0}
            loading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
