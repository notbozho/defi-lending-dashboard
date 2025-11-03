"use client";

import { IconTooltip } from "@/components/shared/IconTooltip";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import AprChart from "./AprChart";

interface Props {
  marketAddress: string;
  assetAddress: string;
}

export default function ReserveCharts({ marketAddress, assetAddress }: Props) {
  return (
    <div className="grow space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-medium">Supply Info</h2>
            <IconTooltip text="The historical annual percentage rate (APR) for supplying this asset." />
          </div>
        </CardHeader>
        <CardContent>
          <AprChart type="supply" marketAddress={marketAddress} assetAddress={assetAddress} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-medium">Borrow Info</h2>
            <IconTooltip text="The historical annual percentage rate (APR) for borrowing this asset." />
          </div>
        </CardHeader>
        <CardContent>
          <AprChart type="borrow" marketAddress={marketAddress} assetAddress={assetAddress} />
        </CardContent>
      </Card>
    </div>
  );
}
