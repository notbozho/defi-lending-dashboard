import BigNumber from "bignumber.js";
import { useAccount } from "wagmi";

import { useBalanceOf } from "@/hooks/web3/useBalanceOf";
import type { MarketReserve } from "@/lib/aave/types/MarketReserve";
import { ZERO_ADDRESS } from "@/utils/constants";

export function useMaxSupply(reserve: MarketReserve): string {
  const { address } = useAccount();

  const { data } = useBalanceOf({
    accountAddress: (address ?? ZERO_ADDRESS) as `0x${string}`,
    tokenAddress: reserve.underlyingAddress as `0x${string}`,
  });

  const raw = new BigNumber(data?.balance?.toString() ?? "0");
  const human = raw.div(new BigNumber(10).pow(reserve.decimals));

  // TODO: consider supply caps when provided in reserve.supplyInfo
  return human.toFixed();
}
