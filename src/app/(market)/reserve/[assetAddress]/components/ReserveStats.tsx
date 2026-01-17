"use client";

import { ReserveStatsSkeleton } from "@/app/(market)/reserve/[assetAddress]/Skeletons";
import { FormattedNumber } from "@/components/shared/FormattedNumber";
import { IconTooltip } from "@/components/shared/IconTooltip";
import { CardContent } from "@/components/ui/card";
import { MarketReserve } from "@/lib/aave/types/MarketReserve";

type ReserveStatsProps = {
  asset?: MarketReserve;
  isLoading: boolean;
};

export default function ReserveStats({ asset, isLoading }: ReserveStatsProps) {
  if (isLoading) {
    return <ReserveStatsSkeleton />;
  }

  const availableUsd =
    (asset?.supplyInfo.totalSuppliedUsd ?? 0) - (asset?.borrowInfo.totalBorrowedUsd ?? 0);
  const available = asset?.supplyInfo.totalSupplied?.minus(asset.borrowInfo.totalBorrowed) ?? 0;

  return (
    <CardContent className="flex flex-row gap-24">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="leading-none">Reserve Size</span>
          <IconTooltip text="The total amount of this asset supplied in the market." />
        </div>
        <FormattedNumber
          value={asset?.supplyInfo.totalSuppliedUsd ?? 0}
          symbol="usd"
          compact
          tone="mutedSymbol"
          className="text-3xl"
        />
        <FormattedNumber
          value={asset?.supplyInfo.totalSupplied ?? 0}
          symbol={asset?.symbol}
          compact
          tone="mutedSymbol"
          className="text-lg"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="leading-none">Available Liquidity</span>
          <IconTooltip text="The total amount of this asset that can be borrowed." />
        </div>
        <FormattedNumber
          value={availableUsd}
          symbol="usd"
          compact
          tone="mutedSymbol"
          className="text-3xl"
        />
        <FormattedNumber
          value={available}
          symbol={asset?.symbol}
          compact
          tone="mutedSymbol"
          className="text-lg"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="leading-none">Oracle Price</span>
          <IconTooltip text="The current price of this asset according to the oracle." />
        </div>
        <FormattedNumber
          value={asset?.oraclePrice ?? 0}
          symbol="usd"
          compact
          tone="mutedSymbol"
          className="text-3xl"
        />
        <span className="text-muted-foreground font-medium">
          1 USDC ={" "}
          <FormattedNumber
            value={1 / (asset?.oraclePrice?.toNumber() || 1)}
            symbol={asset?.symbol}
            decimals={5}
            className="text-foreground"
          />
        </span>
      </div>
    </CardContent>
  );
}
