"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";

type Props = {
  direction: "asc" | "desc" | undefined;
  visible: boolean;
};

export function SortingIndicator({ direction, visible }: Props) {
  return (
    <AnimatePresence>
      {visible && direction && (
        <motion.div
          animate={{
            opacity: visible ? 1 : 0,
            rotate: direction === "asc" ? 180 : 0,
            y: 0,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="text-muted-foreground group-hover:text-foreground pointer-events-none ml-1 inline-flex items-center"
        >
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
