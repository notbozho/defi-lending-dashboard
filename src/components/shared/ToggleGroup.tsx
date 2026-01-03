"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

// -----------------------------
// Variants
// -----------------------------
const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out " +
    "hover:bg-muted/40 hover:text-muted-foreground disabled:pointer-events-none cursor-pointer disabled:opacity-50 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
    "whitespace-nowrap relative z-10",
  {
    variants: {
      variant: {
        default: "bg-transparent data-[active=true]:text-accent-foreground",
        outline:
          "border border-input bg-transparent shadow-xs hover:bg-accent/40 hover:text-accent-foreground data-[active=true]:text-accent-foreground",
        muted: "bg-transparent text-muted-foreground data-[active=true]:text-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ToggleGroupProps = {
  value: string;
  onValueChange: (_val: string) => void;
  children: React.ReactNode;
  variant?: VariantProps<typeof toggleVariants>["variant"];
  size?: VariantProps<typeof toggleVariants>["size"];
  className?: string;
};

type ToggleProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof toggleVariants> & {
    value: string;
  };

export function ToggleGroup({
  value,
  onValueChange,
  children,
  variant = "default",
  size = "default",
  className,
}: ToggleGroupProps) {
  const groupId = React.useId();

  return (
    <div
      data-variant={variant}
      data-size={size}
      className={cn(
        "relative flex w-fit items-center gap-0.5 rounded-lg p-0.5",
        variant === "outline" && "border shadow-xs",
        variant === "muted" && "bg-muted",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        const element = child as React.ReactElement<
          { value: string; [key: string]: unknown },
          string | React.JSXElementConstructor<unknown>
        >;
        const active = element.props.value === value;

        return React.cloneElement(element, {
          active,
          onClick: () => onValueChange(element.props.value),
          variant,
          size,
          groupId,
        });
      })}
    </div>
  );
}

export function Toggle({
  active,
  variant = "default",
  size = "default",
  className,
  children,
  disabled,
  groupId,
  onClick,
  ...props
}: ToggleProps & { active?: boolean; groupId?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-active={active}
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    >
      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            layoutId={`toggle-highlight-${groupId}`}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "absolute inset-0 z-0 rounded-md",
              variant === "muted" ? "bg-background shadow-sm" : "bg-accent"
            )}
          />
        )}
      </AnimatePresence>

      <motion.span
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.05 }}
        className="relative z-10"
      >
        {children}
      </motion.span>
    </button>
  );
}
