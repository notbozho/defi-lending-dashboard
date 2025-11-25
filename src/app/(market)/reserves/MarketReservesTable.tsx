"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search } from "lucide-react";

import { marketReservesColumns } from "@/app/(market)/reserves/MarketReservesColumns";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components";
import FadeInOut from "@/components/animations/FadeInOut";
import TextBlur from "@/components/animations/TextBlur";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { SortingIndicator } from "@/components/ui/sorting-indicator";
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
import { MarketReserve } from "@/lib/aave";
import { cn } from "@/lib/utils";

type MarketReservesTableProps = {
  reserves: MarketReserve[];
  loading: boolean;
};

export function MarketReservesTable({ reserves, loading }: MarketReservesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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
    data: reserves,
    columns: marketReservesColumns,
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

  const isLoading = loading || reserves.length === 0;

  return (
    <Card className="p-0">
      <div className="border-primary/25 flex justify-between border-b p-4 px-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Paused Assets</span>
          <Switch id="paused" size="lg" />
        </div>
        <InputGroup className="max-w-sm justify-self-end">
          <InputGroupInput
            ref={searchRef}
            value={(table.getColumn("reserve")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("reserve")?.setFilterValue(event.target.value)}
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
      <div className="px-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const [hover, setHover] = useState(false);

                  const sorted = header.column.getIsSorted() as "asc" | "desc" | undefined;
                  const canSort = header.column.getCanSort();

                  return (
                    <TableHead
                      className="text-muted-foreground not-first:text-center"
                      key={header.id}
                    >
                      {header.isPlaceholder ? null : (
                        <Tooltip delayDuration={500}>
                          <TooltipTrigger asChild>
                            <div
                              onMouseEnter={() => setHover(true)}
                              onMouseLeave={() => setHover(false)}
                              onClick={header.column.getToggleSortingHandler()}
                              className={cn(
                                "group flex items-center justify-center select-none",
                                canSort && "cursor-pointer"
                              )}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}

                              <div className="w-4">
                                <SortingIndicator direction={sorted} visible={hover || !!sorted} />
                              </div>
                            </div>
                          </TooltipTrigger>

                          {header.column.getCanSort() && (
                            <TooltipContent side="top" className="text-xs">
                              {header.column.getNextSortingOrder() === "asc"
                                ? "Sort ascending"
                                : header.column.getNextSortingOrder() === "desc"
                                  ? "Sort descending"
                                  : "Clear sort"}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={marketReservesColumns.length + 1} className="h-full p-4">
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
                  onClick={() => router.push(`/reserve/${row.original.underlyingAddress}`)}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="not-first:text-center" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  <TableCell className="text-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/reserve/${row.original.underlyingAddress}`);
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
