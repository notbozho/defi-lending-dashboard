import { userBorrows } from "@aave/client/actions";
import { chainId, evmAddress, OrderDirection } from "@aave/react";

import { aaveClient } from "@/lib/aave";
import { queryClient } from "@/lib/queryClient";
import { FIVE_MINUTES } from "@/utils/constants";
import { queryKeyFactory } from "@/utils/queryKeyFactory";

export type UserBorrowsFetchParams = {
  cid: number;
  marketAddress: string;
  accountAddress?: string;
};

export async function fetchUserBorrows(params: UserBorrowsFetchParams) {
  return queryClient.fetchQuery(getUserBorrowsQuery(params));
}

function getUserBorrowsQuery({ cid, marketAddress, accountAddress }: UserBorrowsFetchParams) {
  const userAddress = accountAddress ? evmAddress(accountAddress) : undefined;

  const queryKey = [
    ...queryKeyFactory.market(cid, marketAddress),
    ...queryKeyFactory.user(userAddress ?? "unknown"),
    "userBorrows",
  ];

  return {
    queryKey,
    queryFn: async () => {
      const res = await userBorrows(aaveClient, {
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
    },
    staleTime: FIVE_MINUTES,
  };
}
