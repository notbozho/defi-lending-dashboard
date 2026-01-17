"use client";

import MarketStatusCell from "@/app/(market)/reserves/components/cells/MarketStatusCell";
import NumberCell from "@/app/(market)/reserves/components/cells/NumberCell";
import AmountWithBadge from "@/components/shared/AmountWithBadge";
import { TokenDisplay } from "@/components/shared/TokenDisplay";
import { Skeleton } from "@/components/ui/skeleton";
import { MarketReserve } from "@/lib/aave/types/MarketReserve";
import { ColumnWithSkeleton } from "@/types/table";

export const marketReservesColumns: ColumnWithSkeleton<MarketReserve>[] = [
  {
    id: "name",
    header: "Reserve",
    accessorFn: (row) => row.symbol,

    enableHiding: false,
    size: 200,

    cell: ({ row }) => {
      const asset = row.original;
      return (
        <TokenDisplay size="md" name={asset.name} symbol={asset.symbol} imageUrl={asset.imageUrl} />
      );
    },
    skeleton: <TokenDisplay size="md" loading />,
  },
  {
    id: "status",
    header: "Status",

    size: 100,

    cell: ({ row }) => <MarketStatusCell asset={row.original} />,
    skeleton: <Skeleton className="h-6 w-24" />,
  },
  {
    id: "totalSupplied",
    accessorFn: (row) => row.supplyInfo.totalSuppliedUsd,
    header: "Total Supplied",

    size: 150,

    cell: ({ row }) => (
      <AmountWithBadge
        value={row.original.supplyInfo.totalSupplied}
        symbol={row.original.symbol}
        usdAmount={row.original.supplyInfo.totalSuppliedUsd}
      />
    ),
    skeleton: <Skeleton className="h-6 w-38" />,
  },
  {
    id: "supplyApy",
    header: "Supply APY",

    size: 100,

    cell: ({ row }) => <NumberCell value={row.original.supplyInfo.supplyApy} />,
    skeleton: <Skeleton className="h-6 w-16" />,
  },
  {
    id: "totalBorrowed",
    header: "Total Borrowed",

    size: 100,

    cell: ({ row }) => (
      <AmountWithBadge
        value={row.original.borrowInfo.totalBorrowed}
        symbol={row.original.symbol}
        usdAmount={row.original.borrowInfo.totalBorrowedUsd}
      />
    ),
    skeleton: <Skeleton className="h-6 w-38" />,
  },
  {
    id: "utilizationRate",
    header: "Utilization Rate",

    size: 120,

    cell: ({ row }) => <NumberCell value={row.original.utilizationRate} />,
    skeleton: <Skeleton className="h-6 w-16" />,
  },
  {
    id: "maxLTV",
    header: "Max LTV",

    size: 100,

    cell: ({ row }) => <NumberCell value={row.original.maxLTV} />,
    skeleton: <Skeleton className="h-6 w-16" />,
  },
];
