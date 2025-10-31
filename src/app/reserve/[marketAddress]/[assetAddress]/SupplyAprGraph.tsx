"use client";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useChainId } from "wagmi";

import FadeInOut from "@/components/animations/FadeInOut";
import TextBlur from "@/components/animations/TextBlur";
import { Toggle, ToggleGroup } from "@/components/shared/ToggleGroup";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Spinner } from "@/components/ui/spinner";
import { useSupplyAPRHistory } from "@/hooks/useSupplyApyHistory";

type SupplyAprGraphProps = {
  marketAddress: string;
  assetAddress: string;
};

const chartConfig = {
  supplyArr: {
    label: "Supply ARR",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export default function SupplyAprGraph({ marketAddress, assetAddress }: SupplyAprGraphProps) {
  const cid = useChainId();
  const { history, error, loading } = useSupplyAPRHistory({
    cid,
    marketAddress,
    assetAddress,
  });

  const [timeRange, setTimeRange] = React.useState("1W");

  const isLoading = loading || !history || history.length === 0;

  if (error) {
    return <div>Error loading supply APR history: {error}</div>;
  }

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Supply Arr</CardTitle>
          <CardDescription>Showing total visitors for the last 3 months</CardDescription>
        </div>
        {/* <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select> */}
        <FadeInOut variant="in" className="space-y-6">
          <ToggleGroup value={timeRange} onValueChange={setTimeRange} variant={"muted"}>
            <Toggle value="24h">24H</Toggle>
            <Toggle value="1W">1W</Toggle>
            <Toggle value="30d">30D</Toggle>
            <Toggle value="6m">6M</Toggle>
            <Toggle value="1y">1Y</Toggle>
          </ToggleGroup>
        </FadeInOut>
      </CardHeader>

      <CardContent className="h-[250px] px-2 pt-4 sm:px-6 sm:pt-6">
        {isLoading && (
          <div className="pointer-events-none flex flex-col items-center justify-center">
            <FadeInOut variant="in">
              <Spinner className="text-muted-foreground h-8 w-8" />
            </FadeInOut>
            <TextBlur
              element="span"
              variant="in"
              wordByWord
              delay={0.3}
              className="text-muted-foreground mt-2 text-sm"
            >
              Loading supply data...
            </TextBlur>
          </div>
        )}
        <ChartContainer config={chartConfig} className="relative aspect-auto h-[250px] w-full">
          <AreaChart data={history}>
            <defs>
              <linearGradient id="fillSupplyArr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} className="stroke-muted/20" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={true}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  }
                  formatter={(value) => `${(value as number).toFixed(2)}%`}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="supplyArr"
              type="natural"
              fill="url(#fillSupplyArr)"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
              isAnimationActive={!loading}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
