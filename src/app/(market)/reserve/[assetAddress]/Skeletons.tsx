"use client";

import { CardContent, CardHeader, Skeleton } from "@/components";

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
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground text-sm leading-none">Reserve Size</span>
          </div>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-6 w-24" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground text-sm leading-none">Available Liquidity</span>
          </div>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-6 w-24" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground text-sm leading-none">Oracle Price</span>
          </div>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-6 w-40" />
        </div>
      </div>
    </CardContent>
  );
}
