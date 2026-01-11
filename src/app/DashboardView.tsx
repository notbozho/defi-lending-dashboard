"use client";

import { useMemo } from "react";
import { FaCoins, FaMoneyCheck } from "react-icons/fa6";
import { MarketUserReserveBorrowPosition, MarketUserReserveSupplyPosition } from "@aave/react";
import BigNumber from "bignumber.js";
import { motion } from "motion/react";
import { Address } from "viem";
import { useAccount } from "wagmi";

import HealthFactorCard from "@/app/components/HealthFactorGauge";
import MyWalletCard from "@/app/components/MyWalletCard";
import PositionsTable from "@/app/components/Positions/PositionsTable";
import { TransactionHistoryTable } from "@/app/components/TransactionHistory/TransactionHistoryTable";
import { getTransactionHistoryColumns } from "@/app/lib/getTransactionHistoryColumns";
import { getUserSuppliesColumns } from "@/app/lib/getUserSuppliesColumns";
import { userBorrowColumns } from "@/app/lib/userBorrowsColumns";
import { useLoadMarketData } from "@/hooks/aave/useLoadMarketData";
import { useTransactionHistory } from "@/hooks/aave/useTransactionHistory";
import { useBalancesOf } from "@/hooks/web3/useBalancesOf";
import { ZERO_ADDRESS } from "@/utils/constants";

export default function DashboardView() {
  const { isLoading, market, supplyReserves, userSupplyPositions, userBorrowPositions } =
    useLoadMarketData();

  const { address } = useAccount();

  const {
    transactions,
    loading: transactionHistoryLoading,
    loadedInitialPage,
  } = useTransactionHistory({
    // accountAddress: address ?? ZERO_ADDRESS,
    accountAddress: "0xfed5f381870ccf1539a42b473893c7683242914b",
    // accountAddress: "0x24D5C7337b70f3702bf0e770401822C9D95bEAe6",
  });

  const isTransactionHistoryLoading = transactionHistoryLoading && !loadedInitialPage;

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

  const userSuppliesColumns = useMemo(
    () =>
      getUserSuppliesColumns((address: string, enabled: boolean) => {
        console.log("Toggle collateral for", address, "to", enabled);
      }),
    []
  );

  const transactionHistoryColumns = useMemo(
    () =>
      getTransactionHistoryColumns((url: string) => {
        window.open(url, "_blank");
      }),
    []
  );

  return (
    <main className="min-h-screen w-full py-6">
      <div className="container mx-auto flex gap-x-6 px-2">
        <div className="flex basis-9/12 flex-col gap-y-6">
          <PositionsTable<MarketUserReserveSupplyPosition>
            columns={userSuppliesColumns}
            loading={isLoading}
            positions={userSupplyPositions}
            title="Supply Positions"
            icon={<FaCoins />}
          />

          <PositionsTable<MarketUserReserveBorrowPosition>
            columns={userBorrowColumns}
            loading={isLoading}
            positions={userBorrowPositions}
            title="Borrow Positions"
            icon={<FaMoneyCheck />}
          />
          <TransactionHistoryTable
            transactions={transactions}
            columns={transactionHistoryColumns}
            loading={isTransactionHistoryLoading}
          />
        </div>
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="flex basis-3/12 flex-col gap-y-6"
        >
          <MyWalletCard balances={MOCK_BALANCES} reserves={supplyReserves} loading={isLoading} />
          <HealthFactorCard value={Number(market?.userState?.healthFactor) || 0} />
        </motion.div>
      </div>
    </main>
  );
}
