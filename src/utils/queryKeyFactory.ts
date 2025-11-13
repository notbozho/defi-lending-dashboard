export const queryKeyFactory = {
  market: (cid: number, marketAddress: string) => ["Market", cid, marketAddress] as const,
  user: (userAddress: string) => ["User", userAddress] as const,
  reserve: (cid: number, marketAddress: string, assetAddress: string) =>
    ["Reserve", cid, marketAddress, assetAddress] as const,
};
