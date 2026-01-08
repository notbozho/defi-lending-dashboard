import { SetStateAction, useMemo, useState } from "react";
import { FaWallet } from "react-icons/fa6";
import BigNumber from "bignumber.js";
import { motion } from "motion/react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  AnimatedNumber,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  IconTooltip,
} from "@/components";
import { MarketReserve } from "@/lib/aave";

type MyWalletCardProps = {
  balances: Record<string, BigNumber>;
  reserves: Record<string, MarketReserve>;
  loading: boolean;
};

const GRADIENTS = [
  { start: "#00FF94", end: "#00B8FF" },
  { start: "#FF0F7B", end: "#F89B29" },
  { start: "#9D00FF", end: "#5400FF" },
  { start: "#7F00FF", end: "#E100FF" },
  { start: "#00F0FF", end: "#0047FF" },
  { start: "#FFD600", end: "#FF5E00" },
];

const getCssGradient = (index: number) => {
  const g = GRADIENTS[index % GRADIENTS.length];
  return `linear-gradient(135deg, ${g.start}, ${g.end})`;
};

export default function MyWalletCard({ balances, reserves, loading }: MyWalletCardProps) {
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  const chartData = useMemo(() => {
    const data: Array<{
      name: string;
      symbol: string;
      value: number;
      gradientId: string;
      gradientCss: string;
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
          gradientId: `url(#gradient-${data.length})`,
          gradientCss: getCssGradient(data.length),
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
          gradientId: `url(#gradient-5)`,
          gradientCss: getCssGradient(5),
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
          gradientId: "var(--muted)",
          gradientCss: "var(--muted)",
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
    <Card>
      <CardHeader variant="inline">
        <CardTitle className="text-lg font-medium" variant="withIcon">
          <FaWallet />
          My Wallet
        </CardTitle>
        <IconTooltip text="Supported assets in your wallet" />
      </CardHeader>
      <CardContent>
        {/* reset hover state here due to a bug when pointer leaves the chart area too fast, 
        outline-none to fix a bug in recharts of showing focus outline when the chart is clicked  */}
        <div
          className="relative mx-auto mb-6 h-72 min-h-72 w-72 min-w-72 **:outline-none"
          onPointerLeave={handleMouseExit}
        >
          {!loading && displayCategories.length > 0 && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart className="z-50">
                <defs>
                  {GRADIENTS.map((gradient, index) => (
                    <linearGradient
                      id={`gradient-${index}`}
                      key={index}
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor={gradient.start} />
                      <stop offset="100%" stopColor={gradient.end} />
                    </linearGradient>
                  ))}
                </defs>

                <Pie
                  data={displayCategories}
                  cx="50%"
                  cy="50%"
                  focusable={false}
                  innerRadius="90%"
                  outerRadius="100%"
                  paddingAngle={2}
                  cornerRadius={12}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                  strokeWidth={0}
                  onMouseOver={handleMouseEnter}
                  onMouseLeave={handleMouseExit}
                  onFocus={handleMouseExit}
                  onBlur={handleMouseExit}
                  animationBegin={0}
                  animationDuration={1000}
                  animationEasing="ease-in-out"
                >
                  {displayCategories.map((item, index) => {
                    const isDimmed = hoveredSlice && hoveredSlice !== item.name;

                    return (
                      <Cell
                        key={index}
                        fill={isZero ? "#e5e7eb" : item.gradientId}
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
          )}

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="wrap mb-1 w-48 text-center text-pretty text-gray-500">
              {hoveredSlice ?? "Total"} Balance
            </span>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AnimatedNumber
                value={displayValue() || 0}
                symbol="usd"
                className="text-4xl font-bold"
                size="xl"
                duration={hoveredSlice ? 0.2 : 1}
              />
            </motion.div>
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
                  <div className="h-2 w-2 rounded-full" style={{ background: item.gradientCss }} />
                  <span>{item.symbol ? `${item.symbol}` : item.name}</span>
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
