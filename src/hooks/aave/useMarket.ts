import { useQuery } from "@tanstack/react-query";

import { useWeb3Context } from "@/context/Web3Context";
import { client } from "@/lib/aave";
import { fetchMarket } from "@/lib/aave/queries/fetchMarket";
import { queryKeyFactory } from "@/utils/queryKeyFactory";

type MarketParams = {
  cid: number;
  marketAddress: string;
  accountAddress?: string;
};

export function useMarket({ cid, marketAddress, accountAddress }: MarketParams) {
  const { isLoading } = useWeb3Context();

  const queryKey = [
    ...queryKeyFactory.market(cid, marketAddress),
    ...queryKeyFactory.user(accountAddress ?? "unknown"),
  ];

  const query = useQuery({
    enabled: !!client && !isLoading,
    queryKey,
    queryFn: () => fetchMarket({ cid, marketAddress, account: accountAddress }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return {
    ...query,
  };
}
