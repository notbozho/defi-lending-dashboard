/* eslint-disable no-unused-vars */
"use client";

import { Market } from "@aave/react";
import { create } from "zustand";

import { type MarketReserve, transformMarketReserves } from "@/lib/aave";

interface MarketData {
  currentMarket: Market | null;
  supplyReserves: Record<string, MarketReserve>;
  borrowReserves: Record<string, MarketReserve>;
}

interface MarketActions {
  setMarketData: (market: Market) => void;
  clearMarket: () => void;
  getCurrentMarketAddress: () => string | null;
}

export const useMarketStore = create<MarketData & MarketActions>()((set, get) => ({
  currentMarket: null,
  supplyReserves: {},
  borrowReserves: {},

  sorting: [],
  columnFilters: [],

  setMarketData: (market) => {
    const supply = transformMarketReserves(market.supplyReserves ?? []).sort(
      (a, b) => b.totalSuppliedUsd - a.totalSuppliedUsd
    );
    const borrow = transformMarketReserves(market.borrowReserves ?? []).sort(
      (a, b) => b.totalSuppliedUsd - a.totalSuppliedUsd
    );

    set({
      currentMarket: market,
      supplyReserves: Object.fromEntries(supply.map((r) => [r.underlyingAddress, r])),
      borrowReserves: Object.fromEntries(borrow.map((r) => [r.underlyingAddress, r])),
    });
  },

  clearMarket: () =>
    set({
      currentMarket: null,
      supplyReserves: {},
      borrowReserves: {},
    }),

  getCurrentMarketAddress: () => get().currentMarket?.address ?? null,
}));
