import { FormattedNumber } from "@/components/shared/FormattedNumber";
import { HasApy } from "@/lib/aave/types";

type ApyCellProps<T extends HasApy> = {
  position: T;
};

export function ApyCell<T extends HasApy>({ position }: ApyCellProps<T>) {
  return <FormattedNumber value={position.apy.value} percent className="text-foreground text-sm" />;
}
