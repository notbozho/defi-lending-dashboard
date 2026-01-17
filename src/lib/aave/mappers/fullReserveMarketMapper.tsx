import { Market } from "@aave/react";

import { TimeWindowMap } from "@/lib/aave/constants";
import { fetchAPRHistory } from "@/lib/aave/queries/fetchAprHistory";
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
  assetAddress,
  period,
  borrow,
}: FullReserveMarketFetchParams) {
  const [marketData, aprHistory] = await Promise.all([
    fetchMarket({ cid, marketAddress, accountAddress }),
    fetchAPRHistory({ cid, marketAddress, assetAddress, period, borrow }),
  ]);

  return {
    market: marketData as Market,
    supplyReserves: transformMarketReserves(marketData?.supplyReserves || []),
    borrowReserves: transformMarketReserves(marketData?.borrowReserves || []),
  };
}
