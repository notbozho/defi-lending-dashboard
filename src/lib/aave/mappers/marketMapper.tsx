import { Market } from "@aave/react";

import { fetchMarket, MarketFetchParams } from "@/lib/aave/queries/fetchMarket";
import { transformMarketReserves } from "@/lib/aave/transformers/marketReserveTransformer";

export async function marketMapper({ cid, marketAddress, accountAddress }: MarketFetchParams) {
  const [marketData] = await Promise.all([fetchMarket({ cid, marketAddress, accountAddress })]);

  return {
    market: marketData as Market,
    supplyReserves: transformMarketReserves(marketData?.supplyReserves || []),
    borrowReserves: transformMarketReserves(marketData?.borrowReserves || []),
  };
}
