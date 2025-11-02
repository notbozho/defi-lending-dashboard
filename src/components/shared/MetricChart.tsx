"use client";

import * as React from "react";
import { useUID } from "react-uid";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import FadeInOut from "@/components/animations/FadeInOut";
import TextBlur from "@/components/animations/TextBlur";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  title: string;
  description?: string;
  chartConfig: ChartConfig;
  data?: T[] | null;
  dataKey: Extract<keyof T, string>;
  valueFormatter?: (val: number) => string;
  labelFormatter?: (val: string | number) => string;
  isLoading?: boolean;
  error?: Error | null;
  color?: string;
  gradientId?: string;
  className?: string;
  yAxisUnit?: string;
  headerRight?: React.ReactNode;
}

export function MetricChart<T extends MetricDataPoint>({
  title,
  description,
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
}: MetricChartProps<T>) {
  const baseId = useUID();
  const gradientId = `gradient-${baseId}`;

  const hasData = Array.isArray(data) && data.length > 0;

  const [hasAnimated, setHasAnimated] = React.useState(false);
  React.useEffect(() => {
    if (hasData && !hasAnimated) setHasAnimated(true);
  }, [hasData, hasAnimated]);

  if (error) {
    return (
      <Card className="bg-red-400 px-6">
        <span>Error loading chart: {error.message}</span>
      </Card>
    );
  }

  return (
    <Card className={cn("relative pt-0", className)}>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>

        {headerRight && <div className="shrink-0">{headerRight}</div>}
      </CardHeader>

      <CardContent className="relative h-[250px] px-2 pt-4 sm:px-6 sm:pt-6">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-sm">
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

        <ChartContainer config={chartConfig} className="relative aspect-auto h-[250px] w-full">
          <AreaChart
            data={data ?? []}
            margin={{
              left: -14,
              right: 4,
            }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.2} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} className="stroke-muted" strokeDasharray="2 2" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} unit={yAxisUnit} />
            <ChartTooltip
              isAnimationActive={false}
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
              isAnimationActive={!hasAnimated}
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
      </CardContent>
    </Card>
  );
}
