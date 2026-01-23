import { bigDecimal, chainId, evmAddress, useBorrow } from "@aave/react";
import { useSendTransaction } from "@aave/react/viem";
import { useMutation } from "@tanstack/react-query";
import { useAccount, useWalletClient } from "wagmi";

import type { MarketReserve } from "@/lib/aave/types/MarketReserve";

export function useBorrowTx(reserve: MarketReserve) {
  const account = useAccount();
  const { data: wallet } = useWalletClient();

  const [borrow] = useBorrow();
  const [sendTransaction] = useSendTransaction(wallet);

  const mutation = useMutation({
    mutationKey: ["aave", "borrow", reserve.chainId, reserve.underlyingAddress, account.address],
    mutationFn: async (amountHuman: string) => {
      if (!account.address) throw new Error("Wallet not connected");

      const planResult = await borrow({
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
      if (plan.__typename === "TransactionRequest") {
        return sendTransaction(plan);
      }

      throw new Error("Unexpected plan type");
    },
  });

  return {
    borrow: (amountHuman: string) => mutation.mutateAsync(amountHuman),
    isPending: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error : undefined,
  };
}
