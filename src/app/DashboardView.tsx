"use client";

import { useRouter } from "next/navigation";
import BigNumber from "bignumber.js";
import { WalletIcon } from "lucide-react";
import { Address } from "viem";
import { useAccount } from "wagmi";

import MyWalletCard from "@/app/components/MyWalletCard";
import { Button, Card, CardContent, CardHeader } from "@/components";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useMarketContext } from "@/context/MarketContext";
import { useBalancesOf } from "@/hooks/web3/useBalancesOf";
import { ZERO_ADDRESS } from "@/utils/constants";

export default function DashboardView() {
  const router = useRouter();
  const { isLoading, error, supplyReserves } = useMarketContext();
  const { isConnected, address } = useAccount();

  const MOCK_BALANCES: Record<string, BigNumber> = {
    "0x111111111117dC0aa78b770fA6A738034120C302": new BigNumber("500000000000000000000"),
    "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf": new BigNumber("250000"),
    "0xdAC17F958D2ee523a2206206994597C13D831ec7": new BigNumber("150000000"),
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": new BigNumber("100000000"),
  };

  const { data: walletBalances } = useBalancesOf({
    accountAddress: address ?? ZERO_ADDRESS,
    tokenAddresses: Object.keys(supplyReserves) as Address[],
  });

  return (
    <main className="min-h-screen w-full py-6">
      <div className="container mx-auto flex gap-x-6 px-2">
        <Card className="basis-9/12">
          <CardHeader>
            <h2 className="text-xl font-medium">My Positions</h2>
          </CardHeader>
          <CardContent>
            <Empty>
              <EmptyMedia variant="icon">
                <WalletIcon className="text-muted-foreground h-12 w-12" />
              </EmptyMedia>

              <EmptyTitle>No supply or borrow positions yet</EmptyTitle>
              <EmptyDescription>Your pool positions will appear here</EmptyDescription>
              <EmptyContent>
                <Button
                  onClick={() => {
                    router.push("/reserves");
                  }}
                >
                  Browse
                </Button>
              </EmptyContent>
            </Empty>
          </CardContent>
        </Card>
        <MyWalletCard balances={MOCK_BALANCES} reserves={supplyReserves} loading={isLoading} />
      </div>
    </main>
  );
}
