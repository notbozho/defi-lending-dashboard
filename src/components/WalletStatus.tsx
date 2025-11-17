import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import UserDisplay from "@/components/UserDisplay";
import { useWeb3Context } from "@/context/Web3Context";

export default function WalletStatus({ className }: { className?: string }) {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { isLoading: isWeb3Loading } = useWeb3Context();

  if (isWeb3Loading) {
    return <Skeleton className="h-9 w-32 rounded-md" />;
  }

  if (openConnectModal) {
    return (
      <Button variant={"default"} onClick={openConnectModal} className={className}>
        Connect Wallet
      </Button>
    );
  }

  if (openAccountModal) {
    return <UserDisplay onClick={openAccountModal} className={className} />;
  }

  return <Skeleton className="h-9 w-32 rounded-md" />;
}
