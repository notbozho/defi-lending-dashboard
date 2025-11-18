"use client";

import * as React from "react";
import { Route } from "next";
import Link from "next/link";
import { Info } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type IconTooltipProps = {
  text: React.ReactNode;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href?: string;
  className?: string;
  iconClassName?: string;
  circle?: boolean;
};

export function IconTooltip({
  text,
  icon: Icon = Info,
  href,
  className,
  iconClassName,
  circle = false,
}: IconTooltipProps) {
  const iconElement = (
    <Icon
      className={cn(
        "text-muted-foreground group-hover:text-foreground/80 size-4 transition",
        href && "cursor-pointer",
        iconClassName
      )}
    />
  );

  const wrappedIcon = href ? (
    <Link
      href={href as Route}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center align-middle",
        circle && "bg-muted hover:bg-muted rounded-full p-2 transition-colors"
      )}
    >
      {iconElement}
    </Link>
  ) : (
    <span
      className={cn(
        "inline-flex items-center justify-center align-middle",
        circle && "bg-muted hover:bg-muted rounded-full p-2 transition-colors"
      )}
    >
      {iconElement}
    </span>
  );

  return (
    <Tooltip>
      <div className="group">
        <TooltipTrigger asChild>{wrappedIcon}</TooltipTrigger>
        <TooltipContent className={cn("max-w-xs", className)}>
          {typeof text === "string" ? <span>{text}</span> : text}
        </TooltipContent>
      </div>
    </Tooltip>
  );
}
