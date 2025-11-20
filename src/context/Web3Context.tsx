"use client";

import { createContext, ReactNode, useContext } from "react";
import type { PublicClient } from "viem";
import { useAccount, useChainId, usePublicClient } from "wagmi";

interface Web3ContextValue {
  chainId: number;
  isLoading: boolean;
  publicClient: PublicClient;
}

const Web3Context = createContext<Web3ContextValue | null>(null);

export function Web3Provider({ children }: { children: ReactNode }) {
  const { chainId: accountChainId, isConnecting, isReconnecting } = useAccount();

  const fallbackChainId = useChainId();

  const chainId = accountChainId ?? fallbackChainId;

  const publicClient = usePublicClient({
    chainId: chainId,
  }) as PublicClient;

  const isLoading = isConnecting || isReconnecting;

  const value: Web3ContextValue = {
    chainId: chainId,
    isLoading,
    publicClient,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export function useWeb3Context() {
  const ctx = useContext(Web3Context);
  if (!ctx) throw new Error("useWeb3Context must be used inside <Web3Provider>");
  return ctx;
}
