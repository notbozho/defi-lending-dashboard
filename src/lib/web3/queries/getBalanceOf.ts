import BigNumber from "bignumber.js";
import { Address, erc20Abi, PublicClient } from "viem";

import { NATIVE_TOKEN_ADDRESS, ZERO_ADDRESS } from "@/utils/constants";

type BalanceOfParams = {
  publicClient: PublicClient;
  accountAddress: Address;
  tokenAddress: Address;
};

type BalancesOfParams = {
  publicClient: PublicClient;
  accountAddress: Address;
  tokenAddresses: Address[];
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

export async function getBalancesOf({
  publicClient,
  accountAddress,
  tokenAddresses,
}: BalancesOfParams) {
  const unique = Array.from(new Set(tokenAddresses));

  const erc20s = unique.filter((a) => a !== NATIVE_TOKEN_ADDRESS);
  const wantsNative = unique.includes(NATIVE_TOKEN_ADDRESS);

  const balances: Record<string, BigNumber> = {};

  if (wantsNative) {
    const nativeBalance = await publicClient.getBalance({
      address: accountAddress,
    });
    balances[NATIVE_TOKEN_ADDRESS] = new BigNumber(nativeBalance.toString());
  }

  if (erc20s.length > 0) {
    const calls = erc20s.map((token) => ({
      address: token,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [accountAddress],
    }));

    const results = await publicClient.multicall({ contracts: calls });

    results.forEach((r, i) => {
      const token = erc20s[i];
      balances[token] =
        r.status === "success" ? new BigNumber((r.result as bigint).toString()) : new BigNumber(0);
    });
  }

  return balances;
}
