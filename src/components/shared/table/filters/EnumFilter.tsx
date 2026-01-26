"use client";

import { BsFilter } from "react-icons/bs";
import { Column } from "@tanstack/react-table";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type EnumFilterProps<TData> = {
  column: Column<TData, unknown>;
  values: readonly string[];
};

export default function EnumFilter<TData>({ column, values }: EnumFilterProps<TData>) {
  "use no memo";

  const active = (column.getFilterValue() as string[]) ?? [];

  const isMuted = active.length === 0 || active.length === values.length;

  const toggle = (value: string) => {
    const next = active.includes(value) ? active.filter((v) => v !== value) : [...active, value];

    column.setFilterValue(next.length ? next : undefined);
  };

  const columnLabel =
    typeof column.columnDef.header === "string" ? column.columnDef.header : column.id;

  const label =
    active.length === 0 || active.length === values.length
      ? "All"
      : active.length <= 2
        ? active.join(", ")
        : `${active.length} selected`;

  return (
    <div className="flex items-center gap-1">
      <span className="text-foreground text-sm font-normal">{columnLabel}:</span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-fit max-w-45 justify-start gap-1 font-normal"
          >
            <BsFilter
              className={cn(
                "size-4 shrink-0",
                isMuted ? "text-muted-foreground" : "text-foreground"
              )}
            />
            <span
              className={cn(
                "truncate capitalize",
                isMuted ? "text-muted-foreground" : "text-foreground"
              )}
            >
              {label}
            </span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center" className="bg-popover w-max min-w-45 p-1">
          {values.map((value) => {
            const checked = active.includes(value);

            return (
              <button
                key={value}
                onClick={() => toggle(value)}
                className={cn(
                  "hover:bg-accent/70 flex w-full items-center justify-between gap-4 rounded-sm px-2 py-1.5 text-sm",
                  checked && "bg-accent"
                )}
              >
                <span className="whitespace-nowrap capitalize">{value}</span>
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
