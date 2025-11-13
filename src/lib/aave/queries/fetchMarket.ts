import { market } from "@aave/client/actions";
import { chainId, evmAddress, Market } from "@aave/react";

import { client } from "@/lib/aave";

export type MarketFetchParams = {
  cid: number;
  marketAddress: string;
  account?: string;
};

export async function fetchMarket({
  cid,
  marketAddress,
  account,
}: MarketFetchParams): Promise<Market | null> {
  const res = await market(client, {
    address: evmAddress(marketAddress),
    chainId: chainId(cid),
    user: account ? evmAddress(account) : undefined,
  });

  if (res.isErr()) {
    throw res.error;
  }

  return res.value;
}
