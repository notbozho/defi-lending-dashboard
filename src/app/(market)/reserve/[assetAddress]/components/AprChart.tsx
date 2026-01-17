"use client";

import { useState } from "react";
import { useChainId } from "wagmi";
import { useShallow } from "zustand/shallow";

import FadeInOut from "@/components/animations/FadeInOut";
import { MetricChart } from "@/components/shared/MetricChart";
import { Toggle, ToggleGroup } from "@/components/shared/ToggleGroup";
import type { ChartConfig } from "@/components/ui/chart";
import { useAPRHistory } from "@/hooks";
import { TimeWindowMap } from "@/lib/aave/constants";
import { useMarketStore } from "@/stores/useMarketStore";

type AprChartType = "supply" | "borrow";

type AprGraphProps = {
  type: AprChartType;
  marketAddress: string;
  assetAddress: string;
  currentApr: number;
  className?: string;
};

const chartColors: Record<AprChartType, string> = {
  supply: "var(--chart-1)",
  borrow: "var(--chart-2)",
};

const chartLabels: Record<AprChartType, string> = {
  supply: "Supply APR",
  borrow: "Borrow APR",
};

export default function AprChart({
  type,
  marketAddress,
  assetAddress,
  currentApr,
  className,
}: AprGraphProps) {
  const cid = useChainId();
  const [timeRange, setTimeRange] = useState<keyof typeof TimeWindowMap>("1W");

  const {
    history,
    error,
    loading: isLoading,
  } = useAPRHistory({
    cid,
    marketAddress,
    assetAddress,
    period: timeRange,
    borrow: type === "borrow",
  });

  const color = chartColors[type];
  const label = chartLabels[type];

  const chartConfig: ChartConfig = {
    [`${type}Arr`]: {
      label,
      color,
    },
  };

  const headerRight = (
    <FadeInOut variant="in">
      <ToggleGroup
        value={timeRange}
        onValueChange={(val) => {
          if (val && val in TimeWindowMap) {
            setTimeRange(val as keyof typeof TimeWindowMap);
          }
        }}
        variant="muted"
      >
        <Toggle value="24H">24H</Toggle>
        <Toggle value="1W">1W</Toggle>
        <Toggle value="1M">30D</Toggle>
        <Toggle value="6M">6M</Toggle>
        <Toggle value="1Y">1Y</Toggle>
      </ToggleGroup>
    </FadeInOut>
  );

  return (
    <div className={className}>
      <MetricChart
        label={label}
        chartConfig={chartConfig}
        data={history}
        dataKey={`apr`}
        isLoading={isLoading}
        error={error ?? null}
        color={color}
        yAxisUnit="%"
        headerRight={headerRight}
        currentValue={(currentApr ?? 0) * 100}
      />
    </div>
  );
}
