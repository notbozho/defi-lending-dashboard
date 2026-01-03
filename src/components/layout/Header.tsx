"use client";

import { useState } from "react";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftRight, Github, LayoutDashboard, MenuIcon, Move, Store, User } from "lucide-react";

import ChainSelector from "@/components/ChainSelector";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import WalletStatus from "../WalletStatus";

type HeaderLink = {
  name: string;
  // link: Route; // TODO: Enable later when all routes are implemented
  link: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const links: HeaderLink[] = [
  {
    name: "Dashboard",
    link: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Reserves",
    link: "/reserves",
    icon: Store,
  },
  {
    name: "Account",
    link: "/account",
    icon: User,
  },
  {
    name: "Swap",
    link: "/swap",
    icon: ArrowLeftRight,
  },
];

function Header() {
  // const { theme, setTheme } = useTheme();
  const [reducedMotion, setReducedMotion] = useState(false);

  const pathname = usePathname();

  return (
    <header className="relative top-2 z-50">
      <div className="container mx-auto flex items-center justify-between gap-x-4 px-2">
        {/* --- Mobile Menu --- */}
        {/* <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button> */}

        <div className="flex grow items-center justify-start gap-x-4 rounded-md py-4">
          {links.map((item) => {
            const isActive = pathname === item.link;
            return (
              <Link key={item.name} href={item.link as Route}>
                <Button
                  variant="secondary"
                  className={cn(
                    "flex items-center gap-x-2 px-4! py-2 text-sm",
                    isActive ? "font-medium" : "text-foreground/80 font-normal"
                  )}
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
                        <stop offset="0%" stopColor="currentColor" />
                        <stop offset="100%" stopColor="currentColor" />
                      </linearGradient>
                    </defs>
                    <item.icon
                      color="transparent"
                      stroke={`url(#gradient-${item.name})`}
                      className="size-5"
                    />
                  </svg>

                  <span>{item.name}</span>
                </Button>
              </Link>
            );
          })}
        </div>
        {/* --- Web3 --- */}
        <div className="flex items-center justify-center gap-x-2 rounded-md py-4">
          <ChainSelector />
          <WalletStatus />
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" aria-label="Open menu" size="icon">
                <MenuIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>

              {/* Theme Toggle */}
              <DropdownMenuItem
                // onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex cursor-pointer items-center gap-2"
              >
                {/* {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />} */}
                {/* <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span> */}
              </DropdownMenuItem>

              {/* Reduced Motion */}
              <DropdownMenuCheckboxItem
                checked={reducedMotion}
                onCheckedChange={(v) => setReducedMotion(Boolean(v))}
                className="flex items-center gap-2"
              >
                <Move className="h-4 w-4" />
                Reduce Motion
              </DropdownMenuCheckboxItem>

              <DropdownMenuSeparator />

              {/* GitHub link */}
              <DropdownMenuItem
                onClick={() =>
                  window.open("https://github.com/notbozho/defi-lending-dashboard", "_blank")
                }
                className="flex cursor-pointer items-center gap-2"
              >
                <Github className="h-4 w-4" />
                GitHub
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export { Header };
