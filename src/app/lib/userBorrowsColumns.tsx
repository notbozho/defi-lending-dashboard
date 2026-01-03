"use client";

import { valueToBigNumber } from "@aave/math-utils";
import { MarketUserReserveBorrowPosition } from "@aave/react";

import { FormattedNumber } from "@/components/shared/FormattedNumber";
import { TokenDisplay } from "@/components/shared/TokenDisplay";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ColumnWithSkeleton } from "@/types/table";

export const userBorrowColumns: ColumnWithSkeleton<MarketUserReserveBorrowPosition>[] = [
  {
    id: "asset",
    header: "Asset",
    accessorFn: (row) => `${row.currency.name} ${row.currency.symbol}`,
    maxSize: 150,
    size: 150,
    minSize: 80,
    cell: ({ row }) => {
      const asset = row.original.currency;

      return (
        <div className="flex items-center gap-2">
          <TokenDisplay
            size="md"
            name={asset.name}
            symbol={asset.symbol}
            imageUrl={asset.imageUrl}
          />
        </div>
      );
    },
    sortingFn: (a, b, columnId) => {
      const x = a.getValue<string>(columnId).toLowerCase();
      const y = b.getValue<string>(columnId).toLowerCase();
      return x.localeCompare(y);
    },
    skeleton: <TokenDisplay size="md" loading />,
  },
  {
    id: "borrowBalance",
    header: "Borrowed",
    accessorFn: (row) => row.debt.usd,
    maxSize: 120,
    size: 120,
    minSize: 80,
    cell: ({ row }) => {
      const debt = row.original.debt;

      return (
        <div className="flex items-center gap-2">
          <FormattedNumber
            value={debt?.amount.value}
            symbol={row.original.currency.symbol}
            className="text-sm"
            compact
          />

          {valueToBigNumber(debt?.usd).isGreaterThan(0) && (
            <Badge asChild variant="subtle" className="text-[0.70rem] font-normal">
              <FormattedNumber value={debt?.usd} symbol="USD" compact />
            </Badge>
          )}
        </div>
      );
    },
    skeleton: <Skeleton className="h-6 w-[50%]" />,
  },
  {
    id: "borrowApy",
    header: "Borrow APY",
    accessorFn: (row) => row.apy,
    maxSize: 120,
    size: 120,
    minSize: 90,
    cell: ({ row }) => <FormattedNumber value={row.original.apy.value} percent />,
    skeleton: <Skeleton className="h-6 w-12" />,
  },
];
