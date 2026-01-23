import type { MarketReserve } from "@/lib/aave/types/MarketReserve";

export function useMaxBorrow(reserve: MarketReserve): string {
  return String(reserve.borrowInfo.userMaxBorrowable?.amount.value ?? "0");
}
