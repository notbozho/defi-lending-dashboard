"use client";

import TransactionAmountCell from "@/app/components/TransactionHistory/cells/TransactionAmountCell";
import TransactionDateCell from "@/app/components/TransactionHistory/cells/TransactionDateCell";
import TransactionLinkCell from "@/app/components/TransactionHistory/cells/TransactionLinkCell";
import TransactionTypeCell from "@/app/components/TransactionHistory/cells/TransactionTypeCell";
import { Skeleton } from "@/components/ui/skeleton";
import { getTransactionAmount } from "@/lib/aave/helpers/transactionHistoryHelper";
import { Transaction } from "@/lib/aave/types/Transaction";
import { ColumnWithSkeleton } from "@/types/table";

export function getTransactionHistoryColumns(
  onOpenTx: (_url: string) => void
): ColumnWithSkeleton<Transaction>[] {
  return [
    {
      id: "amount",
      header: "Amount",

      accessorFn: (row) => getTransactionAmount(row),
      sortingFn: "basic",

      size: 240,
      minSize: 140,

      cell: ({ row }) => <TransactionAmountCell tx={row.original} />,
      skeleton: <Skeleton className="h-8 w-32" />,
    },
    {
      id: "type",
      header: "Type",

      accessorFn: (row) => row.type,

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

      size: 120,
      minSize: 80,

      cell: ({ row }) => <TransactionLinkCell tx={row.original} onOpen={onOpenTx} />,
      skeleton: <Skeleton className="h-5 w-[50%]" />,
    },
  ];
}
