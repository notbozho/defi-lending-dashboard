"use client";

import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";

import { Button, CardTitle } from "@/components";
import { BaseTable } from "@/components/shared/BaseTable";
import { Empty, EmptyContent, EmptyDescription, EmptyTitle } from "@/components/ui/empty";

type PositionWithAddress = {
  currency: {
    address: string;
  };
};

export function PositionsTable<Positions extends PositionWithAddress>({
  positions,
  columns,
  loading,
  title,
}: {
  positions: Positions[];
  columns: ColumnDef<Positions, unknown>[];
  loading: boolean;
  title: string;
}) {
  const router = useRouter();
  return (
    <BaseTable<Positions>
      data={positions}
      columns={columns}
      minHeight="400px"
      onRowClick={(row) => router.push(`/reserve/${row.currency.address}`)}
      loading={loading}
      skeletonCount={1}
      emptyState={
        <Empty>
          <EmptyTitle>No {title} Yet</EmptyTitle>
          <EmptyDescription>Your positions will appear here</EmptyDescription>
          <EmptyContent>
            <Button
              onClick={() => {
                router.push("/reserves");
              }}
            >
              Browse
            </Button>
          </EmptyContent>
        </Empty>
      }
      renderToolbar={() => <CardTitle>{title}</CardTitle>}
    />
  );
}
