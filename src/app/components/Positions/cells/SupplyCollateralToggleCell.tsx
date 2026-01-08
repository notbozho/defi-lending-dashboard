import { MarketUserReserveSupplyPosition } from "@aave/react";

import { Switch } from "@/components/ui/switch";

type Props = {
  position: MarketUserReserveSupplyPosition;
  onToggle: (address: string, enabled: boolean) => void;
};

export function SupplyCollateralToggleCell({ position, onToggle }: Props) {
  return (
    <Switch
      disabled={!position.canBeCollateral}
      checked={position.isCollateral}
      onCheckedChange={(checked) => onToggle(position.currency.address, checked)}
      data-no-row-click
      className="cursor-pointer"
    />
  );
}
