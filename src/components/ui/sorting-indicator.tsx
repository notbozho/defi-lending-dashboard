"use client";

import { SortDirection } from "@tanstack/react-table";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  direction: SortDirection | false;
  visible: boolean;
};

export function SortingIndicator({ direction, visible }: Props) {
  return (
    <AnimatePresence>
      {(visible || direction) && (
        <motion.div
          animate={{
            rotate: direction === "asc" ? 180 : 0,
            y: 0,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className={cn(
            "text-muted-foreground/50 pointer-events-none ml-1 inline-flex items-center",
            "opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100",
            direction && "text-muted-foreground opacity-100"
          )}
        >
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
