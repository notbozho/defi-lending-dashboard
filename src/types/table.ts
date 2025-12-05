import { ColumnDef } from "@tanstack/react-table";

export type ColumnWithSkeleton<TData> = ColumnDef<TData> & {
  skeleton?: React.ReactNode;
};
