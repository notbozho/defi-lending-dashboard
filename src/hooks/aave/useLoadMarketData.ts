import { useEffect } from "react";
import { useChainId } from "wagmi";
import { useShallow } from "zustand/shallow";

import { MARKET_BY_CHAIN_ID } from "@/config";
import { useMarket } from "@/hooks";
import { useUserMarket } from "@/hooks/aave/useUserMarket";
import { useUserSupplies } from "@/hooks/aave/useUserSupplies";
import { useMarketStore } from "@/stores/useMarketStore";

export function useLoadMarketData() {
  const cid = useChainId();
  //   const { address } = useAccount();
  //   const store = useMarketStore();

  const { setLoading, setError, setMarketData, setUserPositions } = useMarketStore(
    useShallow((s) => ({
      setLoading: s.setLoading,
      setError: s.setError,
      setMarketData: s.setMarketData,
      setUserPositions: s.setUserPositions,
    }))
  );

  const marketAddress = MARKET_BY_CHAIN_ID(cid)?.addresses.LENDING_POOL ?? "";

  const {
    data: market,
    isLoading: marketLoading,
    error: marketError,
  } = useMarket({
    cid,
    marketAddress,
    // accountAddress: address ?? "",
    accountAddress: "0x24D5C7337b70f3702bf0e770401822C9D95bEAe6", // TODO: MOCK DATA, use above line later,
  });

  const {
    data: borrows,
    isLoading: userBorrowsLoading,
    error: userBorrowsError,
  } = useUserMarket({
    cid,
    marketAddress,
    accountAddress: "0x24D5C7337b70f3702bf0e770401822C9D95bEAe6",
  });

  const {
    data: supplies,
    isLoading: userSuppliesLoading,
    error: userSuppliesError,
  } = useUserSupplies({
    cid,
    marketAddress,
    accountAddress: "0x24D5C7337b70f3702bf0e770401822C9D95bEAe6",
  });

  useEffect(() => {
    setLoading(marketLoading || userBorrowsLoading || userSuppliesLoading);

    if (marketError || userBorrowsError || userSuppliesError) {
      setError(marketError || userBorrowsError || userSuppliesError);
      return;
    }

    if (market) setMarketData(market);
    if (supplies || borrows) setUserPositions(supplies ?? [], borrows ?? []);
  }, [
    market,
    supplies,
    borrows,
    setUserPositions,
    marketError,
    userBorrowsError,
    userSuppliesError,
    setLoading,
    marketLoading,
    userBorrowsLoading,
    userSuppliesLoading,
    setMarketData,
    setError,
  ]);

  return useMarketStore();
}
