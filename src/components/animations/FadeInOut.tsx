import { AnimatePresence, motion } from "motion/react";

type FadeInOutProps = {
  variant: "in" | "out" | "both";
  duration?: number;
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

export default function FadeInOut({
  variant,
  duration = 0.3,
  delay = 0,
  className,
  children,
}: FadeInOutProps) {
  const inProp = variant === "in" || variant === "both";
  const outProp = variant === "out" || variant === "both";

  const ease = variant === "in" ? "easeIn" : variant === "out" ? "easeOut" : "easeInOut";

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: inProp ? 1 : 0 }}
      exit={{ opacity: outProp ? 0 : 1 }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
