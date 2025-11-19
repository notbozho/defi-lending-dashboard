"use client";

import { CardContent, CardHeader, IconTooltip, Skeleton } from "@/components";

export function ReserveHeaderSkeleton() {
  return (
    <CardHeader>
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </CardHeader>
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
