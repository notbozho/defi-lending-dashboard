"use client";

import * as React from "react";
import { useUID } from "react-uid";
import { motion } from "motion/react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { AnimatedNumber } from "@/components";
import FadeInOut from "@/components/animations/FadeInOut";
import TextBlur from "@/components/animations/TextBlur";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export interface MetricDataPoint {
  date: string | number;
  [key: string]: number | string;
}

export interface MetricChartProps<T extends MetricDataPoint> {
  label: string;
  chartConfig: ChartConfig;
  data?: T[] | null;
  dataKey: Extract<keyof T, string>;
  valueFormatter?: (_val: number) => string;
  labelFormatter?: (_val: string | number) => string;
  isLoading?: boolean;
  error?: Error | null;
  color?: string;
  gradientId?: string;
  className?: string;
  yAxisUnit?: string;
  headerRight?: React.ReactNode;
  currentValue?: number;
}

export function MetricChart<T extends MetricDataPoint>({
  label,
  chartConfig,
  data,
  dataKey,
  valueFormatter = (val) => `${val.toFixed(2)}%`,
  labelFormatter = (val) =>
    new Date(val).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  isLoading = false,
  error = null,
  color = "var(--chart-2)",
  className,
  yAxisUnit = "%",
  headerRight,
  currentValue,
}: MetricChartProps<T>) {
  const baseId = useUID();
  const gradientId = `gradient-${baseId}`;
  const hasData = Array.isArray(data) && data.length > 0;

  if (error) {
    return <div className="text-red-500">Error loading chart: {error.message}</div>;
  }

  const avg = hasData
    ? data!.reduce((acc, point) => acc + (Number(point[dataKey]) || 0), 0) / data!.length
    : 0;

  return (
    <div className={cn("relative w-full", className)}>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
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
            Loading data...
          </TextBlur>
        </div>
      )}

      <div className="flex justify-between">
        <div className="flex justify-start pb-4">
          <div className="flex items-center gap-2 border-r pr-4">
            <div className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
            <p className="text-muted-foreground text-sm">{label}</p>
          </div>

          <div className="flex items-center gap-2 pr-2 pl-4 text-sm">
            <span className="text-muted-foreground">Average:</span>
            <AnimatedNumber value={avg} mode="formatted" symbol="%" decimals={2} />
          </div>

          <div className="flex items-center gap-2 pl-2 text-sm">
            <span className="text-muted-foreground">Current:</span>
            <AnimatedNumber value={currentValue ?? 0} mode="formatted" symbol="%" decimals={2} />
          </div>
        </div>
        <div className="mb-3 flex items-center justify-end">
          {headerRight && <div>{headerRight}</div>}
        </div>
      </div>

      <motion.div
        key={hasData ? "chart" : "empty"}
        initial={{ opacity: 0 }}
        animate={{ opacity: hasData ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ChartContainer config={chartConfig} className="relative aspect-auto h-[250px] w-full">
          <AreaChart data={data ?? []} margin={{ left: -14, top: 20, right: 4 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                <stop offset="100%" stopColor={color} stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} className="stroke-muted" strokeDasharray="2 2" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              fontSize={10}
              tickMargin={8}
              minTickGap={64}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={10}
              tickMargin={8}
              unit={yAxisUnit}
            />
            <ChartTooltip
              isAnimationActive={false}
              position={{ y: 40 }}
              cursor={{ strokeDasharray: "4px 4px", stroke: color }}
              content={
                <ChartTooltipContent
                  labelFormatter={labelFormatter}
                  formatter={(value) =>
                    valueFormatter(typeof value === "number" ? value : Number(value))
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              isAnimationActive={hasData}
              animationDuration={800}
              animationEasing="ease-in-out"
              dataKey={dataKey}
              type="natural"
              fill={`url(#${gradientId})`}
              stroke={color}
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ChartContainer>
      </motion.div>
    </div>
  );
}
