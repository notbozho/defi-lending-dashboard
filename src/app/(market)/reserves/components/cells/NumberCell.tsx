import { FormattedNumber } from "@/components";

export default function NumberCell({ value }: { value: number | string | BigNumber | undefined }) {
  return <FormattedNumber value={value} percent className="text-sm" />;
}
