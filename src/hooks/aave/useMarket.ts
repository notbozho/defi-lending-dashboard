import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/aave";
import { fetchMarket } from "@/lib/aave/queries/fetchMarket";
import { useMarketStore } from "@/stores/useMarketStore";
import { queryKeyFactory } from "@/utils/queryKeyFactory";

type MarketParams = {
  cid: number;
  marketAddress: string;
  account?: string;
};

export function useMarket({ cid, marketAddress, account }: MarketParams) {
  const setMarketData = useMarketStore((s) => s.setMarketData);

  const queryKey = [
    ...queryKeyFactory.market(cid, marketAddress),
    ...queryKeyFactory.user(account ?? "unknown"),
  ];

  const query = useQuery({
    enabled: !!client,
    queryKey,
    queryFn: () => fetchMarket({ cid, marketAddress, account }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (query.data) {
      setMarketData(query.data);
    }
  }, [query.data, marketAddress, setMarketData]);

  return {
    ...query,
  };
}
