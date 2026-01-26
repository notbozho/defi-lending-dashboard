import { Market } from "@aave/react";

import { TimeWindowMap } from "@/lib/aave/constants";
import { fetchMarket } from "@/lib/aave/queries/fetchMarket";
import { transformMarketReserves } from "@/lib/aave/transformers/marketReserveTransformer";

export type FullReserveMarketFetchParams = {
  cid: number;
  marketAddress: string;
  accountAddress?: string;
  assetAddress: string;
  period: keyof typeof TimeWindowMap;
  borrow?: boolean;
};

export async function fullReserveMarketMapper({
  cid,
  marketAddress,
  accountAddress,
}: FullReserveMarketFetchParams) {
  const marketData = await fetchMarket({ cid, marketAddress, accountAddress });

  return {
    market: marketData as Market,
    supplyReserves: transformMarketReserves(marketData?.supplyReserves || []),
    borrowReserves: transformMarketReserves(marketData?.borrowReserves || []),
  };
}
