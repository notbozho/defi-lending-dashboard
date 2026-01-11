import { ChevronDown } from "lucide-react";
import { useSwitchChain } from "wagmi";

import ChainIcon from "@/components/ChainIcon";
import { Button } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { NETWORK_BY_CHAIN_ID, SUPPORTED_NETWORKS } from "@/config";
import { useWeb3Context } from "@/context/Web3Context";

export default function ChainSelector() {
  const { chainId, isLoading: isWeb3Loading } = useWeb3Context();

  const currentChain = chainId ? NETWORK_BY_CHAIN_ID[chainId] : null;

  const { switchChainAsync } = useSwitchChain();

  const switchChain = async (chainId: number) => {
    if (switchChainAsync) {
      try {
        await switchChainAsync({ chainId: chainId });
      } catch (error) {
        console.error("Error switching chain:", error);
      }
    }
  };

  if (isWeb3Loading || !chainId) {
    return <Skeleton className="h-9 w-28 rounded-md" />;
  }

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" aria-label="Open menu" size="default">
            <ChainIcon chainKey={currentChain?.key} />
            <ChevronDown className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="bg-secondary">
          <DropdownMenuGroup>
            {SUPPORTED_NETWORKS.map((chain) => (
              <DropdownMenuItem
                key={chain.id}
                className="flex cursor-pointer items-center justify-start"
                onClick={() => switchChain(chain.id)}
                disabled={chain.id === chainId}
              >
                <ChainIcon chainKey={chain.key} />
                <span className="text-base">{chain.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
