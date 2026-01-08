import { Transaction } from "@/lib/aave/types/Transaction";

export function getTransactionAmount(tx: Transaction): number {
  const sign = tx.type === "withdraw" || tx.type === "borrow" ? -1 : 1;

  return sign * Number(tx.amount);
}

export function getTransactionAsset(tx: Transaction) {
  return tx.raw.reserve.underlyingToken;
}
