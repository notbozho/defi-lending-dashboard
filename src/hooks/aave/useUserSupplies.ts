import { useQuery } from "@tanstack/react-query";

import { useWeb3Context } from "@/context/Web3Context";
import { aaveClient } from "@/lib/aave";
import { fetchUserSupplies } from "@/lib/aave/queries/fetchUserSupplies";
import { queryKeyFactory } from "@/utils/queryKeyFactory";

type UserSuppliesParams = {
  cid: number;
  marketAddress: string;
  accountAddress?: string;
};

export function useUserSupplies({ cid, marketAddress, accountAddress }: UserSuppliesParams) {
  const { isLoading } = useWeb3Context();

  const queryKey = [
    ...queryKeyFactory.market(cid, marketAddress),
    ...queryKeyFactory.user(accountAddress ?? "unknown"),
    "userSupplies",
  ];

  const query = useQuery({
    enabled: !!aaveClient && !isLoading,
    queryKey,
    queryFn: () => fetchUserSupplies({ cid, marketAddress, accountAddress }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return {
    ...query,
  };
}
