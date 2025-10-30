import { chainId, useAaveMarkets } from "@aave/react";

import { transformMarketAssets } from "@/lib/aave";

export function useMarketAssets(cid: number) {
  const { data, loading, error } = useAaveMarkets({
    chainIds: [chainId(cid)],
  });

  if (loading || error || !data || data.length === 0) {
    return { markets: [], loading, error };
  }

  const assets = transformMarketAssets(data[0].supplyReserves);

  return { assets, loading, error, market: data[0] };
}
