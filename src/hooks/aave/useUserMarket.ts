import { useQuery } from "@tanstack/react-query";

import { MARKET_BY_CHAIN_ID } from "@/config/markets";
import { useWeb3Context } from "@/context/Web3Context";
import { aaveClient } from "@/lib/aave";
import { userMarketMapper } from "@/lib/aave/mappers/userMarketMapper";
import { HALF_MINUTE } from "@/utils/constants";

type UserMarketParams = {
  cid: number;
  accountAddress?: string;
};

export function useUserMarket({ cid, accountAddress }: UserMarketParams) {
  const { isLoading } = useWeb3Context();

  const marketAddress = MARKET_BY_CHAIN_ID(cid)?.addresses.LENDING_POOL ?? "";

  const queryKey = ["useUserMarket", cid, marketAddress, accountAddress ?? "unknown"];

  return useQuery({
    enabled: !!aaveClient && !isLoading,
    queryKey,
    queryFn: () => userMarketMapper({ cid, marketAddress, accountAddress: accountAddress }),
    staleTime: HALF_MINUTE,
  });
}
