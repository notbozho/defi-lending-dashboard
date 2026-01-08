"use client";

import { TbReceiptDollar } from "react-icons/tb";
import { ColumnDef } from "@tanstack/react-table";

import { CardTitle } from "@/components";
import { BaseTable } from "@/components/shared/BaseTable";
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty";
import { Transaction } from "@/lib/aave/types/Transaction";

export function TransactionHistoryTable({
  transactions,
  columns,
  loading,
}: {
  transactions: Transaction[];
  columns: ColumnDef<Transaction, unknown>[];
  loading: boolean;
}) {
  return (
    <BaseTable<Transaction>
      data={transactions}
      columns={columns}
      minHeight="250px"
      loading={loading}
      skeletonCount={4}
      hideHeader={true}
      emptyState={
        <Empty>
          <EmptyTitle>No Transactions Yet</EmptyTitle>
          <EmptyDescription>Your transaction history will appear here</EmptyDescription>
        </Empty>
      }
      title={
        <CardTitle variant="withIcon">
          <TbReceiptDollar />
          Transaction History
        </CardTitle>
      }
    />
  );
}
