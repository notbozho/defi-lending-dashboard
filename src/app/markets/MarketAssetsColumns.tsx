"use client";

import { ColumnDef } from "@tanstack/react-table";

import { FormattedNumber } from "@/components/FormattedNumber";
import { TokenDisplay } from "@/components/shared/TokenDisplay";
import { Skeleton } from "@/components/ui/skeleton";
import { MarketAsset } from "@/lib/aave";
import { useMarketStore } from "@/stores/market";

export const marketAssetsColumns: ColumnDef<MarketAsset>[] = [
  {
    accessorKey: "asset",
    header: "Asset",
    accessorFn: (row) => `${row.name} ${row.symbol}`,
    cell: ({ row }) => {
      const asset = row.original;
      return <TokenDisplay name={asset.name} symbol={asset.symbol} imageUrl={asset.imageUrl} />;
    },
  },
  {
    accessorKey: "totalSupplied",
    accessorFn: (row) => row.totalSuppliedUsd.toNumber(),
    header: "Total Supplied",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col items-end gap-2">
          <FormattedNumber value={row.original.totalSupplied} className="font-medium" compact />
          <FormattedNumber value={row.original.totalSuppliedUsd} symbol="USD" compact />
        </div>
      );
    },
  },
  {
    accessorKey: "supplyApy",
    header: "Supply APY",
    cell: ({ row }) => {
      return <FormattedNumber value={row.original.supplyApy} percent className="font-medium" />;
    },
  },
  {
    accessorKey: "totalBorrowed",
    header: "Total Borrowed",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col items-end gap-2">
          <FormattedNumber value={row.original.totalBorrowed} className="font-medium" compact />
          <FormattedNumber value={row.original.totalBorrowedUsd} symbol="USD" compact />
        </div>
      );
    },
  },
  {
    accessorKey: "borrowApy",
    header: "Borrow APY",
    cell: ({ row }) => {
      return <FormattedNumber value={row.original.borrowApy} percent className="font-medium" />;
    },
  },
];
