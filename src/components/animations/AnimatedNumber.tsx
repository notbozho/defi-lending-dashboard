import { useEffect, useRef, useState } from "react";
import BigNumber from "bignumber.js";
import { animate } from "motion/react";

import { FormattedNumber, FormattedNumberProps } from "@/components";

type DisplayMode = "number" | "formatted";

export type AnimatedNumberProps = {
  value: number | string | BigNumber;
  duration?: number;
  mode?: DisplayMode;
  decimals?: number;
} & Omit<FormattedNumberProps, "value">;

export function AnimatedNumber({
  value,
  duration = 0.6,
  mode = "formatted",
  decimals = 2,
  ...formattedProps
}: AnimatedNumberProps) {
  const target = new BigNumber(value).toNumber();

  const prevRef = useRef(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(prevRef.current, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v),
    });

    prevRef.current = target;

    return () => controls.stop();
  }, [target, duration]);

  if (mode === "number") {
    return <span className={formattedProps.className}>{display.toFixed(decimals)}</span>;
  }

  return <FormattedNumber value={display} {...formattedProps} />;
}
