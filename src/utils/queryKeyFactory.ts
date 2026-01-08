import { PageSize } from "@aave/react";

export const queryKeyFactory = {
  market: (cid: number, marketAddress: string) => ["Market", cid, marketAddress] as const,
  user: (userAddress: string) => ["User", userAddress] as const,
  reserve: (cid: number, marketAddress: string, assetAddress: string) =>
    ["Reserve", cid, marketAddress, assetAddress] as const,
  transactionHistory: (pageSize: PageSize) =>
    ["TransactionHistory", pageSize == PageSize.Ten ? 10 : 50] as const,

  token: (tokenAddress: string) => ["Token", tokenAddress] as const,
  balanceOf: (chainId: number, accountAddress: string, tokenAddress: string) =>
    ["BalanceOf", chainId, accountAddress, tokenAddress] as const,
  balancesOf: (chainId: number, accountAddress: string, tokenAddresses: string[]) =>
    ["BalancesOf", chainId, accountAddress, tokenAddresses] as const,
};
