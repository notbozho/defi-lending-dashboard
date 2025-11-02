import { useQuery } from "@tanstack/react-query";

import { type APRHistoryParams, fetchAPRHistory } from ".";

export function useAPRHistoryQuery(params: APRHistoryParams) {
  const queryKey = [
    params.borrow ? "borrowAPRHistory" : "supplyAPRHistory",
    params.cid,
    params.marketAddress,
    params.assetAddress,
    params.period,
  ];

  const query = useQuery({
    queryKey,
    queryFn: () => fetchAPRHistory(params),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  return query;
}
