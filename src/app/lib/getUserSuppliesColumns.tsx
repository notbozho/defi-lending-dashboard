"use client";

import { valueToBigNumber } from "@aave/math-utils";
import { MarketUserReserveSupplyPosition } from "@aave/react";

import { ApyCell } from "@/app/components/Positions/cells/ApyCell";
import { AssetCell } from "@/app/components/Positions/cells/AssetCell";
import { SupplyBalanceCell } from "@/app/components/Positions/cells/SupplyBualanceCell";
import { SupplyCollateralToggleCell } from "@/app/components/Positions/cells/SupplyCollateralToggleCell";
import { FormattedNumber } from "@/components/shared/FormattedNumber";
import { TokenDisplay } from "@/components/shared/TokenDisplay";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { getApy, getAssetName, getSupplyUsdBalance } from "@/lib/aave/helpers/marketHelper";
import { ColumnWithSkeleton } from "@/types/table";

export function getUserSuppliesColumns(
  onToggleCollateral: (address: string, enabled: boolean) => void
): ColumnWithSkeleton<MarketUserReserveSupplyPosition>[] {
  return [
    {
      id: "asset",
      header: "Asset",
      accessorFn: getAssetName,
      sortingFn: "alphanumeric",

      size: 240,
      minSize: 140,

      cell: ({ row }) => <AssetCell position={row.original} />,
      skeleton: <TokenDisplay size="md" loading />,
    },
    {
      id: "balance",
      header: "Supplied",
      accessorFn: getSupplyUsdBalance,

      size: 160,
      minSize: 140,

      cell: ({ row }) => <SupplyBalanceCell position={row.original} />,
      skeleton: <Skeleton className="h-6 w-[50%]" />,
    },
    {
      id: "apy",
      header: "Supply APY",
      accessorFn: getApy,

      size: 120,
      minSize: 90,

      cell: ({ row }) => <ApyCell position={row.original} />,
      skeleton: <Skeleton className="h-6 w-12" />,
    },
    {
      id: "collateral",
      header: "Collateral",

      size: 120,
      minSize: 80,
      enableSorting: false,

      cell: ({ row }) => (
        <SupplyCollateralToggleCell position={row.original} onToggle={onToggleCollateral} />
      ),
      skeleton: <Skeleton className="h-5 w-10" />,
    },
  ];
}
