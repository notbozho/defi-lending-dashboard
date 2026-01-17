import { useQuery } from "@tanstack/react-query";

import { MARKET_BY_CHAIN_ID } from "@/config/markets";
import { useWeb3Context } from "@/context/Web3Context";
import { aaveClient } from "@/lib/aave";
import { userPositionsMapper } from "@/lib/aave/mappers/userPositionsMapper";
import { HALF_MINUTE } from "@/utils/constants";

type UserPositionsParams = {
  cid: number;
  accountAddress?: string;
};

export function useUserPositions({ cid, accountAddress }: UserPositionsParams) {
  const { isLoading } = useWeb3Context();

  const marketAddress = MARKET_BY_CHAIN_ID(cid)?.addresses.LENDING_POOL ?? "";

  const queryKey = ["useUserPositions", cid, marketAddress, accountAddress ?? "unknown"];

  return useQuery({
    enabled: !!aaveClient && !isLoading,
    queryKey,
    queryFn: () => userPositionsMapper({ cid, marketAddress, accountAddress: accountAddress }),
    staleTime: HALF_MINUTE,
  });
}
