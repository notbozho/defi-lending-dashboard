"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

export type Market = {
  asset: {
    name: string;
    symbol: string;
    imageUrl?: string;
  };
  totalSupplied: number;
  supplyApy: number;
  totalBorrowed: number;
  borrowApy: number;
};

export const marketColumns: ColumnDef<Market>[] = [
  {
    accessorKey: "asset",
    accessorFn: (row) => `${row.asset.name} ${row.asset.symbol}`,
    cell: ({ row }) => {
      const asset = row.original.asset;

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
    header: "Total Supplied",
  },
  {
    accessorKey: "supplyApy",
    header: "Supply APY",
  },
  {
    accessorKey: "totalBorrowed",
    header: "Total Borrowed",
  },
  {
    accessorKey: "borrowApy",
    header: "Borrow APY",
  },
];
