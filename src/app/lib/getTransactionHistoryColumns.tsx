"use client";

import TransactionAmountCell from "@/app/components/TransactionHistory/cells/TransactionAmountCell";
import TransactionDateCell from "@/app/components/TransactionHistory/cells/TransactionDateCell";
import TransactionLinkCell from "@/app/components/TransactionHistory/cells/TransactionLinkCell";
import TransactionTypeCell from "@/app/components/TransactionHistory/cells/TransactionTypeCell";
import { Skeleton } from "@/components/ui/skeleton";
import { Transaction } from "@/lib/aave/types/Transaction";
import { ColumnWithSkeleton } from "@/types/table";

export function getTransactionHistoryColumns(
  onOpenTx: (_url: string) => void
): ColumnWithSkeleton<Transaction>[] {
  return [
    {
      id: "change",
      header: "Change",

      enableHiding: false,
      accessorFn: (row) => {
        if (row.legs?.length) {
          return row.legs.map((l) => l.underlyingToken?.symbol).filter(Boolean);
        }

        return row.tokenSymbol ? [row.tokenSymbol] : [];
      },
      sortingFn: "basic",
      filterFn: "assetFilter",

      size: 240,
      minSize: 140,

      cell: ({ row }) => <TransactionAmountCell tx={row.original} />,
      skeleton: <Skeleton className="h-8 w-32" />,
    },
    {
      id: "type",
      header: "Type",

      filterFn: "enumArrayFilter",
      accessorFn: (row) => row.type,
      enableSorting: false,

      size: 160,
      minSize: 140,

      cell: ({ row }) => <TransactionTypeCell tx={row.original} />,
      skeleton: <Skeleton className="h-6 w-24" />,
    },
    {
      id: "date",
      header: "Date",

      accessorFn: (row) => row.timestamp,

      size: 120,
      minSize: 90,

      cell: ({ row }) => <TransactionDateCell tx={row.original} />,
      skeleton: <Skeleton className="h-6 w-32" />,
    },
    {
      id: "transaction",
      header: "Transaction",

      accessorFn: (row) => row.explorerUrl,
      enableSorting: false,

      size: 120,
      minSize: 80,

      cell: ({ row }) => <TransactionLinkCell tx={row.original} onOpen={onOpenTx} />,
      skeleton: <Skeleton className="h-5 w-[50%]" />,
    },
  ];
}
