/* eslint-disable react-hooks/static-components */
"use client";

import React, { ElementType } from "react";
import { AnimatePresence, motion, Variants } from "motion/react";

import { cn } from "@/lib/utils";

type TextBlurProps = {
  element: ElementType;
  variant: "in" | "out" | "both";
  wordByWord?: boolean;
  duration?: number;
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

export default function TextBlur({
  element,
  variant,
  wordByWord = false,
  duration = 0.3,
  delay = 0,
  className,
  children,
}: TextBlurProps) {
  const MotionComponent = motion.create(element);

  const parts = wordByWord && typeof children === "string" ? children.split(/(\s+)/) : [children];

  const blurVariants: Record<string, Variants> = {
    in: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      show: {
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration, ease: "easeOut" },
      },
    },
    out: {
      hidden: { opacity: 1, filter: "blur(0px)" },
      show: {
        opacity: 0,
        filter: "blur(10px)",
        transition: { duration, ease: "easeIn" },
      },
    },
    both: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      show: {
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration, ease: "easeOut" },
      },
      exit: {
        opacity: 0,
        filter: "blur(10px)",
        transition: { duration: 0.4, ease: "easeIn" },
      },
    },
  };

  const selected = blurVariants[variant];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        opacity: { duration: 0.01, delay },
        delayChildren: delay,
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <AnimatePresence mode="popLayout">
      <MotionComponent
        className={cn("whitespace-pre-wrap", className)}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <span className="sr-only">{children}</span>
        {parts.map((part, i) => (
          <motion.span
            key={`${i}-${part}`}
            variants={selected}
            custom={i * 0.05}
            aria-hidden="true"
          >
            {part}
          </motion.span>
        ))}
      </MotionComponent>
    </AnimatePresence>
  );
}
