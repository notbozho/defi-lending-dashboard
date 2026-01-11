import { HasUnderlyingToken } from "@/lib/aave/types";
import { Transaction } from "@/lib/aave/types/Transaction";

export function getTransactionAmount(tx: Transaction): number {
  const sign = tx.direction === "out" ? -1 : 1;

  return sign * Number(tx.amount);
}

export function getTransactionAsset<T extends HasUnderlyingToken>(tx: T) {
  return tx.underlyingToken;
}
