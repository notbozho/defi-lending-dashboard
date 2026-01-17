"use client";

import React from "react";

import { Card, CardContent, IconTooltip, Skeleton } from "@/components";

export function ReserveHeaderSkeleton({ goBackButton }: { goBackButton: React.ReactNode }) {
  return (
    <div className="flex items-center gap-8">
      {goBackButton}

      <Skeleton className="h-16 w-16 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
}

export function ReserveStatsSkeleton() {
  return (
    <CardContent>
      <div className="flex flex-row gap-24">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="leading-none">Reserve Size</span>
            <IconTooltip text="The total amount of this asset supplied in the market." />
          </div>
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-5 w-24" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="leading-none">Available Liquidity</span>
            <IconTooltip text="The total amount of this asset that can be borrowed." />
          </div>
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-5 w-24" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="leading-none">Oracle Price</span>
            <IconTooltip text="The current price of this asset according to the oracle." />
          </div>
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-5 w-40" />
        </div>
      </div>
    </CardContent>
  );
}

export function ReserveActionsSkeleton() {
  return (
    <Card className="order-2 max-h-[calc(100vh-48px)] w-[400px] self-start overflow-x-auto px-6 py-6">
      <Skeleton className="mb-1 h-8 w-full" />

      <div className="flex flex-col gap-4 text-sm">
        <Skeleton className="h-4 w-40" />

        <Skeleton className="h-16 w-full rounded-md" />
      </div>

      <div className="flex flex-col gap-4 text-sm">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-21 w-full" />
      </div>
      <Skeleton className="h-10 w-full rounded-md" />
    </Card>
  );
}
