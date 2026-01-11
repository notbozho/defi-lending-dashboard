"use client";

import * as React from "react";
import { useState } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

type TooltipSide = "top" | "bottom" | "left" | "right";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  const [side, setSide] = useState<"top" | "bottom" | "left" | "right">("top");

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        {...props}
        ref={(node) => {
          if (node) setSide((node.getAttribute("data-side") as TooltipSide) || "top");
        }}
        className="z-50"
      >
        <AnimatePresence mode="wait">
          <motion.div
            initial={{
              scale: 0.75,
              translateY: 2,
              y: side === "top" ? 4 : side === "bottom" ? -4 : 0,
            }}
            animate={{ scale: 1, translateY: 0, y: 0 }}
            exit={{
              scale: 0.75,
              translateY: 2,
              y: side === "top" ? 4 : side === "bottom" ? -4 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.4,
            }}
            style={{
              transformOrigin:
                side === "top"
                  ? "bottom center"
                  : side === "bottom"
                    ? "top center"
                    : side === "left"
                      ? "center right"
                      : "center left",
            }}
            className={cn(
              "bg-popover text-popover-foreground z-50 origin-[--radix-tooltip-content-transform-origin] rounded-md px-3 py-1.5 text-left text-xs leading-snug shadow-sm",
              className
            )}
          >
            {children}
            <TooltipPrimitive.Arrow className="bg-popover fill-popover z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px]" />
          </motion.div>
        </AnimatePresence>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
