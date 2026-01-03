import { PageSize } from "@aave/react";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/shallow";

import { client } from "@/lib/aave";
import { fetchTransactionHistory } from "@/lib/aave/queries/fetchTransactionHistory";
import { useMarketStore } from "@/stores/useMarketStore";
import { ZERO_ADDRESS } from "@/utils/constants";
import { queryKeyFactory } from "@/utils/queryKeyFactory";

type TransactionHistoryParams = {
  userAddress: string;
  pageSize: PageSize;
};

export function useTransactionHistory({ userAddress, pageSize }: TransactionHistoryParams) {
  const [currentMarket, cursor] = useMarketStore(
    useShallow((state) => [state.market, state.sdkCursor])
  );

  const validAccount = Boolean(userAddress) && userAddress.length > 0;

  const queryKey = [
    ...queryKeyFactory.transactionHistory(pageSize, cursor ?? "null"),
    ...queryKeyFactory.market(
      currentMarket?.chain.chainId as number,
      currentMarket?.address as string
    ),
    ...queryKeyFactory.user(validAccount ? userAddress : ZERO_ADDRESS),
  ];

  const cid = currentMarket?.chain.chainId as number;
  const marketAddress = currentMarket?.address as string;

  const {
    data: history,
    error,
    isLoading,
  } = useQuery({
    enabled: !!client && currentMarket != null,
    queryKey,
    queryFn: () => fetchTransactionHistory({ cid, marketAddress, userAddress, cursor, pageSize }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const loading = isLoading || !history;

  return {
    history,
    error,
    loading,
  };
}
