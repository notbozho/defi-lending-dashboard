"use client";

import type React from "react";
import { useEffect } from "react";
import { create } from "zustand";

type UiState = {
  userReducedMotion: boolean | null;
  systemPrefersReduced: boolean;
  watchModeBannerVisible: boolean;
  setUserReducedMotion: (_value: boolean) => void;
  setSystemPrefersReduced: (_value: boolean) => void;
  setWatchModeBannerVisible: (_value: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  userReducedMotion: null,
  systemPrefersReduced: false,
  watchModeBannerVisible: true,
  setUserReducedMotion: (value) => set({ userReducedMotion: value }),
  setSystemPrefersReduced: (value) => set({ systemPrefersReduced: value }),
  setWatchModeBannerVisible: (value) => set({ watchModeBannerVisible: value }),
}));

export function useReducedMotionPreference(): {
  reducedMotion: boolean;
  systemPrefersReduced: boolean;
  setReducedMotion: (_value: boolean) => void;
} {
  const userReducedMotion = useUiStore((state) => state.userReducedMotion);
  const systemPrefersReduced = useUiStore((state) => state.systemPrefersReduced);
  const setReducedMotion = useUiStore((state) => state.setUserReducedMotion);

  return {
    reducedMotion: userReducedMotion ?? systemPrefersReduced,
    systemPrefersReduced,
    setReducedMotion,
  };
}

export function ReducedMotionListener(): React.JSX.Element | null {
  const setSystemPrefersReduced = useUiStore((state) => state.setSystemPrefersReduced);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = () => {
      setSystemPrefersReduced(mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [setSystemPrefersReduced]);

  return null;
}
