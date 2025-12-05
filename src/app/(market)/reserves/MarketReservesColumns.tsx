"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Snowflake } from "lucide-react";

import { FormattedNumber } from "@/components/shared/FormattedNumber";
import { TokenDisplay } from "@/components/shared/TokenDisplay";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MarketReserve } from "@/lib/aave";
import { ColumnWithSkeleton } from "@/types/table";

const AmountWithBadge = ({
  value,
  symbol,
  usdAmount,
}: {
  value: number | BigNumber;
  symbol: string;
  usdAmount: number;
}) => {
  return (
    <div className="flex grow-0 gap-1">
      <FormattedNumber value={value} symbol={symbol} className="text-sm" compact />
      {!value || !usdAmount ? undefined : (
        <Badge asChild variant="subtle" className="text-[0.70rem] font-normal">
          <FormattedNumber value={usdAmount} symbol="USD" compact />
        </Badge>
      )}
    </div>
  );
};

export const marketReservesColumns: ColumnWithSkeleton<MarketReserve>[] = [
  {
    id: "name",
    // accessorKey: "reserve",
    header: "Reserve",
    accessorFn: (row) => `${row.name} ${row.symbol}`,
    size: 300,
    minSize: 180,
    maxSize: 400,
    cell: ({ row }) => {
      const asset = row.original;
      return (
        <div className="flex items-center gap-2">
          <TokenDisplay
            size="md"
            name={asset.name}
            symbol={asset.symbol}
            imageUrl={asset.imageUrl}
          />

          {asset.isFrozen && <Snowflake className="h-4 w-4 shrink-0 text-blue-400" />}
        </div>
      );
    },

    sortingFn: (a, b, columnId) => {
      const x = a.getValue<string>(columnId).toLowerCase();
      const y = b.getValue<string>(columnId).toLowerCase();
      return y.localeCompare(x);
    },
    skeleton: <TokenDisplay size="md" loading />,
  },
  {
    id: "totalSupplied",
    // accessorKey: "totalSupplied",
    accessorFn: (row) => row.totalSuppliedUsd,
    header: "Total Supplied",
    size: 150,
    minSize: 120,
    maxSize: 300,
    cell: ({ row }) => {
      return (
        <AmountWithBadge
          value={row.original.totalSupplied}
          symbol={row.original.symbol}
          usdAmount={row.original.totalSuppliedUsd}
        />
      );
    },
    skeleton: <Skeleton className="h-6 w-38" />,
  },
  {
    id: "supplyApy",
    // accessorKey: "supplyApy",
    header: "Supply APY",
    size: 100,
    minSize: 80,
    maxSize: 150,
    cell: ({ row }) => {
      return <FormattedNumber value={row.original.supplyApy} percent />;
    },
    skeleton: <Skeleton className="h-6 w-16" />,
  },
  {
    id: "totalBorrowed",
    // accessorKey: "totalBorrowed",
    header: "Total Borrowed",
    size: 150,
    minSize: 120,
    maxSize: 300,
    cell: ({ row }) => {
      return (
        <AmountWithBadge
          value={row.original.totalSupplied}
          symbol={row.original.symbol}
          usdAmount={row.original.totalSuppliedUsd}
        />
      );
    },
    skeleton: <Skeleton className="h-6 w-38" />,
  },
  {
    id: "borrowApy",
    // accessorKey: "borrowApy",
    header: "Borrow APY",
    size: 100,
    minSize: 80,
    maxSize: 150,
    cell: ({ row }) => {
      return <FormattedNumber value={row.original.borrowApy} percent />;
    },
    skeleton: <Skeleton className="h-6 w-16" />,
  },
];
