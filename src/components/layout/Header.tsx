"use client";

import { Menu } from "lucide-react";
import { useChainId } from "wagmi";

import { Button } from "@/components/ui/button";

import WalletStatus from "../WalletStatus";

function Header() {
  // DEV: TEMPORARY
  const chainId = useChainId();

  return (
    <header className="bg-card sticky top-0 z-50 border-b">
      <div className="flex h-(--header-height) items-center justify-between px-2">
        {/* --- Mobile Menu --- */}
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        {/* --- Left Side --- */}
        <div className="hidden flex-1 items-center gap-1 md:flex">
          <span className="text-lg font-medium tracking-wide">Lending</span>
        </div>
        {/* --- Right Side --- */}
        <WalletStatus />
        <span>{chainId}</span>
      </div>
    </header>
  );
}

export default Header;
