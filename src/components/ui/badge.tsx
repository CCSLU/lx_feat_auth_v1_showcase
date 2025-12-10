import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-full border px-1.5 py-0.5 text-xs font-medium whitespace-nowrap shrink-0 transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive w-fit",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90 dark:bg-primary/10 dark:text-primary dark:border dark:border-primary/60 dark:hover:bg-primary dark:hover:text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 dark:bg-secondary/50 dark:text-secondary-foreground dark:border dark:border-secondary/60 dark:hover:bg-secondary/70",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/10 dark:text-destructive dark:border dark:border-destructive/60 dark:hover:bg-destructive dark:hover:text-destructive-foreground",
        outline:
          "border bg-background text-foreground shadow-xs [a&]:hover:bg-accent [a&]:hover:text-accent-foreground dark:bg-input/30 dark:border-input-border dark:hover:bg-input",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
