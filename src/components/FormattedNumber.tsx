import { normalizeBN, valueToBigNumber } from "@aave/math-utils";
import BigNumber from "bignumber.js";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

type CompactNumberProps = {
  value: string | number | BigNumber;
  decimals?: number;
  roundDown?: boolean;
  compactThreshold?: number;
};

const POSTFIXES = ["", "K", "M", "B", "T"];

export const compactNumber = ({
  value,
  decimals = 2,
  roundDown = false,
  compactThreshold = 0,
}: CompactNumberProps) => {
  const bigNumberValue = valueToBigNumber(value);

  let numberLength = bigNumberValue.toFixed(0).length;

  if (compactThreshold && bigNumberValue.isLessThanOrEqualTo(compactThreshold)) {
    numberLength = 0;
  }

  const significantDigitsGroup = Math.min(
    Math.floor(numberLength ? (numberLength - 1) / 3 : 0),
    POSTFIXES.length - 1
  );

  const postfix = POSTFIXES[significantDigitsGroup];

  let formattedValue = normalizeBN(bigNumberValue, 3 * significantDigitsGroup).toNumber();
  if (roundDown) {
    formattedValue = Math.trunc(Number(formattedValue) * 10 ** decimals) / 10 ** decimals;
  }
  const prefix = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(formattedValue);

  return { prefix, postfix };
};

function CompactNumber({ value, decimals, roundDown }: CompactNumberProps) {
  const { prefix, postfix } = compactNumber({ value, decimals, roundDown });

  return (
    <>
      {prefix}
      {postfix}
    </>
  );
}

const numberVariants = cva("inline-flex items-center", {
  variants: {
    tone: {
      default: "",
      mutedNumber: "[&_.number]:text-muted-foreground",
      mutedSymbol: "[&_.symbol]:text-muted-foreground",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    tone: "default",
    size: "md",
  },
});

type FormattedNumberProps = CompactNumberProps & {
  symbol?: string;
  compact?: boolean;
  percent?: boolean;
  tone?: "default" | "mutedNumber" | "mutedSymbol";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function FormattedNumber({
  value,
  decimals = 2,
  roundDown = false,
  compact = false,
  compactThreshold,
  symbol,
  percent = false,
  tone = "default",
  size = "md",
  className,
}: FormattedNumberProps) {
  const number = percent ? valueToBigNumber(value).multipliedBy(100) : valueToBigNumber(value);

  if (number.isZero()) {
    decimals = 0;
  }

  const minValue = new BigNumber(10).pow(-decimals);
  const isSmallerThanMin = !number.isZero() && number.abs().isLessThan(minValue);
  let formattedNumber = isSmallerThanMin ? minValue : number;
  const forceCompact = compact !== false && (compact || number.isGreaterThan(99_999));

  if (roundDown && !forceCompact) {
    formattedNumber = formattedNumber.decimalPlaces(decimals, BigNumber.ROUND_DOWN);
  }

  const displayValue = !forceCompact ? (
    new Intl.NumberFormat("en-US", {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    }).format(formattedNumber.toNumber())
  ) : (
    <CompactNumber
      value={formattedNumber}
      decimals={decimals}
      roundDown={roundDown}
      compactThreshold={compactThreshold}
    />
  );

  return (
    <span className={cn(numberVariants({ tone, size }), className)}>
      {isSmallerThanMin && <span className="symbol text-muted-foreground mr-0.5">&lt;</span>}

      {symbol?.toLowerCase() === "usd" && !percent && <span className="symbol mr-0.5">$</span>}

      <span className="number">{displayValue}</span>

      {percent && <span className="symbol ml-0.5">%</span>}

      {symbol?.toLowerCase() !== "usd" && symbol && <span className="symbol ml-0.5">{symbol}</span>}
    </span>
  );
}
