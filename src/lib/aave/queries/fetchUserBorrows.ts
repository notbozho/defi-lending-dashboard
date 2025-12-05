import { userBorrows } from "@aave/client/actions";
import { chainId, evmAddress, MarketUserReserveBorrowPosition, OrderDirection } from "@aave/react";

import { client } from "@/lib/aave";

export type UserBorrowsFetchParams = {
  cid: number;
  marketAddress: string;
  account?: string;
};

export async function fetchUserBorrows({
  cid,
  marketAddress,
  account,
}: UserBorrowsFetchParams): Promise<MarketUserReserveBorrowPosition[]> {
  const userAddress = account ? evmAddress(account) : undefined;

  const res = await userBorrows(client, {
    markets: [
      {
        address: evmAddress(marketAddress),
        chainId: chainId(cid),
      },
    ],
    user: userAddress!,
    orderBy: { debt: OrderDirection.Asc },
  });

  if (res.isErr()) {
    throw res.error;
  }

  return res.value;
}
