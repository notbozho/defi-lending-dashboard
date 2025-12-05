import { userSupplies } from "@aave/client/actions";
import { chainId, evmAddress, MarketUserReserveSupplyPosition, OrderDirection } from "@aave/react";

import { client } from "@/lib/aave";

export type UserSuppliesFetchParams = {
  cid: number;
  marketAddress: string;
  account?: string;
};

export async function fetchUserSupplies({
  cid,
  marketAddress,
  account,
}: UserSuppliesFetchParams): Promise<MarketUserReserveSupplyPosition[]> {
  const userAddress = account ? evmAddress(account) : undefined;

  const res = await userSupplies(client, {
    markets: [
      {
        address: evmAddress(marketAddress),
        chainId: chainId(cid),
      },
    ],
    user: userAddress!,
    orderBy: { balance: OrderDirection.Asc },
  });

  if (res.isErr()) {
    throw res.error;
  }

  return res.value;
}
