import { fetchMarket, MarketFetchParams } from "@/lib/aave/queries/fetchMarket";
import { fetchUserBorrows } from "@/lib/aave/queries/fetchUserBorrows";
import { fetchUserSupplies } from "@/lib/aave/queries/fetchUserSupplies";
import { transformMarketReserves } from "@/lib/aave/transformers/marketReserveTransformer";

export async function userMarketMapper({ cid, marketAddress, accountAddress }: MarketFetchParams) {
  const [marketData, userBorrows, userSupplies] = await Promise.all([
    fetchMarket({ cid, marketAddress, accountAddress }),
    fetchUserBorrows({ cid, marketAddress, accountAddress }),
    fetchUserSupplies({ cid, marketAddress, accountAddress }),
  ]);

  return {
    market: marketData,
    supplyReserves: transformMarketReserves(marketData?.supplyReserves || []),
    borrowReserves: transformMarketReserves(marketData?.borrowReserves || []),
    userBorrows: userBorrows,
    userSupplies: userSupplies,
  };
}
