import { TimeWindowMap } from "@/lib/aave/constants";
import { useAPRHistoryQuery } from "@/lib/aave/queries/aprHistory/useAprHistoryQuery";

type APRHistoryParams = {
  cid: number;
  marketAddress: string;
  assetAddress: string;
  period: keyof typeof TimeWindowMap;
  borrow?: boolean;
};

export function useAPRHistory({
  cid,
  marketAddress,
  assetAddress,
  period = "1W",
  borrow = false,
}: APRHistoryParams) {
  const {
    data: history,
    error,
    isLoading,
  } = useAPRHistoryQuery({
    cid,
    marketAddress,
    assetAddress,
    period,
    borrow,
  });

  const loading = isLoading || !history;

  return {
    history,
    error,
    loading,
  };
}
