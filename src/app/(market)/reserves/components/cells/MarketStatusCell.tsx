import { FaRegSnowflake } from "react-icons/fa6";
import { ArrowDownToLine, ArrowUpFromLine, Layers } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components";
import { MarketReserve } from "@/lib/aave/types/MarketReserve";
import { cn } from "@/lib/utils";

export default function StatusCell({ asset }: { asset: MarketReserve }) {
  const supplyCapReached = asset.supplyCapReached;
  const borrowCapReached = asset.borrowCapReached;
  const canBeCollateral = asset.canBeCollateral;
  const isFrozen = asset.isFrozen;

  const supplyIcon = (
    <ArrowDownToLine
      className={cn("size-4", supplyCapReached ? "text-emerald-500" : "text-red-500")}
    />
  );
  const supplyText = supplyCapReached ? "Supply cap reached" : "Can be supplied";

  const borrowIcon = (
    <ArrowUpFromLine
      className={cn("size-4", borrowCapReached ? "text-emerald-500" : "text-red-500")}
    />
  );
  const borrowText = borrowCapReached ? "Borrow cap reached" : "Can be borrowed";

  const collateralIcon = (
    <Layers className={cn("size-4", canBeCollateral ? "text-emerald-500" : "text-red-500")} />
  );
  const collateralText = canBeCollateral
    ? "Can be used as collateral"
    : "Cannot be used as collateral";

  const frozenIcon = (
    <FaRegSnowflake
      className={cn("size-4", isFrozen ? "text-blue-400" : "text-muted-foreground")}
    />
  );
  const frozenText = isFrozen ? "Reserve frozen" : "Reserve is not frozen";

  return (
    <div className="flex items-center justify-center">
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <div className="bg-popover flex gap-2 rounded-md border px-3 py-2">
            {supplyIcon}
            {collateralIcon}
            {borrowIcon}
            {frozenIcon}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col gap-2 py-2 pr-4">
            <div className="flex gap-2">
              {supplyIcon}
              <span>{supplyText}</span>
            </div>
            <div className="flex gap-2">
              {collateralIcon}
              <span>{collateralText}</span>
            </div>
            <div className="flex gap-2">
              {borrowIcon}
              <span>{borrowText}</span>
            </div>
            <div className="flex gap-2">
              {frozenIcon}
              <span>{frozenText}</span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
