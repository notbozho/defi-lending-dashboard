"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

import { FormattedNumber } from "@/components/FormattedNumber";
import { MarketAsset } from "@/lib/aave";

export const marketColumns: ColumnDef<MarketAsset>[] = [
  {
    accessorKey: "asset",
    header: "Asset",
    accessorFn: (row) => `${row.name} ${row.symbol}`,
    cell: ({ row }) => {
      const asset = row.original;

      return (
        <div className="flex items-center gap-3">
          {asset.imageUrl && (
            <Image
              src={`${asset.imageUrl}`}
              alt={asset.name}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          )}
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium">{asset.name}</span>
            <span className="text-muted-foreground text-sm">{asset.symbol}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "totalSupplied",
    accessorFn: (row) => row.totalSuppliedUsd.toNumber(),
    header: "Total Supplied",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-2">
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
        <div className="flex flex-col gap-2">
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
