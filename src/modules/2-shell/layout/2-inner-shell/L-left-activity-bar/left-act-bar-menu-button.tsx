"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

import TooltipWrapper from "@/components/tooltip-warper";

export default function LeftActBarMenuButton({
  children,
  activePath,
  className,
  tooltip,
  ...props
}: React.ComponentProps<"button"> & {
  children: React.ReactNode;
  activePath?: string;
  tooltip?: string;
}) {
  const pathname = usePathname();

  // Determine if button is active based on activePath prop
  const isActive = activePath && pathname.startsWith(activePath);

  return (
    <TooltipWrapper tooltip={tooltip}>
      <Button
        variant="ghost"
        size="icon"
        className={`w-full cursor-pointer rounded-md ${
          isActive
            ? "bg-background text-background-foreground dark:shadow-inner-black-lg border shadow-lg"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent/40 shadow-none hover:border"
        } ${className || ""}`}
        asChild
        {...props}
      >
        {children}
      </Button>
    </TooltipWrapper>
  );
}
