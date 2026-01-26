import type { Transition } from "motion";
import type { Variants } from "motion/react";

export const spring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 22,
  mass: 0.8,
};

export const navVariants: Variants = {
  initial: {
    opacity: 0,
    filter: "blur(12px)",
  },
  enter: {
    opacity: 1,
    filter: "blur(0px)",
    transition: spring,
  },
  routeStart: {
    opacity: 0.85,
    filter: "blur(6px)",
  },
  routeEnter: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      ...spring,
      stiffness: 140,
      damping: 24,
    },
  },
  static: {
    opacity: 1,
    filter: "blur(0px)",
  },
};

export const pageContentVariants: Variants = {
  initial: {
    opacity: 0,
    filter: "blur(14px)",
  },
  enter: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      ...spring,
      staggerChildren: 0.08,
      delayChildren: 0.16,
    },
  },
  routeStart: {
    opacity: 0.92,
    filter: "blur(6px)",
  },
  routeEnter: {
    opacity: 1,
    filter: "blur(0px)",
    transition: spring,
  },
  static: {
    opacity: 1,
    filter: "blur(0px)",
  },
};

export const cardEntranceVariants: Variants = {
  initial: {
    opacity: 0,
    filter: "blur(16px)",
  },
  enter: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      ...spring,
      stiffness: 160,
      damping: 26,
    },
  },
  routeStart: {
    opacity: 1,
    filter: "blur(0px)",
  },
  routeEnter: {
    opacity: 1,
    filter: "blur(0px)",
  },
  static: {
    opacity: 1,
    filter: "blur(0px)",
  },
};
