import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";
import { Button } from "./ui/button";
import { useAccount } from "wagmi";
import { Skeleton } from "./ui/skeleton";

export function Web3Info() {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  const { address } = useAccount();

  if (openConnectModal) {
    return (
      <Button variant={"default"} onClick={openConnectModal}>
        Connect Wallet
      </Button>
    );
  }

  if (openAccountModal && address) {
    return (
      <Button onClick={openAccountModal} variant={"ghost"}>
        {address}
      </Button>
    );
  }

  return <Skeleton className="w-10" />;
}
