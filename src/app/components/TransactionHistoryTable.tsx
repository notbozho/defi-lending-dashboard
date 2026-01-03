"use client";

import { TbReceiptDollar } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";

import { CardTitle } from "@/components";
import { BaseTable } from "@/components/shared/BaseTable";
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty";

type PositionWithAddress = {
  currency: {
    address: string;
  };
};

export function TransactionHistoryTable<Positions extends PositionWithAddress>({
  positions,
  columns,
  loading,
  title,
  icon,
}: {
  positions: Positions[];
  columns: ColumnDef<Positions, unknown>[];
  loading: boolean;
  title: string;
  icon?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <BaseTable<Positions>
      data={positions}
      columns={columns}
      minHeight="250px"
      onRowClick={(row) => router.push(`/reserve/${row.currency.address}`)}
      loading={loading}
      skeletonCount={1}
      emptyState={
        <Empty>
          <EmptyTitle>No Transactions Yet</EmptyTitle>
          <EmptyDescription>Your transaction history will appear here</EmptyDescription>
        </Empty>
      }
      title={
        <CardTitle variant={icon ? "withIcon" : "default"}>
          <TbReceiptDollar fill="white" />
          Transaction History
        </CardTitle>
      }
    />
  );
}
