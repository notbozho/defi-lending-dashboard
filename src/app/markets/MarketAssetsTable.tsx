"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search } from "lucide-react";
import { motion } from "motion/react";

import { marketAssetsColumns } from "@/app/markets/MarketAssetsColumns";
import FadeInOut from "@/components/animations/FadeInOut";
import TextBlur from "@/components/animations/TextBlur";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MarketAsset } from "@/lib/aave";
import { cn } from "@/lib/utils";
import { useMarketStore } from "@/stores/market";

export function MarketsAssetsTable() {
  const sorting = useMarketStore((state) => state.sorting);
  const setSorting = useMarketStore((state) => state.setSorting);
  const columnFilters = useMarketStore((state) => state.columnFilters);
  const setColumnFilters = useMarketStore((state) => state.setColumnFilters);
  const data = useMarketStore((state) => state.assets);
  const loading = useMarketStore((state) => state.loading);

  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isInput =
        e.target instanceof HTMLElement && ["INPUT", "TEXTAREA"].includes(e.target.tagName);

      if (!isInput && e.key.toLowerCase() === "s") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const table = useReactTable({
    data,
    columns: marketAssetsColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const isLoading = loading || data.length === 0;

  return (
    <Card className="p-0">
      <div className="flex justify-between border-b p-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Paused Assets</span>
          <Switch id="paused" size="lg" />
        </div>
        <InputGroup className="max-w-sm justify-self-end">
          <InputGroupInput
            ref={searchRef}
            value={(table.getColumn("asset")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("asset")?.setFilterValue(event.target.value)}
            placeholder="Search..."
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>S</Kbd>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="px-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="text-muted-foreground not-first:text-right"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={marketAssetsColumns.length + 1} className="h-full p-4">
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <FadeInOut variant="in">
                      <Spinner className="text-muted-foreground h-10 w-10" />
                    </FadeInOut>
                    <TextBlur
                      element="span"
                      variant="in"
                      wordByWord={true}
                      delay={0.3}
                      className="text-muted-foreground mt-2 text-sm"
                    >
                      Loading assets...
                    </TextBlur>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() =>
                    router.push(
                      `/reserve/${row.original.marketAddress}/${(row.original as MarketAsset).id}`
                    )
                  }
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="not-first:text-right" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  <TableCell className="not-first:text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          `/reserve/${row.original.marketAddress}/${(row.original as MarketAsset).id}`
                        );
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
