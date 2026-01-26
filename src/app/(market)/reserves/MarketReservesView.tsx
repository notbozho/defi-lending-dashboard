"use client";

import { TbHomeFilled } from "react-icons/tb";
import Image from "next/image";
import { Slash } from "lucide-react";
import { motion } from "motion/react";
import { useAccount, useChainId } from "wagmi";

import { MarketMetrics } from "@/app/(market)/reserves/components/MarketMetrics";
import { MarketReservesTable } from "@/app/(market)/reserves/components/MarketReservesTable";
import { Card, CardHeader } from "@/components/ui";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { MARKETS } from "@/config";
import { useMarket } from "@/hooks";
import { cardEntranceVariants } from "@/lib/motion/variants";

export function MarketReservesView() {
  const cid = useChainId();
  const account = useAccount();

  const {
    data: marketData,
    isLoading,
    isError,
  } = useMarket({
    cid,
    accountAddress: account.address,
  });
  if (isError)
    return <div className="flex h-full items-center justify-center">Error loading reserves</div>;

  const marketConfig = MARKETS[marketData?.market?.name || ""];

  return (
    <div className="container mx-auto w-full space-y-6 px-2 py-6">
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
            <BreadcrumbPage>
              {isLoading ? (
                <Skeleton className="h-5 w-32" />
              ) : (
                `${marketConfig?.marketTitle} Market`
              )}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <motion.div variants={cardEntranceVariants}>
        <Card>
          <CardHeader className="flex items-center gap-4">
            {isLoading || !marketData ? (
              <Skeleton className="size-12" />
            ) : (
              <Image
                src={marketData?.market!.icon}
                alt={marketData?.market!.name || "market logo"}
                className="size-12 rounded-full"
                width={40}
                height={40}
              />
            )}
            <div className="flex flex-col">
              {isLoading ? (
                <Skeleton className="h-6 w-32" />
              ) : (
                <span className="text-3xl font-medium">{marketConfig?.marketTitle}</span>
              )}
            </div>
          </CardHeader>
          <MarketMetrics
            market={marketData?.market}
            supplyReserves={Object.values(marketData?.supplyReserves || {})}
            loading={isLoading}
          />
        </Card>
      </motion.div>

      <motion.div variants={cardEntranceVariants}>
        <MarketReservesTable
          reserves={Object.values(marketData?.supplyReserves || {})}
          loading={isLoading}
        />
      </motion.div>
    </div>
  );
}
