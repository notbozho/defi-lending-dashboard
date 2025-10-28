import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import UserDisplay from "@/components/UserDisplay";

export default function WalletStatus() {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  if (openConnectModal) {
    return (
      <Button variant={"default"} onClick={openConnectModal}>
        Connect Wallet
      </Button>
    );
  }

  if (openAccountModal) {
    return <UserDisplay onClick={openAccountModal} />;
  }

  return <Skeleton className="h-9 w-32 rounded-md" />;
}
