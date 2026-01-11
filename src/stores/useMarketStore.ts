"use client";

import {
  Market,
  MarketUserReserveBorrowPosition,
  MarketUserReserveSupplyPosition,
} from "@aave/react";
import { create } from "zustand";

import { transformMarketReserves } from "@/lib/aave";
import { MarketReserve } from "@/lib/aave/types/MarketReserve";

interface MarketState {
  isLoading: boolean;
  error: unknown;

  market: Market | null;
  supplyReserves: Record<string, MarketReserve>;
  borrowReserves: Record<string, MarketReserve>;

  userSupplyPositions: MarketUserReserveSupplyPosition[];
  userBorrowPositions: MarketUserReserveBorrowPosition[];

  setLoading: (_loading: boolean) => void;
  setError: (_err: unknown) => void;

  setMarketData: (_market: Market) => void;
  setUserPositions: (
    _supplies: MarketUserReserveSupplyPosition[],
    _borrows: MarketUserReserveBorrowPosition[]
  ) => void;

  reset: () => void;
}

export const useMarketStore = create<MarketState>()((set) => ({
  isLoading: true,
  error: null,

  market: null,
  supplyReserves: {},
  borrowReserves: {},

  userSupplyPositions: [],
  userBorrowPositions: [],

  setLoading: (b) => set({ isLoading: b }),
  setError: (e) => set({ error: e }),

  setMarketData: (market) => {
    const supply = transformMarketReserves(market.supplyReserves ?? []).sort(
      (a, b) => b.totalSuppliedUsd - a.totalSuppliedUsd
    );

    const borrow = transformMarketReserves(market.borrowReserves ?? []).sort(
      (a, b) => b.totalSuppliedUsd - a.totalSuppliedUsd
    );

    set({
      market,
      supplyReserves: Object.fromEntries(supply.map((r) => [r.underlyingAddress, r])),
      borrowReserves: Object.fromEntries(borrow.map((r) => [r.underlyingAddress, r])),
    });
  },

  setUserPositions: (supplies, borrows) =>
    set({
      userSupplyPositions: supplies ?? [],
      userBorrowPositions: borrows ?? [],
    }),

  reset: () =>
    set({
      isLoading: false,
      error: null,
      market: null,
      supplyReserves: {},
      borrowReserves: {},
      userSupplyPositions: [],
      userBorrowPositions: [],
    }),
}));
