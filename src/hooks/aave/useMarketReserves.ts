import { useEffect } from "react";
import { chainId, evmAddress, useAaveMarkets, useAaveReserve } from "@aave/react";

import { transformMarketAssets, transformMarketReserve } from "@/lib/aave";
import { useReserveStore } from "@/stores/reserve";

type MarketReserveParams = {
  cid: number;
  marketAddress: string;
  underlyingToken: string;
};

export function useMarketReserve({ cid, marketAddress, underlyingToken }: MarketReserveParams) {
  const { data, loading, error } = useAaveReserve({
    chainId: chainId(cid),
    market: evmAddress(marketAddress),
    underlyingToken: evmAddress(underlyingToken),
  });
  const setReserveData = useReserveStore((s) => s.setReserveData);

  useEffect(() => {
    if (loading) {
      setReserveData({ loading: true, error: null, asset: undefined });
      return;
    }

    if (error) {
      setReserveData({ loading: false, error, asset: undefined });
      return;
    }

    if (data) {
      const asset = transformMarketReserve(data);
      setReserveData({ loading: false, error: null, asset });
    }
  }, [data, loading, error, setReserveData]);

  const asset = data ? transformMarketReserve(data) : undefined;

  return { asset, loading, error, market: data?.market };
}

export function useMarketReserves(cid: number) {
  const { data, loading, error } = useAaveMarkets({
    chainIds: [chainId(cid)],
  });

  if (loading || error || !data || data.length === 0) {
    return { markets: [], loading, error };
  }

  const assets = transformMarketAssets(data[0].supplyReserves);

  return { assets, loading, error, market: data[0] };
}
