"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { marketReservesColumns } from "@/app/(market)/reserves/MarketReservesColumns";
import { BaseTable } from "@/components/shared/BaseTable";
import { Switch } from "@/components/ui/switch";
import { MarketReserve } from "@/lib/aave";

export function MarketReservesTable({
  reserves,
  loading,
}: {
  reserves: MarketReserve[];
  loading: boolean;
}) {
  const router = useRouter();
  const [showFrozen, setShowFrozen] = useState(false);

  return (
    <BaseTable<MarketReserve>
      data={showFrozen ? reserves : reserves.filter((r) => !r.isFrozen)}
      columns={marketReservesColumns}
      loading={loading}
      searchKeys={["name", "symbol"]}
      initialSorting={[{ id: "totalSupplied", desc: true }]}
      onRowClick={(row) => router.push(`/reserve/${row.underlyingAddress}`)}
      rowProps={(row) => ({
        className: row.isFrozen ? "opacity-50" : "",
      })}
      renderToolbar={(table) => (
        <div className="flex items-center space-x-2">
          <span className="text-xs">Frozen Assets</span>
          <Switch checked={showFrozen} onCheckedChange={setShowFrozen} />
        </div>
      )}
    />
  );
}
