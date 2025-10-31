import React from "react";
import {
  chainId,
  evmAddress,
  TimeWindow,
  useSupplyAPYHistory as useAaveSupplyAPYHistory,
} from "@aave/react";

import { transformAssetHistoryData } from "@/lib/aave/transformers/assetHistoryTransformer";

const TimeWindowMap: Record<"24H" | "1W" | "1M" | "6M" | "1Y", TimeWindow> = {
  "24H": TimeWindow.LastDay,
  "1W": TimeWindow.LastWeek,
  "1M": TimeWindow.LastMonth,
  "6M": TimeWindow.LastSixMonths,
  "1Y": TimeWindow.LastYear,
};

type SupplyAPRHistoryParams = {
  cid: number;
  marketAddress: string;
  assetAddress: string;
  period?: "24H" | "1W" | "1M" | "6M" | "1Y";
};

export function useSupplyAPRHistory({
  cid,
  marketAddress,
  assetAddress,
  period = "1W",
}: SupplyAPRHistoryParams) {
  const { data, error, loading } = useAaveSupplyAPYHistory({
    chainId: chainId(cid),
    market: evmAddress(marketAddress),
    underlyingToken: evmAddress(assetAddress),
    window: TimeWindowMap[period],
  });

  const [delayedData, setDelayedData] = React.useState<typeof data | null>(null);
  const [delayedLoading, setDelayedLoading] = React.useState(true);

  React.useEffect(() => {
    // whenever data or loading changes, restart delay
    if (!loading) {
      setDelayedLoading(true);
      const timer = setTimeout(() => {
        setDelayedData(data);
        setDelayedLoading(false);
      }, 4000); // 4 seconds
      return () => clearTimeout(timer);
    }
  }, [data, loading]);

  if (loading || delayedLoading || error || !delayedData || delayedData.length === 0) {
    return { data: delayedData, loading: true, error };
  }

  const history = transformAssetHistoryData(delayedData);
  return { history, loading: false, error };
}
