"use client";

import { useAccount, useChainId, useEnsAvatar, useEnsName } from "wagmi";

export function useEns(address?: `0x{string}`) {
  const account = useAccount();
  const chainId = useChainId();
  const resolvedAddress = address ?? account.address;

  const ensName = useEnsName({ address: resolvedAddress, chainId });
  const ensAvatar = useEnsAvatar({ name: ensName.data ?? undefined, chainId });

  return {
    address: resolvedAddress,
    ensName: ensName.data ?? null,
    ensAvatar: ensAvatar.data ?? null,
    isLoading: ensName.isLoading || ensAvatar.isLoading,
  };
}
