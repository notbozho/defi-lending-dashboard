"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { MarketAsset } from "@/lib/aave";

interface ReserveStore {
  asset: MarketAsset | null;
  loading: boolean;
  error: string | null;
  setReserveData: (_payload: {
    asset?: MarketAsset | null;
    loading?: boolean;
    error?: string | null;
  }) => void;
}

export const useReserveStore = create<ReserveStore>()(
  persist(
    (set) => ({
      asset: null,
      loading: true,
      error: null,

      setReserveData: ({ asset, loading, error }) =>
        set((state) => ({
          asset: asset ?? state.asset,
          loading: loading ?? state.loading,
          error: error ?? state.error,
        })),
    }),
    {
      name: "reserve-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
