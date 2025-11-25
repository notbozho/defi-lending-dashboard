import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

import { useWeb3Context } from "@/context/Web3Context";
import { getBalancesOf } from "@/lib/web3/queries/getBalanceOf";
import { queryKeyFactory } from "@/utils/queryKeyFactory";

type UseBalancesOfType = {
  accountAddress: Address;
  tokenAddresses: Address[];
};

export function useBalancesOf({ accountAddress, tokenAddresses }: UseBalancesOfType) {
  const { chainId, publicClient } = useWeb3Context();

  const queryKey = [...queryKeyFactory.balancesOf(chainId, accountAddress, tokenAddresses)];

  return useQuery({
    queryKey,
    queryFn: () => getBalancesOf({ publicClient, accountAddress, tokenAddresses }),
    enabled: !!publicClient && !!accountAddress && !!tokenAddresses,
    staleTime: 10_000,
    refetchOnWindowFocus: false,
  });
}
