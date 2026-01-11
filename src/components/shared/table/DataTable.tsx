"use client";

import { useEffect, useRef, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { Search } from "lucide-react";
import { motion } from "motion/react";

import { Card, CardHeader } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { useBaseTable } from "@/hooks/useBaseTable";

import BaseTableView from "./BaseTableView";

type DataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  loading: boolean;

  title?: React.ReactNode;
  emptyState?: React.ReactNode;

  searchKeys?: (keyof TData)[];
  hiddenColumns?: (keyof TData)[];
  skeletonCount?: number;

  minHeight?: string | number;
  maxHeight?: string | number;

  pageSize?: number;

  onRowClick?: (_row: TData) => void;
  renderToolbar?: (_table: ReturnType<typeof useBaseTable<TData>>) => React.ReactNode;
  renderFooter?: (_table: ReturnType<typeof useBaseTable<TData>>) => React.ReactNode;
};

export default function DataTable<TData>({
  data,
  columns,
  loading,
  title,
  emptyState,
  skeletonCount = 1,
  searchKeys,
  hiddenColumns,
  minHeight,
  maxHeight,
  pageSize,
  onRowClick,
  renderToolbar,
  renderFooter,
}: DataTableProps<TData>) {
  "use no memo";

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() =>
    hiddenColumns ? Object.fromEntries(hiddenColumns.map((id) => [id as string, false])) : {}
  );
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize || 10,
  });

  const searchRef = useRef<HTMLInputElement>(null);

  const enableSearch = Array.isArray(searchKeys) && searchKeys.length > 0;

  const table = useBaseTable({
    data,
    columns,
    searchKeys,
    globalFilter,
    sorting,
    columnFilters,

    pagination,
    onPaginationChange: setPagination,

    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    columnVisibility,
    onColumnVisibilityChange: setColumnVisibility,
  });

  useEffect(() => {
    if (!enableSearch) return;

    const handler = (e: KeyboardEvent) => {
      const isInput =
        e.target instanceof HTMLElement && ["INPUT", "TEXTAREA"].includes(e.target.tagName);

      if (!isInput && e.key.toLowerCase() === "s") {
        e.preventDefault();
        searchRef.current?.focus();
        return;
      }

      if (e.key === "Escape") {
        if (document.activeElement === searchRef.current) {
          searchRef.current?.blur();
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [enableSearch]);

  const state = loading ? "loading" : data.length === 0 ? "empty" : "ready";

  return (
    <Card className="gap-0 p-0">
      {(title || enableSearch) && (
        <CardHeader className="flex gap-4 px-6 py-4">
          <div className="flex shrink-0 items-center gap-3">{title}</div>
          <div className="flex w-full items-center justify-end gap-2">
            {renderToolbar?.(table)}

            {enableSearch && (
              <InputGroup className="bg-input! w-72 max-w-sm shrink-0">
                <InputGroupInput
                  ref={searchRef}
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Search..."
                />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <Kbd>S</Kbd>
                </InputGroupAddon>
              </InputGroup>
            )}
          </div>
        </CardHeader>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative flex-1 overflow-hidden"
      >
        {state === "empty" ? (
          (emptyState ?? (
            <div className="text-muted-foreground p-6 text-center text-sm">No data found.</div>
          ))
        ) : (
          <BaseTableView
            table={table}
            state={state}
            onRowClick={onRowClick}
            skeletonCount={skeletonCount}
            minHeight={minHeight}
            maxHeight={maxHeight}
          />
        )}
      </motion.div>
      {state === "ready" && renderFooter?.(table)}
    </Card>
  );
}
