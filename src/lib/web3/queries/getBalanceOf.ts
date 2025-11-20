import BigNumber from "bignumber.js";
import { Address, erc20Abi, PublicClient } from "viem";

import { NATIVE_TOKEN_ADDRESS, ZERO_ADDRESS } from "@/utils/constants";

type BalanceOfParams = {
  publicClient: PublicClient;
  accountAddress: Address;
  tokenAddress: Address;
};

export async function getBalanceOf({
  publicClient,
  accountAddress,
  tokenAddress,
}: BalanceOfParams) {
  let balance: BigNumber;

  if (accountAddress === ZERO_ADDRESS) {
    balance = new BigNumber(0);
  }

  if (tokenAddress === NATIVE_TOKEN_ADDRESS) {
    const res = await publicClient.getBalance({ address: accountAddress });
    balance = new BigNumber(res.toString());
  } else {
    const resp = await publicClient.readContract({
      abi: erc20Abi,
      address: tokenAddress,
      functionName: "balanceOf",
      args: [accountAddress],
    });
    balance = new BigNumber(resp.toString());
  }

  return {
    balance,
  };
}
