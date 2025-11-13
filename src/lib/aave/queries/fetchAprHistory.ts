import { BorrowAPYHistoryQuery, chainId, evmAddress, SupplyAPYHistoryQuery } from "@aave/react";

import { client } from "@/lib/aave";
import { TimeWindowMap } from "@/lib/aave/constants";
import { transformAssetHistoryData } from "@/lib/aave/transformers/assetHistoryTransformer";

export type AprHistoryFetchParams = {
  cid: number;
  marketAddress: string;
  assetAddress: string;
  period: keyof typeof TimeWindowMap;
  borrow?: boolean;
};

export async function fetchAPRHistory({
  cid,
  marketAddress,
  assetAddress,
  period,
  borrow = false,
}: AprHistoryFetchParams) {
  const res = await client.query(borrow ? BorrowAPYHistoryQuery : SupplyAPYHistoryQuery, {
    request: {
      chainId: chainId(cid),
      market: evmAddress(marketAddress),
      underlyingToken: evmAddress(assetAddress),
      window: TimeWindowMap[period],
    },
  });

  if (res.isErr()) {
    throw res.error;
  }

  const data = res.value;

  return transformAssetHistoryData(data);
}
