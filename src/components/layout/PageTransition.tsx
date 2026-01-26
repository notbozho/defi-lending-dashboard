"use client";

import type React from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

import { WatchModeBanner } from "@/components/shared/WatchModeBanner";
import { navVariants, pageContentVariants } from "@/lib/motion/variants";
import { useReducedMotionPreference } from "@/stores/useUiStore";

type PageTransitionProps = {
  header: React.ReactNode;
  children: React.ReactNode;
};

export function PageTransition(props: PageTransitionProps): React.JSX.Element {
  const pathname = usePathname();
  const { reducedMotion } = useReducedMotionPreference();

  const [initialPath] = useState(pathname);
  const isInitialPhase = initialPath === pathname;

  const navInitial = reducedMotion ? "static" : isInitialPhase ? "initial" : "routeStart";
  const navAnimate = reducedMotion ? "static" : isInitialPhase ? "enter" : "routeEnter";

  const contentInitial = reducedMotion ? "static" : isInitialPhase ? "initial" : "routeStart";
  const contentAnimate = reducedMotion ? "static" : isInitialPhase ? "enter" : "routeEnter";

  const shouldStaggerCards = !reducedMotion && isInitialPhase;

  return (
    <div className="flex min-h-dvh flex-col">
      <WatchModeBanner />

      <motion.div
        key={`nav-${isInitialPhase ? "initial" : pathname}`}
        variants={navVariants}
        initial={navInitial}
        animate={navAnimate}
        transition={{ delay: reducedMotion ? 0 : 0.03 }}
      >
        {props.header}
      </motion.div>

      <motion.div
        key={`content-${isInitialPhase ? "initial" : pathname}`}
        variants={pageContentVariants}
        initial={contentInitial}
        animate={contentAnimate}
        transition={
          shouldStaggerCards
            ? { delay: 0.2, when: "beforeChildren" }
            : { delay: 0, when: "beforeChildren" }
        }
        className="flex flex-1 flex-col"
      >
        {props.children}
      </motion.div>
    </div>
  );
}
