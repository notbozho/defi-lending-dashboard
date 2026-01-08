import { useEffect } from "react";
import { PageSize } from "@aave/react";
import { useAccount, useChainId, useTransaction } from "wagmi";
import { useShallow } from "zustand/shallow";

import { MARKET_BY_CHAIN_ID } from "@/config";
import { useMarket } from "@/hooks";
import { useTransactionHistory } from "@/hooks/aave/useTransactionHistory";
import { useUserBorrows } from "@/hooks/aave/useUserBorrows";
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
    accountAddress: "0xD431E6bBC9395d3264Ac646c7cc32De906eA7EDF", // TODO: MOCK DATA, use above line later,
  });

  const {
    data: borrows,
    isLoading: userBorrowsLoading,
    error: userBorrowsError,
  } = useUserBorrows({
    cid,
    marketAddress,
    accountAddress: "0xD431E6bBC9395d3264Ac646c7cc32De906eA7EDF",
  });

  const {
    data: supplies,
    isLoading: userSuppliesLoading,
    error: userSuppliesError,
  } = useUserSupplies({
    cid,
    marketAddress,
    accountAddress: "0xD431E6bBC9395d3264Ac646c7cc32De906eA7EDF",
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
  ]);

  return useMarketStore();
}
