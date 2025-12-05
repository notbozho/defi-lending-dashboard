"use client";

import { useEffect, useRef, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  Table as TanstackTable,
  useReactTable,
} from "@tanstack/react-table";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Card, CardHeader } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
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

type BaseTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  loading: boolean;

  minHeight?: string | number;

  searchKeys?: (keyof TData)[];

  initialSorting?: SortingState;

  onRowClick?: (row: TData) => void;

  renderToolbar?: (table: TanstackTable<TData>) => React.ReactNode;

  emptyState?: React.ReactNode;

  rowProps?: (row: TData) => React.HTMLAttributes<HTMLTableRowElement>;

  skeletonCount?: number;
};

function SkeletonRow<TData>({ table }: { table: TanstackTable<TData> }) {
  return (
    <TableRow>
      {table.getVisibleFlatColumns().map((column) => {
        const colDef = column.columnDef as ColumnWithSkeleton<TData>;
        const skeleton = colDef.skeleton;

        return (
          <TableCell key={column.id} className="px-6 py-2">
            {skeleton ?? <Skeleton className="h-7 w-[80%]" />}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
export function BaseTable<TData>({
  data,
  columns,
  loading,
  minHeight: min = "auto",
  searchKeys = [],
  initialSorting = [],
  onRowClick,
  renderToolbar,
  rowProps,
  emptyState,
  skeletonCount = 20,
}: BaseTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const searchRef = useRef<HTMLInputElement>(null);

  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,

    globalFilterFn: "includesString",

    getColumnCanGlobalFilter: (column) => {
      if (!searchKeys?.length) return true;
      console.log(column.id, searchKeys.includes(column.id as keyof TData));
      return searchKeys.includes(column.id as keyof TData);
    },

    state: { sorting, columnFilters, globalFilter },
  });

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

  const isLoading = loading || data.length === 0;

  const isEmpty = !loading && data.length === 0;

  return (
    <Card className="gap-0 p-0" style={{ minHeight: min }}>
      <CardHeader className="bg-accent/50 mb-2 flex items-center justify-between p-4 px-6">
        {renderToolbar?.(table)}
        {searchKeys.length > 0 && (
          <InputGroup className="group bg-card max-w-sm">
            <InputGroupInput
              ref={searchRef}
              value={globalFilter ?? ""}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
              placeholder={`Search ${searchKeys.join(", ")}...`}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <Kbd>S</Kbd>
            </InputGroupAddon>
          </InputGroup>
        )}
      </CardHeader>

      {isEmpty ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full w-full items-center justify-center"
          >
            {emptyState ?? (
              <div className="text-muted-foreground p-6 text-center text-sm">No data found.</div>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <Table className="table-fixed overflow-hidden">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  const canSort = header.column.getCanSort();

                  return (
                    <TableHead
                      key={header.id}
                      className="px-6"
                      style={{
                        width: `${header.getSize()}px`,
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          onClick={header.column.getToggleSortingHandler()}
                          className={cn(
                            "group flex items-center select-none",
                            canSort && "cursor-pointer"
                          )}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <div className="w-4">
                            <SortingIndicator direction={sorted} visible={canSort} />
                          </div>
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading
              ? Array.from({ length: skeletonCount }).map((_, i) => (
                  <SkeletonRow<TData> table={table} key={i} />
                ))
              : table.getRowModel().rows.map((row: Row<TData>, index: number) => (
                  <MotionTableRow
                    key={row.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      delay: index * 0.03,
                    }}
                    onClick={() => onRowClick?.(row.original)}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    {...(rowProps?.(row.original) as any)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-6 py-2">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </MotionTableRow>
                ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
