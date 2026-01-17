import { useEffect, useRef, useState } from "react";
import { Cursor, PageSize } from "@aave/react";
import { useQuery } from "@tanstack/react-query";

import { aaveClient } from "@/lib/aave";
import { fetchTransactionHistory } from "@/lib/aave/queries/fetchTransactionHistory";
import { transformTransactions } from "@/lib/aave/transformers/transactionHistoryTransformer";
import { Transaction } from "@/lib/aave/types/Transaction";
import { ZERO_ADDRESS } from "@/utils/constants";
import { queryKeyFactory } from "@/utils/queryKeyFactory";

type TransactionHistoryParams = {
  cid: number;
  marketAddress: string;
  accountAddress: string;
};

export function useTransactionHistory({
  cid,
  marketAddress,
  accountAddress,
}: TransactionHistoryParams) {
  const [aaveCursor, setAaveCursor] = useState<Cursor | null>(null);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const transactionsSet = useRef<Set<string>>(new Set());

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fetchingAllPages, setFetchingAllPages] = useState(true);
  const [loadedInitialPage, setLoadedInitialPage] = useState(false);

  const validAccount = Boolean(accountAddress) && accountAddress.length > 0;

  const queryKey = [
    ...queryKeyFactory.transactionHistory(aaveCursor ?? undefined),
    ...queryKeyFactory.market(cid, marketAddress),
    ...queryKeyFactory.user(validAccount ? accountAddress : ZERO_ADDRESS),
  ];

  const { data, error, isLoading } = useQuery({
    enabled: !!aaveClient,
    queryKey,
    queryFn: () =>
      fetchTransactionHistory({
        cid,
        marketAddress,
        accountAddress,
        cursor: aaveCursor,
        pageSize: PageSize.Fifty,
      }),
    select: (data) => ({
      ...data,
      items: transformTransactions(data.items),
    }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    (() => {
      setAaveCursor(null);
      setTransactions([]);
      transactionsSet.current.clear();
      setFetchingAllPages(true);
      setLoadedInitialPage(false);
    })();
  }, [accountAddress, cid, marketAddress]);

  useEffect(() => {
    (() => {
      if (!data?.items.length) {
        if (!isLoading && !data?.pageInfo?.next) {
          setFetchingAllPages(false);
          if (!loadedInitialPage) {
            setLoadedInitialPage(true);
          }
        }
        return;
      }

      const newTransactions = data.items.filter((tx) => {
        if (transactionsSet.current.has(tx.id)) {
          return false;
        }
        transactionsSet.current.add(tx.id);
        return true;
      });

      if (newTransactions.length > 0) {
        setTransactions((prev) => [...prev, ...newTransactions]);
        if (!loadedInitialPage) {
          setLoadedInitialPage(true);
        }
      }
    })();
  }, [data, isLoading, loadedInitialPage]);

  useEffect(() => {
    (() => {
      if (isLoading) {
        setFetchingAllPages(true);
        return;
      }

      const nextCursor = data?.pageInfo?.next || null;
      if (nextCursor && nextCursor !== aaveCursor) {
        setFetchingAllPages(true);
        setAaveCursor(nextCursor);
        return;
      }

      if (!nextCursor) {
        setFetchingAllPages(false);
      }
    })();
  }, [data?.pageInfo?.next, isLoading, aaveCursor]);

  useEffect(() => {
    (() => {
      if (error && !loadedInitialPage) {
        setLoadedInitialPage(true);
        setFetchingAllPages(false);
      }
    })();
  }, [error, loadedInitialPage]);

  return {
    transactions,
    error,
    loading: isLoading,
    loadedInitialPage,
  };
}
