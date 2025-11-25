"use client";

import { createContext, ReactNode, useContext } from "react";
import { Market } from "@aave/react";
import { useChainId } from "wagmi";
import { useShallow } from "zustand/shallow";

import { MARKET_BY_CHAIN_ID } from "@/config";
import { useMarket } from "@/hooks";
import { MarketReserve } from "@/lib/aave";
import { useMarketStore } from "@/stores/useMarketStore";

interface MarketContextValue {
  isLoading: boolean;
  error: unknown;
  market: Market | null;
  supplyReserves: Record<string, MarketReserve>;
  borrowReserves: Record<string, MarketReserve>;
}

const MarketContext = createContext<MarketContextValue | null>(null);

export function MarketProvider({ children }: { children: ReactNode }) {
  const cid = useChainId();
  const marketAddress = MARKET_BY_CHAIN_ID(cid)?.addresses.LENDING_POOL ?? "";

  const { isLoading, error } = useMarket({ cid, marketAddress });

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
  };

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
}

export function useMarketContext() {
  const ctx = useContext(MarketContext);
  if (!ctx) throw new Error("useMarketContext must be used inside <MarketProvider>");
  return ctx;
}
