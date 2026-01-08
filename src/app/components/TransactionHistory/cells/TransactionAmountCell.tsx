import Image from "next/image";
import { valueToBigNumber } from "@aave/math-utils";

import { FormattedNumber, Tooltip, TooltipContent, TooltipTrigger } from "@/components";
import {
  getTransactionAmount,
  getTransactionAsset,
} from "@/lib/aave/helpers/transactionHistoryHelper";
import { Transaction } from "@/lib/aave/types/Transaction";

export default function TransactionAmountCell({ tx }: { tx: Transaction }) {
  const asset = getTransactionAsset(tx);

  if (tx.type === "collateral") {
    return (
      <div className="flex items-center gap-2">
        <Image
          src={asset.imageUrl || ""}
          alt={asset.name}
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="text-sm font-medium">
          Collateralization{" "}
          <span className={tx.raw.enabled ? "text-green-500" : "text-red-500"}>
            {tx.raw.enabled ? "enabled" : "disabled"}
          </span>
        </span>
      </div>
    );
  }

  const amount = getTransactionAmount(tx);

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2">
          <Image
            src={asset.imageUrl || ""}
            alt={asset.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <FormattedNumber
            value={valueToBigNumber(amount)}
            symbol={asset.symbol}
            compact
            className="text-sm"
            // prefix={amount < 0 ? "-" : "+"}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {tx.amount} {asset.symbol}
      </TooltipContent>
    </Tooltip>
  );
}
