import { useQuery } from "@tanstack/react-query";

import { aaveClient } from "@/lib/aave";
import { TimeWindowMap } from "@/lib/aave/constants";
import { fetchAPRHistory } from "@/lib/aave/queries/fetchAprHistory";
import { queryKeyFactory } from "@/utils/queryKeyFactory";

type APRHistoryParams = {
  cid: number;
  marketAddress: string;
  assetAddress: string;
  period: keyof typeof TimeWindowMap;
  borrow?: boolean;
};

export function useAPRHistory({
  cid,
  marketAddress,
  assetAddress,
  period = "1W",
  borrow = false,
}: APRHistoryParams) {
  const queryKey = [
    borrow ? "borrowAPRHistory" : "supplyAPRHistory",
    ...queryKeyFactory.reserve(cid, marketAddress, assetAddress),
    period,
  ];

  const {
    data: history,
    error,
    isLoading,
  } = useQuery({
    enabled: !!aaveClient,
    queryKey,
    queryFn: () => fetchAPRHistory({ cid, marketAddress, assetAddress, period, borrow }),
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
