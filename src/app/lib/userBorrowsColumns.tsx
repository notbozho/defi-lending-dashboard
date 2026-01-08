"use client";

import { MarketUserReserveBorrowPosition } from "@aave/react";

import { ApyCell } from "@/app/components/Positions/cells/ApyCell";
import { AssetCell } from "@/app/components/Positions/cells/AssetCell";
import { BorrowAmountCell } from "@/app/components/Positions/cells/BorrowAmountCell";
import { TokenDisplay } from "@/components/shared/TokenDisplay";
import { Skeleton } from "@/components/ui/skeleton";
import { getApy, getAssetName, getBorrowUsdDebt } from "@/lib/aave/helpers/marketHelper";
import { ColumnWithSkeleton } from "@/types/table";

export const userBorrowColumns: ColumnWithSkeleton<MarketUserReserveBorrowPosition>[] = [
  {
    id: "asset",
    header: "Asset",
    accessorFn: getAssetName,

    size: 150,
    minSize: 80,

    cell: ({ row }) => <AssetCell position={row.original} />,
    skeleton: <TokenDisplay size="md" loading />,
  },
  {
    id: "borrowBalance",
    header: "Borrowed",
    accessorFn: getBorrowUsdDebt,

    size: 120,
    minSize: 80,

    cell: ({ row }) => <BorrowAmountCell position={row.original} />,
    skeleton: <Skeleton className="h-6 w-[50%]" />,
  },
  {
    id: "borrowApy",
    header: "Borrow APY",
    accessorFn: getApy,

    size: 120,
    minSize: 90,

    cell: ({ row }) => <ApyCell position={row.original} />,
    skeleton: <Skeleton className="h-6 w-12" />,
  },
];
