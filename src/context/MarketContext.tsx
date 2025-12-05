"use client";

import { createContext, ReactNode, useContext } from "react";
import {
  Market,
  MarketUserReserveBorrowPosition,
  MarketUserReserveSupplyPosition,
} from "@aave/react";
import { useAccount, useChainId } from "wagmi";
import { useShallow } from "zustand/shallow";

import { MARKET_BY_CHAIN_ID } from "@/config";
import { useMarket } from "@/hooks";
import { useUserBorrows } from "@/hooks/aave/useUserBorrows";
import { useUserSupplies } from "@/hooks/aave/useUserSupplies";
import { MarketReserve } from "@/lib/aave";
import { useMarketStore } from "@/stores/useMarketStore";

interface MarketContextValue {
  isLoading: boolean;
  error: unknown;
  market: Market | null;
  supplyReserves: Record<string, MarketReserve>;
  borrowReserves: Record<string, MarketReserve>;
  userSupplyPositions: MarketUserReserveSupplyPosition[];
  userBorrowPositions: MarketUserReserveBorrowPosition[];
}

const MarketContext = createContext<MarketContextValue | null>(null);

export function MarketProvider({ children }: { children: ReactNode }) {
  const cid = useChainId();
  const marketAddress = MARKET_BY_CHAIN_ID(cid)?.addresses.LENDING_POOL ?? "";
  const { address } = useAccount();

  const { isLoading, error } = useMarket({
    cid,
    marketAddress,
    accountAddress: "0xD431E6bBC9395d3264Ac646c7cc32De906eA7EDF", // TODO: MOCK DATA
  });

  const {
    data: userBorrowPositions,
    isLoading: isUserBorrowsLoading,
    error: userBorrowsError,
  } = useUserBorrows({
    cid,
    marketAddress,
    accountAddress: "0xD431E6bBC9395d3264Ac646c7cc32De906eA7EDF", // TODO: MOCK DATA
  });

  const {
    data: userSupplyPositions,
    isLoading: isUserSuppliesLoading,
    error: userSuppliesError,
  } = useUserSupplies({
    cid,
    marketAddress,
    accountAddress: "0xD431E6bBC9395d3264Ac646c7cc32De906eA7EDF", // TODO: MOCK DATA
  });

  const { currentMarket, supplyReserves, borrowReserves } = useMarketStore(
    useShallow((s) => ({
      currentMarket: s.currentMarket,
      supplyReserves: s.supplyReserves,
      borrowReserves: s.borrowReserves,
    }))
  );

  const value: MarketContextValue = {
    isLoading,
    error,
    market: currentMarket,
    supplyReserves,
    borrowReserves,
    userSupplyPositions: userSupplyPositions ?? [],
    userBorrowPositions: userBorrowPositions ?? [],
  };

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
}

export function useMarketContext() {
  const ctx = useContext(MarketContext);
  if (!ctx) throw new Error("useMarketContext must be used inside <MarketProvider>");
  return ctx;
}
