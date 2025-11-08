"use client";

import { InterestRateChart } from "@/app/reserve/[marketAddress]/[assetAddress]/components/InterestRateChart";
import { IconTooltip } from "@/components/shared/IconTooltip";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useReserveStore } from "@/stores/reserve";

import AprChart from "./AprChart";

type ReserveChartsProps = {
  marketAddress: string;
  assetAddress: string;
};

export default function ReserveCharts({ marketAddress, assetAddress }: ReserveChartsProps) {
  const asset = useReserveStore((s) => s.asset);

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
          <AprChart type="supply" marketAddress={marketAddress} assetAddress={assetAddress} />
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
          <AprChart type="borrow" marketAddress={marketAddress} assetAddress={assetAddress} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-medium">Interest Rate Model</h2>
        </CardHeader>
        <CardContent>
          <InterestRateChart
            baseVariableBorrowRate={asset?.baseVariableBorrowRate || ""}
            optimalUsageRatio={asset?.optimalUsageRatio || ""}
            totalLiquidityUSD={asset?.totalSuppliedUsd || ""}
            variableRateSlope1={asset?.variableRateSlope1 || ""}
            variableRateSlope2={asset?.variableRateSlope2 || ""}
            utilizationRate={asset?.utilizationRate || ""}
            totalDebtUSD={asset?.totalBorrowedUsd || ""}
            loading={!asset}
          />
        </CardContent>
      </Card>
    </div>
  );
}
