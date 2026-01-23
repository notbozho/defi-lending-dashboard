"use client";

import { useEffect, useRef } from "react";
import { TbHomeFilled } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { ChevronLeft, Slash } from "lucide-react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";

import ReserveNotFound from "@/app/(market)/reserve/[assetAddress]/components/ReserveNotFound";
import { Button, Card, Skeleton, Tooltip, TooltipContent, TooltipTrigger } from "@/components";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MARKETS } from "@/config";
import { NETWORK_BY_CHAIN_ID, type NetworkConfig } from "@/config/networks";
import { useMarket } from "@/hooks";

import ReserveCharts from "./components/ReserveCharts";
import ReserveHeader from "./components/ReserveHeader";
import ReserveStats from "./components/ReserveStats";
import ReserveActions from "./reserve-actions/ReserveActions";

export default function ReserveView({
  assetAddress,
  chainId,
}: {
  assetAddress: string;
  chainId?: number;
}) {
  const fallbackChainId = useChainId();
  const { switchChain } = useSwitchChain();
  const router = useRouter();

  const account = useAccount();

  const {
    data: marketData,
    isLoading,
    isError,
  } = useMarket({
    cid: fallbackChainId,
    accountAddress: account.address,
  });

  const { market, supplyReserves } = marketData || {};

  const didAttemptSwitchRef = useRef(false);

  const reserve = supplyReserves?.find((r) => r.underlyingAddress === assetAddress);
  const currentMarketConfig = MARKETS[market?.name || ""];

  const actualChainId = chainId ?? fallbackChainId;
  const currentChain: NetworkConfig | undefined = NETWORK_BY_CHAIN_ID[actualChainId];

  const notFound = !isLoading && (!reserve || Object.keys(reserve).length === 0);

  useEffect(() => {
    if (!chainId) return;
    if (didAttemptSwitchRef.current) return;
    if (fallbackChainId === chainId) return;

    didAttemptSwitchRef.current = true;
    switchChain({ chainId });
  }, [fallbackChainId, chainId, switchChain]);

  if (isError)
    return <div className="flex h-full items-center justify-center">Error loading reserve</div>;

  if (notFound) return <ReserveNotFound />;

  const handleGoBackClick = () => {
    router.back();
  };

  const goBackButton = (
    <Tooltip delayDuration={400}>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="text-muted-foreground px-0"
          onClick={handleGoBackClick}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Go back</TooltipContent>
    </Tooltip>
  );

  return (
    <div className="container mx-auto space-y-6 px-2 py-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <TbHomeFilled className="size-6" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash className="text-muted-foreground size-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/reserves">
              {isLoading ? (
                <Skeleton className="h-5 w-32" />
              ) : (
                `${currentMarketConfig?.marketTitle} Market`
              )}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash className="text-muted-foreground size-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>
              {isLoading ? <Skeleton className="h-5 w-32" /> : `${reserve?.name} Reserve`}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ReserveHeader
        asset={reserve}
        chain={currentChain}
        goBackButton={goBackButton}
        isLoading={isLoading}
      />

      <Card className="justify-between">
        <ReserveStats asset={reserve} isLoading={isLoading} />
      </Card>

      <div className="flex gap-x-6">
        <ReserveActions reserve={reserve!} isLoading={isLoading} />
        <ReserveCharts reserve={reserve!} isLoading={isLoading} />
      </div>
    </div>
  );
}
