import { useQuery } from "@tanstack/react-query";

import { useWeb3Context } from "@/context/Web3Context";
import { client } from "@/lib/aave";
import { fetchUserBorrows } from "@/lib/aave/queries/fetchUserBorrows";
import { queryKeyFactory } from "@/utils/queryKeyFactory";

type UserBorrowsParams = {
  cid: number;
  marketAddress: string;
  accountAddress?: string;
};

export function useUserBorrows({ cid, marketAddress, accountAddress }: UserBorrowsParams) {
  const { isLoading } = useWeb3Context();

  const queryKey = [
    ...queryKeyFactory.market(cid, marketAddress),
    ...queryKeyFactory.user(accountAddress ?? "unknown"),
    "userBorrows",
  ];

  const query = useQuery({
    enabled: !!client && !isLoading,
    queryKey,
    queryFn: () => fetchUserBorrows({ cid, marketAddress, account: accountAddress }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return {
    ...query,
  };
}
