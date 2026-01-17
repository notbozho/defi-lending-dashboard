"use client";

import { ReactNode, useEffect, useRef } from "react";
import Image from "next/image";
import { useAaveChains } from "@aave/react";
import { toast } from "sonner";
import { useAccount, useChainId } from "wagmi";

import { NETWORK_BY_CHAIN_ID } from "@/config/networks";
import { NETWORK_LOGO_URL } from "@/utils/constants";

type Props = {
  children: ReactNode;
};

export function ChainChangeNotifier({ children }: Props) {
  const cid = useChainId();
  const account = useAccount();

  const prevChainIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!cid) return;
    if (!account || !account.isConnected) return;

    if (prevChainIdRef.current === null) {
      prevChainIdRef.current = cid;
      return;
    }

    if (prevChainIdRef.current === cid) return;

    const newNetwork = NETWORK_BY_CHAIN_ID[cid];
    if (!newNetwork) return;

    const networkName = newNetwork.name ?? `Chain ${cid}`;
    const networkIconUrl = NETWORK_LOGO_URL(newNetwork.key);

    console.log("Network changed to", networkName, cid, networkIconUrl);

    toast(`Connected to ${networkName} Network`, {
      icon: networkIconUrl ? (
        <Image
          src={networkIconUrl}
          alt="Network Change"
          width={64}
          height={64}
          //   className="size-6"
        />
      ) : undefined,
    });

    prevChainIdRef.current = cid;
  }, [cid, account]);

  return <>{children}</>;
}
