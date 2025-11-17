"use client";

import { AaveProvider } from "@aave/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { WagmiProvider } from "wagmi";

import { Toaster } from "@/components/ui/sonner";
import { Web3Provider } from "@/context/Web3Context";
import { client as aaveClient } from "@/lib/aave/client";

import { config } from "./web3/wagmi";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10_000,
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize={"compact"}>
          <AaveProvider client={aaveClient}>
            <Web3Provider>
              {children}
              <Toaster />
            </Web3Provider>
          </AaveProvider>
        </RainbowKitProvider>
        {isDev && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
