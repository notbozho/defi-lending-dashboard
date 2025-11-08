import { useMemo } from "react";

import { cn } from "@/lib/utils";

export interface ProgressCircleProps extends React.HTMLAttributes<SVGElement> {
  value: number;
  strokeWidthPx: number;
  sizePx: number;
  fillColor?: string;
  defs?: React.ReactNode;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  value,
  fillColor,
  sizePx,
  strokeWidthPx,
  className,
  defs,
  ...otherProps
}) => {
  const { circumference, offset } = useMemo(() => {
    const safeValue = value > 100 ? 100 : value;
    const radius = sizePx / 2 - strokeWidthPx / 2;
    const tmpCircumference = 2 * Math.PI * radius;
    const tmpOffset = tmpCircumference * ((100 - safeValue) / 100);

    return {
      circumference: tmpCircumference,
      offset: tmpOffset,
    };
  }, [value, sizePx, strokeWidthPx]);

  return (
    <svg
      width={sizePx}
      height={sizePx}
      className={cn("scale-x-[-1] rotate-90", className)}
      {...otherProps}
    >
      {defs && <defs>{defs}</defs>}

      <circle
        stroke="rgba(255,255,255,0.12)"
        strokeWidth={strokeWidthPx}
        fill="transparent"
        r={sizePx / 2 - strokeWidthPx / 2}
        cx="50%"
        cy="50%"
      />

      <circle
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        stroke={fillColor}
        strokeWidth={strokeWidthPx}
        fill="transparent"
        r={sizePx / 2 - strokeWidthPx / 2}
        cx="50%"
        cy="50%"
      />
    </svg>
  );
};
