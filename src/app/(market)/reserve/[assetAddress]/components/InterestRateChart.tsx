"use client";

import React, { useMemo } from "react";
import { normalizeBN, RAY, rayDiv, rayMul } from "@aave/math-utils";
import BigNumber from "bignumber.js";
import { motion } from "motion/react";
import { CartesianGrid, Line, LineChart, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";

import { FormattedNumber } from "@/components";
import FadeInOut from "@/components/animations/FadeInOut";
import TextBlur from "@/components/animations/TextBlur";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type InterestRateModelType = {
  utilizationRate: string;
  optimalUsageRatio: string;
  variableRateSlope1: string;
  variableRateSlope2: string;
  baseVariableBorrowRate: string;
  totalLiquidityUSD: number;
  totalDebtUSD: number;
};

type InterestRateChartProps = InterestRateModelType & {
  loading: boolean;
  className?: string;
};

type Rate = {
  variableRate: number;
  utilization: number;
};

type RechartsPayload<T> = { payload: T };

type CustomTooltipProps = {
  active?: boolean;
  payload?: RechartsPayload<Rate>[];
  liquidity: number;
  debt: number;
};
type LabelViewBox = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

type PillLabelProps = {
  viewBox?: LabelViewBox;
  text: string;
  offsetPercent?: number;
};

function PillLabel({ viewBox, text, offsetPercent = 0 }: PillLabelProps) {
  if (!viewBox || viewBox.x == null || viewBox.y == null || viewBox.height == null) return null;

  const { x, y, height } = viewBox;
  const cy = y + height * (0.5 + offsetPercent);

  const fontSize = 10;
  const padX = 6;
  const padY = 3;
  const textWidth = text.length * fontSize * 0.6;
  const rectW = textWidth + padX * 2;
  const rectH = fontSize + padY * 2;

  return (
    <g transform={`translate(${x}, ${cy})`}>
      <rect
        x={-rectW / 2}
        y={-rectH / 2}
        width={rectW}
        height={rectH}
        rx={6}
        ry={6}
        className="fill-muted"
      />
      <text textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-[10px]">
        {text}
      </text>
    </g>
  );
}

function CustomTooltip({ active, payload, liquidity, debt }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const p = payload[0].payload;
  const utilization = new BigNumber(p.utilization);
  const rate = new BigNumber(p.variableRate).multipliedBy(100);

  const liquidityBN = new BigNumber(liquidity);
  const debtBN = new BigNumber(debt);

  const targetDebt = liquidityBN.multipliedBy(utilization.dividedBy(100));
  const delta = targetDebt.minus(debtBN);
  const isBorrow = delta.isGreaterThan(0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: -6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -6 }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 35,
        mass: 0.4,
      }}
      className="bg-popover text-foreground w-64 rounded-md p-3 text-xs shadow-lg"
    >
      <div className="mb-2 flex justify-between">
        <span>Utilization</span>
        <span className="font-medium">{utilization.toNumber()}%</span>
      </div>

      <div className="mb-2 flex justify-between">
        <span>Variable Rate</span>
        <span className="font-medium">{rate.toFixed(2)}%</span>
      </div>

      <div className="mb-1 h-px w-full bg-gray-200" />

      <div className="flex justify-between">
        {isBorrow ? (
          <>
            <span>Borrow to reach {utilization.toFixed(2)}%</span>
            <FormattedNumber
              value={delta}
              decimals={2}
              symbol="usd"
              compact
              className="text-xs font-medium"
            />
          </>
        ) : (
          <>
            <span>Repay to reach {utilization.toFixed(2)}%</span>
            <FormattedNumber
              value={delta.abs()}
              decimals={2}
              size="sm"
              symbol="usd"
              compact
              className="text-xs font-medium"
            />
          </>
        )}
      </div>
    </motion.div>
  );
}

const AnimatedLine = motion.line;

const resolution = 200;
const step = 100 / resolution;

function getRates({
  variableRateSlope1,
  variableRateSlope2,
  optimalUsageRatio,
  baseVariableBorrowRate,
}: Pick<
  InterestRateModelType,
  "variableRateSlope1" | "variableRateSlope2" | "optimalUsageRatio" | "baseVariableBorrowRate"
>): Rate[] {
  const rates: Rate[] = [];
  const formattedOptimalUtilizationRate = normalizeBN(optimalUsageRatio, 25).toNumber();

  for (let i = 0; i <= resolution; i++) {
    const utilization = i * step;
    if (utilization === 0) {
      rates.push({
        variableRate: 0,
        utilization,
      });
    } else if (utilization < formattedOptimalUtilizationRate) {
      const theoreticalVariableAPY = normalizeBN(
        new BigNumber(baseVariableBorrowRate).plus(
          rayDiv(rayMul(variableRateSlope1, normalizeBN(utilization, -25)), optimalUsageRatio)
        ),
        27
      ).toNumber();
      rates.push({
        variableRate: theoreticalVariableAPY,
        utilization,
      });
    } else {
      const excess = rayDiv(
        normalizeBN(utilization, -25).minus(optimalUsageRatio),
        RAY.minus(optimalUsageRatio)
      );
      const theoreticalVariableAPY = normalizeBN(
        new BigNumber(baseVariableBorrowRate)
          .plus(variableRateSlope1)
          .plus(rayMul(variableRateSlope2, excess)),
        27
      ).toNumber();
      rates.push({
        variableRate: theoreticalVariableAPY,
        utilization,
      });
    }
  }
  return rates;
}

export function InterestRateChart({
  utilizationRate,
  optimalUsageRatio,
  variableRateSlope1,
  variableRateSlope2,
  baseVariableBorrowRate,
  totalLiquidityUSD,
  totalDebtUSD,
  loading,
  className,
}: InterestRateChartProps) {
  const formattedCurrentUtilizationRate = (Number(utilizationRate) * 100).toFixed(2);
  const formattedOptimalUtilizationRate = normalizeBN(optimalUsageRatio, 25).toNumber();

  const data = useMemo(
    () =>
      getRates({
        optimalUsageRatio: optimalUsageRatio,
        variableRateSlope1: variableRateSlope1,
        variableRateSlope2: variableRateSlope2,
        baseVariableBorrowRate: baseVariableBorrowRate,
      }),
    [optimalUsageRatio, variableRateSlope1, variableRateSlope2, baseVariableBorrowRate]
  );

  if (loading) {
    return <div className={cn("bg-card relative h-[250px] w-full", className)} />;
  }

  const hasData = Array.isArray(data) && data.length > 0;
  const maxY = (hasData ? Math.max(...data.map((d) => d.variableRate)) : 0) * 1.1;

  const chartConfig: ChartConfig = {
    variableRate: {
      label: "Variable Rate",
      color: "var(--primary)",
    },
  };

  return (
    <div className={cn("relative w-full", className)}>
      {loading && (
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

      <motion.div
        key={hasData ? "chart" : "empty"}
        initial={{ opacity: 0 }}
        animate={{ opacity: hasData ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ChartContainer config={chartConfig} className="relative aspect-auto h-[250px] w-full">
          <LineChart data={data ?? []} margin={{ left: -14, top: 20, right: 4 }}>
            <CartesianGrid vertical={false} className="stroke-muted" strokeDasharray="2 2" />
            <XAxis
              dataKey="utilization"
              type="number"
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
              tickCount={16}
              fontSize={10}
              domain={[0, 100]}
            />
            <YAxis
              tickFormatter={(v) => `${v}%`}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={10}
              domain={[0, maxY]}
            />

            <Tooltip
              isAnimationActive={false}
              position={{ y: 40 }}
              cursor={{ stroke: "#9ca3af", strokeDasharray: "4px 4px" }}
              content={<CustomTooltip liquidity={totalLiquidityUSD} debt={totalDebtUSD} />}
            />

            <Line
              type="monotone"
              dataKey={(d: Rate) => d.variableRate * 100}
              stroke="var(--primary)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={hasData}
            />

            <ReferenceLine
              x={Number(formattedCurrentUtilizationRate)}
              stroke="var(--muted-foreground)"
              strokeDasharray="5 2"
              label={(props) => (
                <PillLabel
                  {...props}
                  text={`Current ${formattedCurrentUtilizationRate}%`}
                  offsetPercent={0}
                />
              )}
              shape={(props) => {
                const { x1, x2, y1, y2 } = props;
                return (
                  <AnimatedLine
                    x1={x1}
                    x2={x2}
                    y1={y1}
                    y2={y2}
                    stroke="var(--muted-foreground)"
                    strokeWidth={1}
                    strokeDasharray="5 2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
                  />
                );
              }}
            />

            <ReferenceLine
              x={formattedOptimalUtilizationRate}
              stroke="var(--muted-foreground)"
              strokeDasharray="5 2"
              label={(props) => (
                <PillLabel
                  {...props}
                  text={`Optimal ${formattedOptimalUtilizationRate}%`}
                  offsetPercent={-0.2}
                />
              )}
              shape={(props) => {
                const { x1, x2, y1, y2 } = props;
                return (
                  <AnimatedLine
                    x1={x1}
                    x2={x2}
                    y1={y1}
                    y2={y2}
                    stroke="var(--muted-foreground)"
                    strokeWidth={0.5}
                    strokeDasharray="5 2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.4, ease: "easeOut" }}
                  />
                );
              }}
            />
          </LineChart>
        </ChartContainer>
      </motion.div>
    </div>
  );
}
