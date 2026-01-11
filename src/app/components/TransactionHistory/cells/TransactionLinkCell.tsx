import { TbArrowUpRight } from "react-icons/tb";

import { Button } from "@/components";
import { Transaction } from "@/lib/aave/types/Transaction";
import { truncateMiddle } from "@/utils/truncate";

export default function TransactionLinkCell({
  tx,
  onOpen,
}: {
  tx: Transaction;
  onOpen: (_url: string) => void;
}) {
  return (
    <Button
      variant="ghost"
      className="text-foreground font-normal"
      size="sm"
      onClick={() => onOpen(tx.explorerUrl)}
    >
      {truncateMiddle(tx.id)}
      <TbArrowUpRight />
    </Button>
  );
}
