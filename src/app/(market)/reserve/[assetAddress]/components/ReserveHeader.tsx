"use client";

import Image from "next/image";

import { CardHeader } from "@/components/ui/card";
import type { NetworkConfig } from "@/config/networks";
import type { MarketReserve } from "@/lib/aave";

type ReserveHeaderProps = {
  asset: MarketReserve;
  chain: NetworkConfig;
  goBackButton: React.ReactNode;
};

export default function ReserveHeader({ asset, goBackButton }: ReserveHeaderProps) {
  return (
    <CardHeader className="flex items-center gap-4">
      {goBackButton}

      <Image
        src={asset.imageUrl || ""}
        alt={asset.name || asset.symbol || "token"}
        width={64}
        height={64}
        className="rounded-full object-cover"
      />
      <div className="flex flex-col leading-tight">
        <span className="text-xl font-medium">{asset.name}</span>
        <span className="text-muted-foreground text-lg">{asset.symbol}</span>
      </div>

      {/* <IconTooltip
        icon={SquareArrowOutUpRight}
        circle
        href={chain.buildExplorerUrl({ address: asset.marketAddress })}
        text="View token contract"
      /> */}
    </CardHeader>
  );
}
