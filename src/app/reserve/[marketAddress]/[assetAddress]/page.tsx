import { AssetMetrics } from "@/app/reserve/[marketAddress]/[assetAddress]/AssetMetrics";
import SupplyAprGraph from "@/app/reserve/[marketAddress]/[assetAddress]/SupplyAprGraph";

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
        <AssetMetrics marketAddress={marketAddress} assetAddress={assetAddress} />
        <SupplyAprGraph assetAddress={assetAddress} marketAddress={marketAddress} />
      </div>
    </main>
  );
}
