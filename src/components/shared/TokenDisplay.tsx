"use client";

import Image from "next/image";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface TokenDisplayProps {
  name?: string;
  symbol?: string;
  imageUrl?: string | null;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "full";
  className?: string;
}

export function TokenDisplay({
  name,
  symbol,
  imageUrl,
  loading = false,
  size = "md",
  variant = "full",
  className,
}: TokenDisplayProps) {
  const iconSize = size === "sm" ? 20 : size === "lg" ? 40 : 32;

  if (loading) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <Skeleton
          className="rounded-full"
          style={{
            width: iconSize,
            height: iconSize,
          }}
        />
        {variant === "full" && <Skeleton className="h-6 w-46" />}
      </div>
    );
  }
  const Icon = imageUrl ? (
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
  );

  const iconOnly = <div className={cn("inline-flex", className)}>{Icon}</div>;

  if (variant === "icon") {
    return (
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>{iconOnly}</TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-1">
            {name && <span className="font-medium">{name}</span>}
            {symbol && <span className="text-muted-foreground text-xs">({symbol})</span>}
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {Icon}
      <div className="flex items-center gap-x-2 leading-tight">
        {name && <span className="text-sm font-normal">{name}</span>}
        {symbol && <span className="text-muted-foreground text-xs">{symbol}</span>}
      </div>
    </div>
  );
}
