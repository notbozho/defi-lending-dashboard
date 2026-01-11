"use client";

import {
  TbChevronLeft,
  TbChevronLeftPipe,
  TbChevronRight,
  TbChevronRightPipe,
} from "react-icons/tb";
import { Table as TanstackTable } from "@tanstack/react-table";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PaginationFooterProps<TData> = {
  table: TanstackTable<TData>;
  className?: string;
};

const PAGE_SIZES = [10, 25, 50, 100];

export default function PaginationFooter<TData>({
  table,
  className,
}: PaginationFooterProps<TData>) {
  "use no memo";
  const { pageIndex, pageSize } = table.getState().pagination;

  const pageCount = table.getPageCount();

  if (pageCount <= 1) return null;

  return (
    <div className={cn("flex items-center justify-between gap-4 border-t px-6 py-3", className)}>
      <div className="text-foreground flex items-center gap-2 text-sm">
        <span>Show</span>
        <Select
          value={String(pageSize)}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <SelectTrigger className="h-8 w-[90px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SIZES.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <TbChevronLeftPipe />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <TbChevronLeft />
        </Button>

        <div className="text-foreground text-sm">
          Page <span className="font-medium">{pageIndex + 1}</span> of{" "}
          <span className="font-medium">{pageCount}</span>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <TbChevronRight />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={!table.getCanNextPage()}
        >
          <TbChevronRightPipe />
        </Button>
      </div>
    </div>
  );
}
