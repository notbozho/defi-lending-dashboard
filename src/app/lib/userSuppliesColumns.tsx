"use client";

import { valueToBigNumber } from "@aave/math-utils";
import { MarketUserReserveSupplyPosition } from "@aave/react";

import { FormattedNumber } from "@/components/shared/FormattedNumber";
import { TokenDisplay } from "@/components/shared/TokenDisplay";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { ColumnWithSkeleton } from "@/types/table";

export const userSuppliesColumns: ColumnWithSkeleton<MarketUserReserveSupplyPosition>[] = [
  {
    id: "asset",
    header: "Asset",
    accessorFn: (row) => `${row.currency.name} ${row.currency.symbol}`,
    maxSize: 240,
    size: 240,
    minSize: 140,
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
    id: "balance",
    header: "Balance",
    accessorFn: (row) => row.balance.usd,
    maxSize: 160,
    size: 160,
    minSize: 140,
    cell: ({ row }) => {
      const balance = row?.original.balance;

      return (
        <div className="flex items-center gap-1">
          <FormattedNumber
            value={balance?.amount.value}
            symbol={row.original.currency.symbol}
            className="text-sm"
            compact
          />

          {valueToBigNumber(balance?.usd).isGreaterThan(0) && (
            <Badge variant="subtle" className="text-[0.70rem] font-normal">
              <FormattedNumber value={balance?.usd} symbol="USD" compact />
            </Badge>
          )}
        </div>
      );
    },
    skeleton: <Skeleton className="h-6 w-[50%]" />,
  },
  {
    id: "apy",
    header: "Supply APY",
    accessorFn: (row) => row.apy,
    maxSize: 120,
    size: 120,
    minSize: 90,
    cell: ({ row }) => <FormattedNumber value={row.original.apy.value} percent />,
    skeleton: <Skeleton className="h-6 w-12" />,
  },
  {
    id: "collateral",
    header: "Collateral",
    maxSize: 120,
    size: 120,
    minSize: 80,
    enableSorting: false,
    cell: ({ row }) => {
      const { canBeCollateral, isCollateral } = row?.original;

      return (
        <Switch
          disabled={!canBeCollateral}
          checked={isCollateral}
          onCheckedChange={(checked) => {
            console.log("collateral toggle", row.original.currency.address, checked);
          }}
        />
      );
    },
    skeleton: <Skeleton className="h-5 w-10" />,
  },
];
