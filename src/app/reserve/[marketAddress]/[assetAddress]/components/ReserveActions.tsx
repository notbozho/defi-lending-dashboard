"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReserveActions({ loading }: { loading: boolean }) {
  return (
    <Card className="order-2 max-h-[calc(100vh-48px)] w-[400px] self-start overflow-x-auto px-6">
      {loading ? <Skeleton className="h-5 w-32" /> : <>actions</>}
    </Card>
  );
}
