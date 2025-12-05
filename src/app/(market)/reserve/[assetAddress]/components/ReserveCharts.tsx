"use client";

import { InterestRateChart } from "@/app/(market)/reserve/[assetAddress]/components/InterestRateChart";
import { Button } from "@/components";
import { IconTooltip } from "@/components/shared/IconTooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="text-xl font-medium">Supply Info</CardTitle>
          <IconTooltip text="The historical annual percentage rate (APR) for supplying this asset." />
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
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="text-xl font-medium">Borrow Info</CardTitle>
          <IconTooltip text="The historical annual percentage rate (APR) for borrowing this asset." />
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
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-xl font-medium">Interest Rate Model</CardTitle>
          <Button variant="link">Interest Rate Strategy</Button>
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
