"use client";

import { createContext, ReactNode, useContext } from "react";
import { useAccount } from "wagmi";

interface Web3ContextValue {
  chainId: number;
  isLoading: boolean;
}

const Web3Context = createContext<Web3ContextValue | null>(null);

export function Web3Provider({ children }: { children: ReactNode }) {
  const { chainId, isConnecting, isReconnecting } = useAccount();

  const isLoading = isConnecting || isReconnecting;

  const value: Web3ContextValue = {
    chainId: chainId ?? 0,
    isLoading,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export function useWeb3Context() {
  const ctx = useContext(Web3Context);
  if (!ctx) throw new Error("useWeb3Context must be used inside <Web3Provider>");
  return ctx;
}
