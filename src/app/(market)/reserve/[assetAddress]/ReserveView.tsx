"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useChainId } from "wagmi";

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
import { useMarketContext } from "@/context/MarketContext";

import ReserveActions from "./components/ReserveActions";
import ReserveCharts from "./components/ReserveCharts";
import ReserveHeader from "./components/ReserveHeader";
import ReserveStats from "./components/ReserveStats";
import { ReserveHeaderSkeleton, ReserveStatsSkeleton } from "./Skeletons";

export default function ReserveView({ assetAddress }: { assetAddress: string }) {
  const chainId = useChainId();
  const router = useRouter();

  const { isLoading, error, supplyReserves, market } = useMarketContext();
  const reserve = supplyReserves[assetAddress];
  const currentMarketConfig = MARKETS[market?.name || ""];

  const currentChain: NetworkConfig | undefined = NETWORK_BY_CHAIN_ID[chainId]; // TODO: export to a web3 context

  if (error) return <div>Error loading reserve</div>;

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
    <main className="min-h-screen w-full py-6">
      <div className="container mx-auto space-y-6 px-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/reserves">
                {isLoading ? (
                  <Skeleton className="h-5 w-32" />
                ) : (
                  `${currentMarketConfig?.marketTitle} Market`
                )}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {isLoading ? <Skeleton className="h-5 w-24" /> : `${reserve?.name} Reserve`}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Card className="min-h-64 justify-between">
          {isLoading ? (
            <>
              <ReserveHeaderSkeleton goBackButton={goBackButton} />
              <ReserveStatsSkeleton />
            </>
          ) : (
            <>
              {reserve && currentChain && (
                <>
                  <ReserveHeader asset={reserve} chain={currentChain} goBackButton={goBackButton} />
                  <ReserveStats asset={reserve} />
                </>
              )}
            </>
          )}
        </Card>

        <div className="flex gap-x-6">
          <ReserveActions reserve={reserve} loading={isLoading} />
          <ReserveCharts reserve={reserve} loading={isLoading} />
        </div>
      </div>
    </main>
  );
}
