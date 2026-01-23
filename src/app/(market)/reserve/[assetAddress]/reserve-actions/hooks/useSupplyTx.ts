import { bigDecimal, chainId, evmAddress, useSupply } from "@aave/react";
import { useSendTransaction } from "@aave/react/viem";
import { useMutation } from "@tanstack/react-query";
import { useAccount, useWalletClient } from "wagmi";

import type { MarketReserve } from "@/lib/aave/types/MarketReserve";

export function useSupplyTx(reserve: MarketReserve) {
  const account = useAccount();
  const { data: wallet } = useWalletClient();

  const [supply] = useSupply();
  const [sendTransaction] = useSendTransaction(wallet);

  const mutation = useMutation({
    mutationKey: ["aave", "supply", reserve.chainId, reserve.underlyingAddress, account.address],
    mutationFn: async (amountHuman: string) => {
      if (!account.address) throw new Error("Wallet not connected");

      const planResult = await supply({
        market: evmAddress(reserve.marketAddress),
        amount: {
          erc20: {
            currency: evmAddress(reserve.underlyingAddress),
            value: bigDecimal(amountHuman),
          },
        },
        sender: evmAddress(account.address),
        chainId: chainId(reserve.chainId),
      });

      if (planResult.isErr()) {
        throw new Error(planResult.error.message);
      }

      const plan = planResult.value;

      switch (plan.__typename) {
        case "TransactionRequest":
          return sendTransaction(plan);
        case "ApprovalRequired":
          return sendTransaction(plan.approval).andThen(() =>
            sendTransaction(plan.originalTransaction)
          );
        case "InsufficientBalanceError":
          throw new Error(
            `Insufficient balance. Need: ${plan.required.value}, Have: ${plan.available.value}`
          );
        default:
          throw new Error("Unexpected plan type");
      }
    },
  });

  return {
    supply: (amountHuman: string) => mutation.mutateAsync(amountHuman),
    isPending: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error : undefined,
  };
}
