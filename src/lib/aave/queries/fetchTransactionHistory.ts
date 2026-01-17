import { userTransactionHistory } from "@aave/client/actions";
import {
  chainId,
  Cursor,
  evmAddress,
  OrderDirection,
  PageSize,
  PaginatedUserTransactionHistoryResult,
} from "@aave/react";

import { aaveClient } from "@/lib/aave";

export type TransactionHistoryFetchParams = {
  cid: number;
  marketAddress: string;
  accountAddress: string;
  pageSize?: PageSize;
  cursor: Cursor | null;
};

export async function fetchTransactionHistory({
  cid,
  marketAddress,
  accountAddress,
  pageSize,
  cursor,
}: TransactionHistoryFetchParams): Promise<PaginatedUserTransactionHistoryResult> {
  const res = await userTransactionHistory(aaveClient, {
    user: evmAddress(accountAddress),
    market: evmAddress(marketAddress),
    orderBy: { date: OrderDirection.Desc },
    chainId: chainId(cid),
    pageSize: pageSize ?? PageSize.Ten,
    cursor: cursor,
  });

  if (res.isErr()) {
    throw res.error;
  }

  return res.value;
}
