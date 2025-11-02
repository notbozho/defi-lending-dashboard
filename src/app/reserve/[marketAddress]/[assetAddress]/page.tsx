import { Card } from "@/components/ui/card";

import AprChart from "./AprChart";
import { AssetMetrics } from "./AssetMetrics";

interface ReservePageProps {
  params: { marketAddress: string; assetAddress: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ReservePage({ params }: ReservePageProps) {
  const { marketAddress, assetAddress } = await params;

  return (
    <main className="bg-background min-h-screen w-full">
      <div className="container mx-auto space-y-6">
        <h1 className="mb-2 text-2xl font-bold">reserve #{marketAddress}</h1>
        {/* <AssetMetrics marketAddress={marketAddress} assetAddress={assetAddress} /> */}
        <div className="flex space-y-0 gap-x-6">
          <Card className="order-2 max-h-[calc(100vh-48px)] w-[400px] self-start overflow-x-auto">
            test
          </Card>
          <div className="order-1 grow space-y-6">
            <AprChart type="supply" marketAddress={marketAddress} assetAddress={assetAddress} />

            <AprChart type="borrow" marketAddress={marketAddress} assetAddress={assetAddress} />
          </div>
        </div>
      </div>
    </main>
  );
}
