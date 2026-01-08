import { Cursor, PageSize } from "@aave/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/shallow";

import { client } from "@/lib/aave";
import { fetchTransactionHistory } from "@/lib/aave/queries/fetchTransactionHistory";
import { transformTransactions } from "@/lib/aave/transformers/transactionHistoryTransformer";
import { useMarketStore } from "@/stores/useMarketStore";
import { ZERO_ADDRESS } from "@/utils/constants";
import { queryKeyFactory } from "@/utils/queryKeyFactory";

type TransactionHistoryParams = {
  accountAddress: string;
  pageSize: PageSize;
};

export function useTransactionHistory({ accountAddress, pageSize }: TransactionHistoryParams) {
  const currentMarket = useMarketStore((s) => s.market);

  const validAccount = Boolean(accountAddress) && accountAddress.length > 0;

  const queryKey = [
    ...queryKeyFactory.transactionHistory(pageSize),
    ...queryKeyFactory.market(
      currentMarket?.chain.chainId as number,
      currentMarket?.address as string
    ),
    ...queryKeyFactory.user(validAccount ? accountAddress : ZERO_ADDRESS),
  ];

  const cid = currentMarket?.chain.chainId as number;
  const marketAddress = currentMarket?.address as string;

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetching,
  } = useInfiniteQuery({
    enabled: !!client && currentMarket != null,
    queryKey,
    queryFn: ({ pageParam }) =>
      fetchTransactionHistory({
        cid,
        marketAddress,
        accountAddress,
        cursor: pageParam as Cursor,
        pageSize,
      }),
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        items: transformTransactions(page.items),
      })),
    }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.pageInfo?.next ?? undefined,
  });

  const loading = isLoading || !data || isFetching;

  console.log("Transaction history data:", data);

  return {
    data,
    error,
    loading,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  };
}
