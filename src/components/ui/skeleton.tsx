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
          className={cn("bg-accent animate-pulse rounded-md", className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          {...props}
        />
      )}
    </AnimatePresence>
  );
}
