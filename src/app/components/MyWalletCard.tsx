import { SetStateAction, useMemo, useState } from "react";
import BigNumber from "bignumber.js";
import { motion } from "motion/react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { AnimatedNumber, Card, CardContent, CardHeader, IconTooltip, Skeleton } from "@/components";
import { MarketReserve } from "@/lib/aave";

type MyWalletCardProps = {
  balances: Record<string, BigNumber>;
  reserves: Record<string, MarketReserve>;
  loading: boolean;
};

const CHART_COLORS = ["#4ade80", "#60a5fa", "#f87171", "#fbbf24", "#a78bfa", "#fb923c"];

const colored = (i: number) => CHART_COLORS[i % CHART_COLORS.length];

export default function MyWalletCard({ balances, reserves, loading }: MyWalletCardProps) {
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  const chartData = useMemo(() => {
    const data: Array<{
      name: string;
      symbol: string;
      value: number;
      color: string;
      rawValue: BigNumber;
      address: string;
      percentage: number;
    }> = [];

    let total = 0;

    Object.entries(balances).forEach(([address, balance]) => {
      const reserve = reserves[address];
      if (!reserve) return;

      const value = balance
        .dividedBy(new BigNumber(10).pow(reserve.decimals))
        .multipliedBy(reserve.oraclePrice)
        .toNumber();

      if (value > 0) {
        data.push({
          name: reserve.name,
          symbol: reserve.symbol,
          color: colored(data.length - 1),
          value,
          rawValue: balance,
          address,
          percentage: 0,
        });
        total += value;
      }
    });

    data.forEach((item) => {
      item.percentage = (item.value / total) * 100;
    });

    return data.sort((a, b) => b.value - a.value);
  }, [balances, reserves]);

  const totalBalance = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.value, 0);
  }, [chartData]);

  const topCategories = useMemo(() => {
    if (chartData.length === 0) return [];

    const top3 = chartData.slice(0, 3);
    const hasMore = chartData.length > 3;

    if (hasMore) {
      const othersValue = chartData.slice(3).reduce((sum, item) => sum + item.value, 0);
      const othersPercentage = (othersValue / totalBalance) * 100;

      return [
        ...top3,
        {
          name: "Others",
          symbol: "",
          value: othersValue,
          color: "#fbbf24",
          rawValue: new BigNumber(0),
          percentage: othersPercentage,
          address: "",
        },
      ];
    }

    return top3;
  }, [chartData, totalBalance]);

  const isZero = totalBalance === 0 && !loading;

  const handleMouseEnter = (data: { name: SetStateAction<string | null> }) => {
    if (isZero || !data.name) return;

    setHoveredSlice(data.name);
  };

  const handleMouseExit = () => {
    if (isZero) return;

    setHoveredSlice(null);
  };

  const displayCategories = isZero
    ? [
        {
          name: "Empty",
          symbol: "",
          value: 1,
          color: "var(--muted)",
          rawValue: new BigNumber(0),
          percentage: 100,
          address: "",
        },
      ]
    : topCategories;

  const displayValue = () => {
    if (hoveredSlice === "Others") {
      return chartData.slice(3).reduce((sum, item) => sum + item.value, 0);
    }

    const item = chartData.find((item) => item.name === hoveredSlice);
    return item ? item.value : totalBalance;
  };

  return (
    <Card className="basis-3/12">
      <CardHeader className="flex items-center justify-between">
        <h2 className="text-xl font-medium">My Wallet</h2>
        <IconTooltip text="Supported assets in your wallet" />
      </CardHeader>
      <CardContent>
        {/* reset hover state here due to a bug when pointer leaves the chart area too fast, 
        outline-none to fix a bug in recharts of showing focus outline when the chart is clicked  */}
        <div
          className="relative mx-auto mb-6 h-72 w-72 **:outline-none"
          onPointerLeave={handleMouseExit}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart className="z-50">
              <Pie
                data={displayCategories}
                cx="50%"
                cy="50%"
                focusable={false}
                innerRadius="85%"
                outerRadius="100%"
                paddingAngle={2}
                cornerRadius={4}
                dataKey="value"
                startAngle={90}
                endAngle={450}
                strokeWidth={0}
                onMouseOver={handleMouseEnter}
                onMouseLeave={handleMouseExit}
                onFocus={handleMouseExit}
                onBlur={handleMouseExit}
                animationBegin={0}
                animationDuration={800}
                animationEasing="ease-out"
              >
                {displayCategories.map((item, index) => {
                  const isDimmed = hoveredSlice && hoveredSlice !== item.name;

                  return (
                    <Cell
                      key={index}
                      fill={item.color}
                      tabIndex={-1}
                      focusable={false}
                      style={{
                        transition: "filter 0.25s ease, opacity 0.25s ease",
                        filter: isDimmed ? "blur(3px) brightness(0.75)" : "none",
                        opacity: isDimmed ? 0.6 : 1,
                        cursor: isZero ? "default" : "pointer",
                        pointerEvents: isZero ? "none" : "auto",
                      }}
                    />
                  );
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="wrap mb-1 w-48 text-center text-pretty text-gray-500">
              {hoveredSlice ?? "Total"} Balance
            </span>

            {loading ? (
              <Skeleton className="h-7 w-32"></Skeleton>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedNumber
                  value={displayValue()}
                  symbol="usd"
                  className="text-2xl font-bold"
                  size="xl"
                  duration={hoveredSlice ? 0.2 : 1}
                />
              </motion.div>
            )}
          </div>
        </div>

        <div className="mb-4 space-y-3">
          {topCategories.map((item, index) => {
            const isDimmed = hoveredSlice && hoveredSlice !== item.name;

            return (
              <motion.div
                key={item.address || `other-${index}`}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  transition: "filter 0.25s ease, opacity 0.25s ease",

                  filter: isDimmed ? "blur(3px) brightness(0.75)" : "none",
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: colored(index) }}
                  />
                  <span className="text">{item.symbol ? `${item.symbol}` : item.name}</span>
                </div>
                <AnimatedNumber value={item.percentage} className="font-medium" symbol="%" />
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
