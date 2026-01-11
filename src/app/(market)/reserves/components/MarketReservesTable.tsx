"use client";

import { FaShop } from "react-icons/fa6";
import { useRouter } from "next/navigation";

import { marketReservesColumns } from "@/app/(market)/reserves/lib/marketReservesColumns";
import { CardTitle } from "@/components";
import ColumnCustomizer from "@/components/shared/table/ColumnCustomizer";
import DataTable from "@/components/shared/table/DataTable";
import { MarketReserve } from "@/lib/aave/types/MarketReserve";

export function MarketReservesTable({
  reserves,
  loading,
}: {
  reserves: MarketReserve[];
  loading: boolean;
}) {
  const router = useRouter();

  return (
    <DataTable<MarketReserve>
      // data={showFrozen ? reserves : reserves.filter((r) => !r.isFrozen)} // TODO
      data={reserves}
      columns={marketReservesColumns}
      loading={loading}
      searchKeys={["name", "symbol"]}
      hiddenColumns={["utilizationRate", "maxLTV"]}
      renderToolbar={(table) => <ColumnCustomizer table={table} />}
      skeletonCount={10}
      pageSize={-1}
      onRowClick={(row) => router.push(`/reserve/${row.underlyingAddress}`)}
      title={
        <CardTitle variant="withIcon">
          <FaShop />
          Market Reserves
        </CardTitle>
      }
    />
  );
}
