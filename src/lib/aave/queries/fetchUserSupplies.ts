import { userSupplies } from "@aave/client/actions";
import { chainId, evmAddress, OrderDirection } from "@aave/react";

import { aaveClient } from "@/lib/aave";
import { queryClient } from "@/lib/queryClient";
import { FIVE_MINUTES } from "@/utils/constants";
import { queryKeyFactory } from "@/utils/queryKeyFactory";

export type UserSuppliesFetchParams = {
  cid: number;
  marketAddress: string;
  accountAddress?: string;
};

export async function fetchUserSupplies(params: UserSuppliesFetchParams) {
  return queryClient.fetchQuery(getUserSuppliesQuery(params));
}

function getUserSuppliesQuery({ cid, marketAddress, accountAddress }: UserSuppliesFetchParams) {
  const userAddress = accountAddress ? evmAddress(accountAddress) : undefined;

  const queryKey = [
    ...queryKeyFactory.market(cid, marketAddress),
    ...queryKeyFactory.user(userAddress ?? "unknown"),
    "userSupplies",
  ];

  return {
    queryKey,
    queryFn: async () => {
      const res = await userSupplies(aaveClient, {
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
    },
    staleTime: FIVE_MINUTES,
  };
}
