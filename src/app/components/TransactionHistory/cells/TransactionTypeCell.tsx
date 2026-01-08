import { Badge } from "@/components/ui/badge";
import { Transaction } from "@/lib/aave/types/Transaction";

export default function TransactionTypeCell({ tx }: { tx: Transaction }) {
  return (
    <Badge variant="muted" className="capitalize">
      {tx.type}
    </Badge>
  );
}
