import { TbArrowUpRight } from "react-icons/tb";

import { Button } from "@/components";
import { Transaction } from "@/lib/aave/transformers/transactionHistoryTransformer";
import { truncateMiddle } from "@/utils/truncate";

export default function TransactionLinkCell({
  tx,
  onOpen,
}: {
  tx: Transaction;
  onOpen: (_url: string) => void;
}) {
  return (
    <Button variant="ghost" onClick={() => onOpen(tx.explorerUrl)}>
      {truncateMiddle(tx.id)}
      <TbArrowUpRight />
    </Button>
  );
}
