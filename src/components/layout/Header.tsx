"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Web3Info } from "../Web3Info";

function Header() {
  const navLinks = [
    { name: "Dashboard", href: "/" },
    { name: "Markets", href: "/markets" },
    { name: "Account", href: "/account" },
    { name: "Swap", href: "/swap" },
  ];

  return (
    <header className="bg-card sticky top-0 z-50 border-b">
      <div className="flex h-(--header-height) items-center justify-between px-2">
        {/* --- Mobile Menu --- */}
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        {/* --- Left Side --- */}
        <div className="hidden flex-1 items-center gap-1 md:flex">kurec</div>
        {/* --- Right Side --- */}
        <Web3Info />
      </div>
    </header>
  );
}

export default Header;
