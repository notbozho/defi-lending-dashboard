"use client";

import { FormattedNumber } from "@/components/shared/FormattedNumber";
import { IconTooltip } from "@/components/shared/IconTooltip";
import { CardContent } from "@/components/ui/card";
import type { MarketReserve } from "@/lib/aave";

type ReserveStatsProps = {
  asset: MarketReserve;
};

export default function ReserveStats({ asset }: ReserveStatsProps) {
  const availableUsd = asset.totalSuppliedUsd - asset.totalBorrowedUsd;
  const available = asset.totalSupplied?.minus(asset.totalBorrowed) ?? 0;

  return (
    <CardContent>
      <div className="flex flex-row gap-24">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <span className="leading-none">Reserve Size</span>
            <IconTooltip text="The total amount of this asset supplied in the market." />
          </div>
          <FormattedNumber
            value={asset.totalSuppliedUsd ?? 0}
            symbol="usd"
            compact
            tone="mutedSymbol"
            className="text-3xl"
          />
          <FormattedNumber
            value={asset.totalSupplied ?? 0}
            symbol={asset.symbol}
            compact
            tone="mutedSymbol"
            className="text-lg"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
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
            symbol={asset.symbol}
            compact
            tone="mutedSymbol"
            className="text-lg"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <span className="leading-none">Oracle Price</span>
            <IconTooltip text="The current price of this asset according to the oracle." />
          </div>
          <FormattedNumber
            value={asset.oraclePrice ?? 0}
            symbol="usd"
            compact
            tone="mutedSymbol"
            className="text-3xl"
          />
          <span className="text-muted-foreground font-medium">
            1 USDC ={" "}
            <FormattedNumber
              value={1 / (asset.oraclePrice?.toNumber() || 1)}
              symbol={asset.symbol}
              decimals={5}
              className="text-black"
            />
          </span>
        </div>
      </div>
    </CardContent>
  );
}
