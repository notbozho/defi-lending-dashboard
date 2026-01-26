"use client";

import type React from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useReducedMotionPreference, useUiStore } from "@/stores/useUiStore";

export type WatchModeBannerProps = {
  className?: string | undefined;
};

export function WatchModeBanner(props: WatchModeBannerProps): React.JSX.Element {
  const { className } = props;
  const { reducedMotion } = useReducedMotionPreference();
  const watchModeBannerVisible = useUiStore((state) => state.watchModeBannerVisible);
  const setWatchModeBannerVisible = useUiStore((state) => state.setWatchModeBannerVisible);

  const handleClose = () => {
    setWatchModeBannerVisible(false);
  };

  return (
    <AnimatePresence>
      {watchModeBannerVisible && (
        <motion.div
          aria-label="Watch mode banner"
          role="region"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 40, opacity: 1, transition: { delay: reducedMotion ? 0 : 2 } }}
          exit={{ height: 0, opacity: 1, transition: { delay: 0 } }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          className={cn(
            "bg-primary text-background w-full overflow-hidden",
            "px-4",
            "text-xs sm:text-sm",
            className
          )}
        >
          <div className="container mx-auto flex h-full items-center justify-between gap-2 py-2">
            <div className="flex flex-1 items-center justify-center gap-2">
              <span>View the dashboard from the POV of anyone.</span>
              <Button
                variant="link"
                size="sm"
                aria-disabled="true"
                onClick={(e) => e.preventDefault()}
                className={cn("text-background underline-offset-4 hover:underline")}
              >
                Check out watch mode
              </Button>
            </div>
            <Button
              type="button"
              variant={"ghost"}
              size="icon"
              onClick={handleClose}
              aria-label="Close watch mode banner"
              className={cn(
                "flex size-6 shrink-0 cursor-pointer items-center justify-center rounded transition-colors duration-300",
                "hover:bg-black/10 dark:hover:bg-white/10"
              )}
            >
              <X className="size-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
