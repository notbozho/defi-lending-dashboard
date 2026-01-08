import { TokenDisplay } from "@/components/shared/TokenDisplay";
import { HasCurrency } from "@/lib/aave/types";

type AssetCellProps<T extends HasCurrency> = {
  position: T;
};

export function AssetCell<T extends HasCurrency>({ position }: AssetCellProps<T>) {
  const asset = position.currency;

  return (
    <TokenDisplay size="md" name={asset.name} symbol={asset.symbol} imageUrl={asset.imageUrl} />
  );
}
