"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useReserveStore } from "@/stores/reserve";

export default function ReserveActions() {
  const loading = useReserveStore((s) => s.loading);

  return (
    <Card className="order-2 max-h-[calc(100vh-48px)] w-[400px] self-start overflow-x-auto px-6">
      {loading ? <Skeleton className="h-5 w-32" /> : <>actions</>}
    </Card>
  );
}
