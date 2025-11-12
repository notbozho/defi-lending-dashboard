"use client";

import { useChainId } from "wagmi";

import { MARKET_BY_CHAIN_ID } from "@/config";
import { MarketProvider } from "@/context/MarketContext";

export default function MarketLayout({ children }: { children: React.ReactNode }) {
  const cid = useChainId();
  const marketAddress = MARKET_BY_CHAIN_ID(cid)?.addresses.LENDING_POOL ?? "";

  return (
    <MarketProvider cid={cid} marketAddress={marketAddress}>
      {children}
    </MarketProvider>
  );
}
