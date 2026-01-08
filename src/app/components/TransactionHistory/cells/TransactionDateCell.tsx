import Timestamp from "@/components/shared/Timestamp";
import { Transaction } from "@/lib/aave/types/Transaction";

export default function TransactionDateCell({ tx }: { tx: Transaction }) {
  return <Timestamp value={tx.timestamp} relative className="text-foreground" />;
}
