"use client";

import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface TokenDisplayProps {
  name?: string;
  symbol?: string;
  imageUrl?: string | null;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function TokenDisplay({
  name,
  symbol,
  imageUrl,
  loading = false,
  size = "md",
  className,
}: TokenDisplayProps) {
  const iconSize = size === "sm" ? 20 : size === "lg" ? 40 : 32;

  if (loading) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <Skeleton className={cn("rounded-full", `size-[${iconSize}px]`)} />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name || symbol || "token"}
          width={iconSize}
          height={iconSize}
          className="rounded-full object-cover"
        />
      ) : (
        <div
          className={cn(
            "bg-muted text-muted-foreground flex items-center justify-center rounded-full font-medium uppercase",
            size === "sm"
              ? "h-5 w-5 text-[10px]"
              : size === "lg"
                ? "h-10 w-10 text-sm"
                : "h-8 w-8 text-xs"
          )}
        >
          {symbol?.slice(0, 2) || "?"}
        </div>
      )}

      <div className="flex flex-col leading-tight">
        {name && <span className="text-sm font-medium">{name}</span>}
        {symbol && <span className="text-muted-foreground text-xs">{symbol}</span>}
      </div>
    </div>
  );
}
