"use client";

import Image from "next/image";
import { SquareArrowOutUpRight } from "lucide-react";

import { ReserveHeaderSkeleton } from "@/app/(market)/reserve/[assetAddress]/Skeletons";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@/components";
import type { NetworkConfig } from "@/config/networks";
import { MarketReserve } from "@/lib/aave/types/MarketReserve";

type ReserveHeaderProps = {
  asset?: MarketReserve;
  chain: NetworkConfig;
  goBackButton: React.ReactNode;
  isLoading: boolean;
};

const tokenContractButton = (href: string) => (
  <Tooltip delayDuration={400}>
    <TooltipTrigger asChild>
      <Button size="icon" variant="outline">
        <a href={href} target="_blank" rel="noopener noreferrer">
          <SquareArrowOutUpRight />
        </a>
      </Button>
    </TooltipTrigger>
    <TooltipContent>View Token Contract</TooltipContent>
  </Tooltip>
);

export default function ReserveHeader({
  asset,
  goBackButton,
  chain,
  isLoading,
}: ReserveHeaderProps) {
  if (isLoading) {
    return <ReserveHeaderSkeleton goBackButton={goBackButton} />;
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-8">
        {goBackButton}

        <Image
          src={asset?.imageUrl || ""}
          alt={asset?.name || asset?.symbol || "token"}
          width={64}
          height={64}
          className="rounded-full object-cover"
        />
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-medium">{asset?.name}</span>
          <span className="text-muted-foreground text-lg">{asset?.symbol}</span>
        </div>
      </div>
      {tokenContractButton(chain.buildExplorerUrl({ address: asset?.marketAddress || "" }))}
    </div>
  );
}
