import { chainId, evmAddress, useAaveMarkets, useAaveReserve } from "@aave/react";

import { transformMarketAsset, transformMarketAssets } from "@/lib/aave";

type MarketAssetParams = {
  cid: number;
  marketAddress: string;
  assetAddress: string;
};

export function useMarketAsset({ cid, marketAddress, assetAddress }: MarketAssetParams) {
  const { data, loading, error } = useAaveReserve({
    chainId: chainId(cid),
    market: evmAddress(marketAddress),
    underlyingToken: evmAddress(assetAddress),
  });

  if (loading || error || !data) {
    return { asset: undefined, loading, error };
  }

  const asset = transformMarketAsset(data);

  return { asset, loading, error, market: data.market };
}

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
