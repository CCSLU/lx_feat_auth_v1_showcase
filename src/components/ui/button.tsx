import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-sky-600 cursor-pointer transition-all duration-50 dark:bg-primary/10 dark:text-primary dark:border dark:border-primary/60 dark:hover:bg-primary dark:hover:text-primary-foreground dark:shadow-none",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-red-700 cursor-pointer transition-all duration-50 dark:bg-destructive/10 dark:text-destructive dark:border dark:border-destructive/60 dark:hover:bg-destructive dark:hover:text-destructive-foreground focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:shadow-none",
        outline:
          "border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all duration-50 dark:bg-input/30 dark:border-input-border dark:hover:bg-input dark:shadow-none",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:text-primary cursor-pointer transition-all duration-50 border border-secondary hover:border-primary dark:bg-secondary/60 dark:text-secondary-foreground dark:border-secondary dark:hover:bg-secondary/30 dark:hover:text-primary dark:hover:border-primary dark:shadow-none",
        ghost:
          "text-foreground hover:bg-accent hover:text-primary transition-all duration-50 cursor-pointer dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline cursor-pointer transition-all duration-50",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
