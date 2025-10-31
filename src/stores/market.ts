/* eslint-disable no-unused-vars */
"use client";

import { Market, Reserve } from "@aave/react";
import type { ColumnFiltersState, OnChangeFn, SortingState } from "@tanstack/react-table";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { MarketAsset } from "@/lib/aave";

// Types for clarity
interface MarketData {
  assets: MarketAsset[];
  market: Market | null;
  totalBorrows: number;
  loading: boolean;
  error: string | null;
}

interface MarketTableState {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
}

interface MarketStore extends MarketData, MarketTableState {
  setSorting: OnChangeFn<SortingState>;
  setColumnFilters: OnChangeFn<ColumnFiltersState>;

  setMarketData: (payload: {
    assets?: MarketAsset[];
    market?: Market | null;
    loading?: boolean;
    error?: string | null;
  }) => void;
}

export const useMarketStore = create<MarketStore>()(
  persist(
    (set) => ({
      assets: [],
      market: null,
      totalBorrows: 0,
      loading: false,
      error: null,

      sorting: [{ id: "totalSupplied", desc: true }],
      columnFilters: [],

      setSorting: (updater) =>
        set((state) => ({
          sorting: typeof updater === "function" ? updater(state.sorting) : updater,
        })),

      setColumnFilters: (updater) =>
        set((state) => ({
          columnFilters: typeof updater === "function" ? updater(state.columnFilters) : updater,
        })),

      setMarketData: ({ assets, market, loading, error }) =>
        set((state) => {
          let totalBorrows = 0;
          if (market && market.borrowReserves) {
            totalBorrows = market.borrowReserves.reduce((acc: number, reserve: Reserve) => {
              const value = reserve.borrowInfo?.total.usd ?? 0;
              return acc + Number(value);
            }, 0);
          }
          return {
            assets: assets ?? state.assets,
            market: market ?? state.market,
            loading: loading ?? state.loading,
            error: error ?? state.error,
            totalBorrows,
          };
        }),
    }),
    {
      name: "market-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        sorting: state.sorting,
      }),
    }
  )
);
