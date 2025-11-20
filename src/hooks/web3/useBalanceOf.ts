import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

import { useWeb3Context } from "@/context/Web3Context";
import { getBalanceOf } from "@/lib/web3/queries/getBalanceOf";
import { queryKeyFactory } from "@/utils/queryKeyFactory";

type UseBalanceOfType = {
  accountAddress: Address;
  tokenAddress: Address;
};

export function useBalanceOf({ accountAddress, tokenAddress }: UseBalanceOfType) {
  const { chainId, publicClient } = useWeb3Context();

  const queryKey = [...queryKeyFactory.balanceOf(chainId, accountAddress, tokenAddress)];

  return useQuery({
    queryKey,
    queryFn: () => getBalanceOf({ publicClient, accountAddress, tokenAddress }),
    enabled: !!publicClient && !!accountAddress && !!tokenAddress,
  });
}
