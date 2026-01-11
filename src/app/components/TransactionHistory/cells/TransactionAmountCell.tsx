import { TbArrowNarrowRight } from "react-icons/tb";
import { valueToBigNumber } from "@aave/math-utils";

import {
  FormattedNumber,
  TokenDisplay,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components";
import {
  getTransactionAmount,
  getTransactionAsset,
} from "@/lib/aave/helpers/transactionHistoryHelper";
import { Transaction } from "@/lib/aave/types/Transaction";

export default function TransactionAmountCell({ tx }: { tx: Transaction }) {
  if (tx.legs && tx.type === "liquidation") {
    const [outLeg, inLeg] = tx.legs;

    const symbol = outLeg.direction === "out" ? -1 : 1;
    const outAsset = getTransactionAsset(outLeg);
    const inAsset = getTransactionAsset(inLeg);

    return (
      <div className="flex items-center gap-2 font-medium">
        <div className="flex items-center gap-2">
          <TokenDisplay
            imageUrl={outAsset.imageUrl}
            name={outAsset.name}
            symbol={outAsset.symbol}
            loading={!outAsset.symbol}
            variant="icon"
          />
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <div className="">
                <FormattedNumber
                  value={symbol * Number(outLeg.amount)}
                  symbol={outAsset.symbol}
                  className="text-sm text-red-500"
                  compact
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <span className="font-medium">{Number(outLeg.amount).toLocaleString()}</span>{" "}
              {outAsset.symbol}
            </TooltipContent>
          </Tooltip>
        </div>

        <TbArrowNarrowRight className="text-muted-foreground" />

        <div className="flex items-center gap-2">
          <TokenDisplay
            imageUrl={inAsset.imageUrl}
            name={inAsset.name}
            symbol={inAsset.symbol}
            loading={!inAsset.symbol}
            variant="icon"
          />
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <div className="">
                <FormattedNumber
                  value={Number(inLeg.amount)}
                  symbol={inAsset.symbol}
                  className="text-sm text-green-500"
                  compact
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <span className="font-medium">{Number(inLeg.amount).toLocaleString()}</span>{" "}
              {inAsset.symbol}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    );
  }

  const asset = getTransactionAsset(tx.raw.reserve);

  if (tx.type === "collateral") {
    return (
      <div className="flex items-center gap-2">
        <TokenDisplay
          imageUrl={asset.imageUrl}
          name={asset.name}
          symbol={asset.symbol}
          loading={!asset.symbol}
          variant="icon"
        />
        <span className="font-medium">
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
    <div className="flex items-center gap-2">
      <TokenDisplay
        imageUrl={asset.imageUrl}
        name={asset.name}
        symbol={asset.symbol}
        loading={!asset.symbol}
        variant="icon"
      />
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <div className="">
            <FormattedNumber
              value={valueToBigNumber(amount)}
              symbol={asset.symbol}
              compact
              className="text-sm"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span className="font-medium">{Number(tx.amount).toLocaleString()}</span> {asset.symbol}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
