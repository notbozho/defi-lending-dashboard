import { MarketFetchParams } from "@/lib/aave/queries/fetchMarket";
import { fetchUserBorrows } from "@/lib/aave/queries/fetchUserBorrows";
import { fetchUserSupplies } from "@/lib/aave/queries/fetchUserSupplies";

export async function userPositionsMapper({
  cid,
  marketAddress,
  accountAddress,
}: MarketFetchParams) {
  const [userBorrows, userSupplies] = await Promise.all([
    fetchUserBorrows({ cid, marketAddress, accountAddress }),
    fetchUserSupplies({ cid, marketAddress, accountAddress }),
  ]);

  return {
    userBorrows: userBorrows,
    userSupplies: userSupplies,
  };
}
