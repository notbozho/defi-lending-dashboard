import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  visible = true,
  ...props
}: React.ComponentPropsWithoutRef<typeof motion.div> & { visible?: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="animated-skeleton"
          data-slot="skeleton"
          className={cn(
            "relative overflow-hidden rounded-md",
            "animate-skeleton",
            "bg-[linear-gradient(90deg,var(--accent)_25%,var(--secondary)_37%,var(--accent)_63%)]",
            className
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          {...props}
        />
      )}
    </AnimatePresence>
  );
}
