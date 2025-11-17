"use client";

import Link from "next/link";
import { ArrowLeftRight, LayoutDashboard, MenuIcon, Store, User } from "lucide-react";

import ChainSelector from "@/components/ChainSelector";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import WalletStatus from "../WalletStatus";

const links = [
  {
    name: "Dashboard",
    link: "/",
    icon: LayoutDashboard,
    colorStart: "blue-500",
    colorEnd: "purple-600",
  },
  {
    name: "Reserves",
    link: "/reserves",
    icon: Store,
    colorStart: "green-500",
    colorEnd: "blue-600",
  },
  {
    name: "Account",
    link: "/account",
    icon: User,
    colorStart: "red-500",
    colorEnd: "yellow-600",
  },
  {
    name: "Swap",
    link: "/swap",
    icon: ArrowLeftRight,
    colorStart: "purple-500",
    colorEnd: "pink-600",
  },
];

function Header() {
  return (
    <header className="sticky top-2 z-50">
      <div className="container mx-auto flex items-center justify-between gap-x-4 px-2 *:h-[70px] *:border">
        {/* --- Mobile Menu --- */}
        {/* <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button> */}
        {/* --- Left Side --- */}
        <div className="bg-card hidden items-center rounded-md p-4 xl:flex">
          <span className="text-lg font-medium tracking-wide">Lending</span>
        </div>
        <div className="bg-card flex grow items-center justify-start gap-x-4 rounded-md p-4">
          {links.map((item) => (
            <Link key={item.name} href={item.link}>
              <button
                className={`bg-background hover:bg-accent flex cursor-pointer items-center gap-x-2 rounded-md border px-4 py-2 text-sm font-medium transition-all duration-300`}
              >
                <svg className="size-5" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient
                      id={`gradient-${item.name}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        className={`text-${item.colorStart}`}
                        stopColor="currentColor"
                      />
                      <stop
                        offset="100%"
                        className={`text-${item.colorEnd}`}
                        stopColor="currentColor"
                      />
                    </linearGradient>
                  </defs>
                  <item.icon
                    color="transparent"
                    stroke={`url(#gradient-${item.name})`}
                    className="size-5"
                  />
                </svg>

                <span>{item.name}</span>
              </button>
            </Link>
          ))}
        </div>
        {/* --- Web3 --- */}
        <div className="bg-card flex items-center justify-center gap-x-2 rounded-md p-4">
          <ChainSelector />
          <WalletStatus />
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" aria-label="Open menu" size="icon">
                <MenuIcon />
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export { Header };
