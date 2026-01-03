"use client";

import { useEffect, useMemo } from "react";
import { FaShieldHeart } from "react-icons/fa6";
import { animate, motion, useMotionValue, useTransform } from "motion/react";

import { AnimatedNumber, IconTooltip } from "@/components";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(
    " "
  );

  return d;
}

function lerpColor(a: string, b: string, amount: number) {
  const ah = parseInt(a.replace(/#/g, ""), 16),
    ar = ah >> 16,
    ag = (ah >> 8) & 0xff,
    ab = ah & 0xff,
    bh = parseInt(b.replace(/#/g, ""), 16),
    br = bh >> 16,
    bg = (bh >> 8) & 0xff,
    bb = bh & 0xff,
    rr = ar + amount * (br - ar),
    rg = ag + amount * (bg - ag),
    rb = ab + amount * (bb - ab);

  return "#" + (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1);
}

const GRADIENT_STOPS = [
  { percent: 0, color: "#FF003C" },
  { percent: 0.5, color: "#FFE600" },
  { percent: 1, color: "#00FF80" },
];

function getGradientColorAtPercent(percent: number) {
  const p = Math.min(Math.max(percent, 0), 1);
  let lower = GRADIENT_STOPS[0];
  let upper = GRADIENT_STOPS[GRADIENT_STOPS.length - 1];

  for (let i = 0; i < GRADIENT_STOPS.length - 1; i++) {
    if (p >= GRADIENT_STOPS[i].percent && p <= GRADIENT_STOPS[i + 1].percent) {
      lower = GRADIENT_STOPS[i];
      upper = GRADIENT_STOPS[i + 1];
      break;
    }
  }

  if (lower === upper) return lower.color;

  const range = upper.percent - lower.percent;
  const rangePercent = (p - lower.percent) / range;
  return lerpColor(lower.color, upper.color, rangePercent);
}

const VIEWBOX_WIDTH = 300;
const VIEWBOX_HEIGHT = 160;

const RADIUS = 130;
const STROKE_WIDTH = 13;

const CENTER_X = VIEWBOX_WIDTH / 2;
const CENTER_Y = VIEWBOX_HEIGHT - STROKE_WIDTH / 2;

const LABEL_RADIUS = RADIUS - 25;
const ARROW_RADIUS = RADIUS - 50;

const MIN_VAL = 1;
const MAX_VAL = 4;

interface HealthFactorGaugeProps {
  value: number;
}

export default function HealthFactorGauge({ value }: HealthFactorGaugeProps) {
  const clampedValue = Math.min(Math.max(value, MIN_VAL), MAX_VAL);

  const percent = (clampedValue - MIN_VAL) / (MAX_VAL - MIN_VAL);

  const arrowAngle = percent * 180;

  const animatedAngle = useMotionValue(0);
  const animatedColor = useTransform(animatedAngle, (deg) => {
    const p = Math.min(Math.max(deg / 180, 0), 1);
    return getGradientColorAtPercent(p);
  });

  useEffect(() => {
    animate(animatedAngle, arrowAngle, {
      duration: 1,
      ease: "easeOut",
    });
  }, [animatedAngle, arrowAngle]);

  const arrowX = useTransform(animatedAngle, (deg) => {
    return polarToCartesian(CENTER_X, CENTER_Y, ARROW_RADIUS, deg).x;
  });

  const arrowY = useTransform(animatedAngle, (deg) => {
    return polarToCartesian(CENTER_X, CENTER_Y, ARROW_RADIUS, deg).y;
  });

  const arrowRotation = useTransform(animatedAngle, (deg) => deg - 90);

  const ticks = [1, 1.5, 2, 2.5, 3, 3.5, 4];

  const status = useMemo(() => {
    if (value < 1) {
      return {
        label: "Liquidatable",
        color: "text-red-700 dark:text-red-300",
        bg: "bg-red-200 dark:bg-red-900/40",
      };
    }

    if (value < 2)
      return {
        label: "Risky",
        color: "text-red-600 dark:text-red-400",
        bg: "bg-red-100 dark:bg-red-900/30",
      };
    if (value < 3)
      return {
        label: "Moderate",
        color: "text-yellow-600 dark:text-yellow-400",
        bg: "bg-yellow-100 dark:bg-yellow-900/30",
      };
    return {
      label: "Healthy",
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-100 dark:bg-green-900/30",
    };
  }, [value]);

  const toolTip = (
    <>
      Safety of your deposited collateral against the borrowed assets and its underlying value.
      <br />
      <br />
      If the health factor goes below 1, the liquidation of your collateral might be triggered.
    </>
  );

  return (
    <Card>
      <CardHeader variant="inline">
        <CardTitle className="text-lg" variant="withIcon">
          <FaShieldHeart />
          Health Factor
        </CardTitle>
        <IconTooltip text={toolTip} />
      </CardHeader>

      <CardContent className="flex flex-col items-center pt-4 pb-6">
        <div className="relative aspect-300/160 w-full">
          <svg
            viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
            className="h-full w-full overflow-visible"
          >
            <defs>
              <linearGradient
                id="healthGradient"
                gradientUnits="userSpaceOnUse"
                x1={CENTER_X - RADIUS}
                y1="0"
                x2={CENTER_X + RADIUS}
                y2="0"
              >
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#21c43f" />
              </linearGradient>
            </defs>

            <path
              d={describeArc(CENTER_X, CENTER_Y, RADIUS, 0, 180)}
              fill="none"
              stroke="url(#healthGradient)"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              className="opacity-90"
            />

            {ticks.map((t) => {
              const tickPercent = (t - MIN_VAL) / (MAX_VAL - MIN_VAL);
              const tickAngle = tickPercent * 180;
              const pos = polarToCartesian(CENTER_X, CENTER_Y, LABEL_RADIUS, tickAngle);

              return (
                <text
                  key={t}
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-muted-foreground text-[10px] font-medium"
                >
                  {t}
                </text>
              );
            })}

            <motion.g
              style={{
                x: arrowX,
                y: arrowY,
                rotate: arrowRotation,
                transformOrigin: "center center",
              }}
            >
              <motion.path d="M 0 -10 L -6 8 L 6 8 Z" fill={animatedColor} />
            </motion.g>
          </svg>

          <div className="absolute right-0 bottom-0 left-0 flex translate-y-[-5px] flex-col items-center justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              {value > 0 && (
                <Badge className={cn("mb-2 text-sm font-semibold", status.color, status.bg)}>
                  {status.label}
                </Badge>
              )}
              <AnimatedNumber
                value={value}
                className="text-foreground text-4xl font-bold"
                decimals={2}
              />
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
