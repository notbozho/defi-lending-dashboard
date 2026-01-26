"use client";

import * as React from "react";
import { BsFilter } from "react-icons/bs";
import { Currency } from "@aave/react";
import { Column } from "@tanstack/react-table";
import { Check, Search } from "lucide-react";

import { TokenDisplay } from "@/components/shared/TokenDisplay";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type AssetFilterProps<TData> = {
  column: Column<TData, unknown>;
  assets: Currency[];
};

export default function AssetFilter<TData>({ column, assets }: AssetFilterProps<TData>) {
  "use no memo";

  const [query, setQuery] = React.useState("");

  const raw = column.getFilterValue();

  const active = Array.isArray(raw) ? raw : raw ? [raw] : [];

  const isMuted = active.length === 0 || active.length === assets.length;

  const toggle = (asset: string) => {
    const next = active.includes(asset) ? active.filter((v) => v !== asset) : [...active, asset];

    column.setFilterValue(next.length ? next : undefined);
  };

  const filtered = assets.filter(
    (a) =>
      a.symbol.toLowerCase().includes(query.toLowerCase()) ||
      a.name?.toLowerCase().includes(query.toLowerCase())
  );

  const label =
    active.length === 0 || active.length === assets.length
      ? "All"
      : active.length <= 2
        ? active.join(", ")
        : `${active.length} selected`;

  return (
    <div className="flex items-center gap-1">
      <span className="text-foreground text-sm font-normal">Asset:</span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-fit max-w-50 justify-start gap-1 font-normal"
          >
            <BsFilter
              className={cn(
                "size-4 shrink-0",
                isMuted ? "text-muted-foreground" : "text-foreground"
              )}
            />
            <span className={cn("truncate", isMuted ? "text-muted-foreground" : "text-foreground")}>
              {label}
            </span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="bg-popover w-64 p-2">
          <InputGroup className="bg-card! mb-2">
            <InputGroupInput
              placeholder="Search assets..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <div className="max-h-56 space-y-1 overflow-y-auto">
            {filtered.map((asset) => {
              const checked = active.includes(asset.symbol);

              return (
                <button
                  key={asset.symbol}
                  onClick={() => toggle(asset.symbol)}
                  className={cn(
                    "hover:bg-accent/70 flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-sm",
                    checked && "bg-accent"
                  )}
                >
                  <TokenDisplay
                    name={asset.name}
                    symbol={asset.symbol}
                    imageUrl={asset.imageUrl}
                    size="sm"
                  />
                  <span
                    className={cn(
                      "flex size-4 items-center justify-center rounded-sm border",
                      checked
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-muted-foreground/40"
                    )}
                  >
                    {checked && <Check className="size-3" />}
                  </span>
                </button>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
