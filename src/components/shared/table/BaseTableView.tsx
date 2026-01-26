/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { flexRender, Row, Table as TanstackTable } from "@tanstack/react-table";
import { motion } from "motion/react";

import { Skeleton } from "@/components/ui/skeleton";
import { SortingIndicator } from "@/components/ui/sorting-indicator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ColumnWithSkeleton } from "@/types/table";

const MotionTableRow = motion.create(TableRow);

type BaseTableViewProps<TData> = {
  table: TanstackTable<TData>;
  state: "loading" | "empty" | "ready";

  hideHeader?: boolean;
  skeletonCount?: number;

  minHeight?: string | number;
  maxHeight?: string | number;

  onRowClick?: (_row: TData) => void;
  rowProps?: (_row: TData) => React.HTMLAttributes<HTMLTableRowElement>;
};

export default function BaseTableView<TData>({
  table,
  state,
  hideHeader = false,
  skeletonCount = 10,
  minHeight,
  maxHeight,
  onRowClick,
  rowProps,
}: BaseTableViewProps<TData>) {
  "use no memo";
  if (state === "empty") return null;

  return (
    <div
      className="minimal-scroll relative overflow-x-auto overflow-y-auto"
      style={{ minHeight, maxHeight: maxHeight ?? "calc(100vh - 300px)" }}
    >
      <Table className="w-full min-w-max">
        {!hideHeader && (
          <TableHeader className="bg-card! sticky top-0 z-20">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  const canSort = header.column.getCanSort();

                  return (
                    <TableHead
                      key={header.id}
                      className="px-6 font-light"
                      style={{
                        width: `${header.getSize()}px`,
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          onClick={header.column.getToggleSortingHandler()}
                          className={cn(
                            "group flex items-center gap-1 select-none",
                            canSort && "cursor-pointer"
                          )}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <SortingIndicator direction={sorted} visible={canSort} />
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
        )}

        <TableBody>
          {state === "loading"
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <TableRow key={i}>
                  {table.getVisibleFlatColumns().map((column) => {
                    const colDef = column.columnDef as ColumnWithSkeleton<TData>;
                    return (
                      <TableCell key={column.id} className="px-6 py-2">
                        {colDef.skeleton ?? <Skeleton className="h-6 w-[80%]" />}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            : table.getRowModel().rows.map((row: Row<TData>, index) => (
                <MotionTableRow
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: index * 0.02, ease: "easeInOut" }}
                  onClick={() => onRowClick?.(row.original)}
                  className={cn(
                    onRowClick &&
                      "hover:bg-accent/50 cursor-pointer transition-all duration-700 hover:duration-150"
                  )}
                  {...(rowProps?.(row.original) as any)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-6 py-2">
                      <div className="w-fit">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </TableCell>
                  ))}
                </MotionTableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
