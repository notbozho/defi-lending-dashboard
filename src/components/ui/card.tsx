import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground dark:border-border border-primary/25 flex flex-col gap-6 rounded-md border py-6",
        className
      )}
      {...props}
    />
  );
}

const cardHeaderVariants = cva("@container/card-header px-6", {
  variants: {
    variant: {
      default: "grid auto-rows-min grid-rows-[auto_auto] items-start gap-2",
      inline: "flex items-center justify-between gap-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type CardHeaderProps = React.ComponentProps<"div"> & VariantProps<typeof cardHeaderVariants>;

function CardHeader({ className, variant, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(cardHeaderVariants({ variant }), className)}
      {...props}
    />
  );
}

const cardTitleVariants = cva("leading-none font-medium text-lg", {
  variants: {
    variant: {
      default: "",
      withIcon: "flex items-start py-1 gap-3 [&>svg]:size-[1.25em] [&>svg]:shrink-0",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type CardTitleProps = React.ComponentProps<"div"> & VariantProps<typeof cardTitleVariants>;

function CardTitle({ className, variant, ...props }: CardTitleProps) {
  return (
    <div
      data-slot="card-title"
      className={cn(cardTitleVariants({ variant }), className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-6", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
