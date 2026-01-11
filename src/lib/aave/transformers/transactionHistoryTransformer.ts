import { PaginatedUserTransactionHistoryResult } from "@aave/react";

import { Transaction } from "@/lib/aave/types/Transaction";

export function transformTransaction(
  raw: PaginatedUserTransactionHistoryResult["items"][number]
): Transaction {
  switch (raw.__typename) {
    case "UserSupplyTransaction":
      return {
        id: raw.txHash,
        type: "supply",
        timestamp: new Date(raw.timestamp),
        marketName: raw.reserve.market.name,
        chainId: raw.reserve.market.chain.chainId,
        tokenSymbol: raw.reserve.underlyingToken.symbol,
        amount: raw.amount.amount.value.toString(),
        amountUsd: raw.amount.usd.toString(),
        direction: "in",
        explorerUrl: raw.blockExplorerUrl,
        raw,
      };

    case "UserWithdrawTransaction":
      return {
        id: raw.txHash,
        type: "withdraw",
        timestamp: new Date(raw.timestamp),
        marketName: raw.reserve.market.name,
        tokenSymbol: raw.reserve.underlyingToken.symbol,
        amount: raw.amount.amount.value.toString(),
        amountUsd: raw.amount.usd.toString(),
        direction: "out",
        explorerUrl: raw.blockExplorerUrl,
        raw,
      };

    case "UserBorrowTransaction":
      return {
        id: raw.txHash,
        type: "borrow",
        timestamp: new Date(raw.timestamp),
        marketName: raw.reserve.market.name,
        tokenSymbol: raw.reserve.underlyingToken.symbol,
        amount: raw.amount.amount.value.toString(),
        amountUsd: raw.amount.usd.toString(),
        direction: "out",
        explorerUrl: raw.blockExplorerUrl,
        raw,
      };

    case "UserRepayTransaction":
      return {
        id: raw.txHash,
        type: "repay",
        timestamp: new Date(raw.timestamp),
        marketName: raw.reserve.market.name,
        tokenSymbol: raw.reserve.underlyingToken.symbol,
        amount: raw.amount.amount.value.toString(),
        amountUsd: raw.amount.usd.toString(),
        direction: "in",
        explorerUrl: raw.blockExplorerUrl,
        raw,
      };

    case "UserUsageAsCollateralTransaction":
      return {
        id: raw.txHash,
        type: "collateral",
        timestamp: new Date(raw.timestamp),
        marketName: raw.reserve.market.name,
        tokenSymbol: raw.reserve.underlyingToken.symbol,
        explorerUrl: raw.blockExplorerUrl,
        raw,
      };

    case "UserLiquidationCallTransaction":
      return {
        id: raw.txHash,
        type: "liquidation",
        timestamp: new Date(raw.timestamp),
        marketName: raw.collateral.reserve.market.name,
        chainId: raw.collateral.reserve.market.chain.chainId,
        legs: [
          {
            underlyingToken: raw.debtRepaid.reserve.underlyingToken,
            amount: raw.debtRepaid.amount.amount.value,
            amountUsd: raw.debtRepaid.amount.usd,
            direction: "out",
          },
          {
            underlyingToken: raw.collateral.reserve.underlyingToken,
            amount: String(raw.collateral.amount?.amount.value),
            amountUsd: String(raw.collateral.amount?.usd),
            direction: "in",
          },
        ],
        explorerUrl: raw.blockExplorerUrl,
        raw,
      };

    default:
      const _exhaustive: never = raw;
      return _exhaustive;
  }
}

export function transformTransactions(
  raw: PaginatedUserTransactionHistoryResult["items"]
): Transaction[] {
  return raw.map(transformTransaction);
}
