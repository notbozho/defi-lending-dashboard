"use client";

import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftRight, Github, LayoutDashboard, MenuIcon, Store, User } from "lucide-react";
import { motion } from "motion/react";

import ChainSelector from "@/components/ChainSelector";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { spring } from "@/lib/motion/variants";
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

  const pathname = usePathname();

  return (
    <header className="relative top-2 z-50">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 140, damping: 18, delay: 0.03 }}
        className="container mx-auto flex items-center justify-between gap-x-4 px-2"
      >
        {/* --- Mobile Menu --- */}
        {/* <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button> */}

        <motion.div
          className="flex grow items-center justify-start gap-x-4 rounded-md py-4"
          initial={false}
          animate="enter"
          variants={{
            static: { opacity: 1, y: 0, filter: "blur(0px)" },
            enter: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { staggerChildren: 0.1, delayChildren: 0.05 },
            },
          }}
        >
          {links.map((item) => {
            const isActive = pathname === item.link;
            return (
              <motion.div
                key={item.name}
                variants={{
                  static: { opacity: 1, y: 0, filter: "blur(0px)" },
                  enter: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: spring,
                  },
                }}
                initial={false}
              >
                <Link href={item.link as Route}>
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
              </motion.div>
            );
          })}
        </motion.div>
        {/* --- Web3 --- */}
        <motion.div
          className="flex items-center justify-center gap-x-2 rounded-md py-4"
          initial={false}
          animate="enter"
          variants={{
            static: { opacity: 1, y: 0, filter: "blur(0px)" },
            enter: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { staggerChildren: 0.05, delayChildren: 0.1 },
            },
          }}
        >
          <motion.div
            variants={{
              static: { opacity: 1, y: 0, filter: "blur(0px)" },
              enter: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <ChainSelector />
          </motion.div>
          <motion.div
            variants={{
              static: { opacity: 1, y: 0, filter: "blur(0px)" },
              enter: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <WalletStatus />
          </motion.div>
          <motion.div
            variants={{
              static: { opacity: 1, y: 0, filter: "blur(0px)" },
              enter: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
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
          </motion.div>
        </motion.div>
      </motion.div>
    </header>
  );
}

export { Header };
