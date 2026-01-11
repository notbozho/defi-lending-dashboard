"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

type UseBaseTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];

  hiddenColumns?: string[];

  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;

  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;

  globalFilter?: string;
  onGlobalFilterChange?: (_value: string) => void;
  searchKeys?: (keyof TData)[];

  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;

  columnVisibility?: Record<string, boolean>;
  onColumnVisibilityChange?: OnChangeFn<Record<string, boolean>>;
};

export function useBaseTable<TData>({
  data,
  columns,
  sorting,
  onSortingChange,
  columnFilters,
  onColumnFiltersChange,
  globalFilter,
  onGlobalFilterChange,
  searchKeys,
  pagination,
  onPaginationChange,
  columnVisibility,
  onColumnVisibilityChange,
}: UseBaseTableProps<TData>) {
  const paginationEnabled = pagination?.pageSize !== -1;

  return useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),

    ...(paginationEnabled && {
      getPaginationRowModel: getPaginationRowModel(),
      onPaginationChange,
    }),

    onSortingChange,
    onColumnFiltersChange,
    onGlobalFilterChange,
    onColumnVisibilityChange,

    filterFns: {
      enumArrayFilter: (row, columnId, filterValue: string[]) => {
        if (!Array.isArray(filterValue) || filterValue.length === 0) return true;
        return filterValue.includes(String(row.getValue(columnId)));
      },
      assetFilter: (row, columnId, filterValue) => {
        const rowRaw = row.getValue(columnId);
        const rowValues = Array.isArray(rowRaw) ? rowRaw : rowRaw ? [rowRaw] : [];

        const filterValues = Array.isArray(filterValue)
          ? filterValue
          : filterValue
            ? [filterValue]
            : [];

        if (filterValues.length === 0) return true;

        return rowValues.some((v) => filterValues.includes(String(v)));
      },
    },

    getColumnCanGlobalFilter: (column) => {
      if (!searchKeys?.length) return true;
      return searchKeys.includes(column.id as keyof TData);
    },

    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
      columnVisibility,
    },
  });
}
