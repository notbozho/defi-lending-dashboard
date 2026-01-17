import { market } from "@aave/client/actions";
import { chainId, evmAddress } from "@aave/react";

import { aaveClient } from "@/lib/aave";
import { queryClient } from "@/lib/queryClient";
import { FIVE_MINUTES } from "@/utils/constants";
import { queryKeyFactory } from "@/utils/queryKeyFactory";

export type MarketFetchParams = {
  cid: number;
  marketAddress: string;
  accountAddress?: string;
};

export async function fetchMarket(params: MarketFetchParams) {
  return queryClient.fetchQuery(getMarketQuery(params));
}

function getMarketQuery({ cid, marketAddress, accountAddress }: MarketFetchParams) {
  const queryKey = [
    ...queryKeyFactory.market(cid, marketAddress),
    ...queryKeyFactory.user(accountAddress ?? "unknown"),
  ];

  return {
    queryKey,
    queryFn: async () => {
      const res = await market(aaveClient, {
        address: evmAddress(marketAddress),
        chainId: chainId(cid),
        user: accountAddress ? evmAddress(accountAddress) : undefined,
      });

      if (res.isErr()) {
        throw res.error;
      }

      return res.value;
    },
    staleTime: FIVE_MINUTES,
  };
}
