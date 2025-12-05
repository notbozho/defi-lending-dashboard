"use client";

import { useState } from "react";
import { Route } from "next";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  ArrowLeftRight,
  Github,
  LayoutDashboard,
  MenuIcon,
  Moon,
  Move,
  Store,
  Sun,
  User,
} from "lucide-react";

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

import WalletStatus from "../WalletStatus";

type HeaderLink = {
  name: string;
  link: Route;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  colorStart: string;
  colorEnd: string;
};

const links: HeaderLink[] = [
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
    link: "/",
    icon: User,
    colorStart: "red-500",
    colorEnd: "yellow-600",
  },
  {
    name: "Swap",
    link: "/",
    icon: ArrowLeftRight,
    colorStart: "purple-500",
    colorEnd: "pink-600",
  },
];

function Header() {
  // const { theme, setTheme } = useTheme();
  const [reducedMotion, setReducedMotion] = useState(false);

  return (
    <header className="relative top-2 z-50">
      <div className="*:border-primary/25 *:bg-card dark:*:border-border container mx-auto flex items-center justify-between gap-x-4 px-2 *:h-[70px] *:border">
        {/* --- Mobile Menu --- */}
        {/* <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button> */}

        <div className="flex grow items-center justify-start gap-x-4 rounded-md p-4">
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
        <div className="flex items-center justify-center gap-x-2 rounded-md p-4">
          <ChainSelector />
          <WalletStatus />
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" aria-label="Open menu" size="icon">
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
