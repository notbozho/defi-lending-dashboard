export type Transaction = {
  id: string;
  type: "supply" | "withdraw" | "borrow" | "repay" | "collateral" | "liquidation";

  timestamp: Date;

  marketName?: string;
  chainId?: number;
  tokenSymbol?: string;

  amount?: string;
  amountUsd?: string;

  direction?: "in" | "out";

  explorerUrl: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
};
