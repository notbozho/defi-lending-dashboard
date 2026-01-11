"use client";

import { TbReceiptDollar } from "react-icons/tb";
import { ColumnDef } from "@tanstack/react-table";

import { CardTitle } from "@/components";
import ColumnCustomizer from "@/components/shared/table/ColumnCustomizer";
import DataTable from "@/components/shared/table/DataTable";
import AssetFilter from "@/components/shared/table/filters/AssetFilter";
import EnumFilter from "@/components/shared/table/filters/EnumFilter";
import PaginationFooter from "@/components/shared/table/PaginationFooter";
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty";
import { getTransactionAsset } from "@/lib/aave/helpers/transactionHistoryHelper";
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
  const assets = Array.from(
    new Map(
      transactions.flatMap((t) => {
        if (!t.legs) {
          const asset = getTransactionAsset(t.raw.reserve);
          return asset ? [[asset.symbol, asset]] : [];
        }

        return t.legs
          .map((leg) => getTransactionAsset(leg))
          .filter(Boolean)
          .map((asset) => [asset.symbol, asset] as const);
      })
    ).values()
  );

  return (
    <DataTable<Transaction>
      data={transactions}
      columns={columns}
      minHeight="200px"
      searchKeys={["amount"]}
      loading={loading}
      skeletonCount={4}
      renderToolbar={(table) => (
        <div className="flex w-full justify-between">
          <div className="flex justify-between gap-2">
            <AssetFilter<Transaction> column={table.getColumn("change")!} assets={assets} />
            <EnumFilter<Transaction>
              column={table.getColumn("type")!}
              values={["supply", "borrow", "repay", "withdraw", "liquidation"]}
            />
          </div>
          <ColumnCustomizer<Transaction> table={table} />
        </div>
      )}
      renderFooter={(table) => <PaginationFooter table={table} />}
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
