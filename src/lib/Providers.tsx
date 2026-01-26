"use client";

import { ThemeProvider } from "next-themes";
import { AaveProvider } from "@aave/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MotionConfig } from "motion/react";
import { WagmiProvider } from "wagmi";

import { Toaster } from "@/components/ui/sonner";
import { Web3Provider } from "@/context/Web3Context";
import { aaveClient } from "@/lib/aave/aaveClient";
import { queryClient } from "@/lib/queryClient";
import { ReducedMotionListener } from "@/stores/useUiStore";

import { config } from "./web3/wagmi";

export default function Providers({ children }: { children: React.ReactNode }) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize={"compact"}>
          <AaveProvider client={aaveClient}>
            <Web3Provider>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem={false}
                disableTransitionOnChange
              >
                <MotionConfig reducedMotion="user">
                  <ReducedMotionListener />
                  {children}

                  <Toaster position="top-center" />
                </MotionConfig>
              </ThemeProvider>
            </Web3Provider>
          </AaveProvider>
        </RainbowKitProvider>
        {isDev && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
