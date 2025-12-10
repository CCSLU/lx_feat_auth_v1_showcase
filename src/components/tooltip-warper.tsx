import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TooltipWrapper({
  children,
  tooltip,
  className,
}: React.ComponentProps<"div"> & {
  children: React.ReactNode;
  tooltip?: string | React.ReactNode;
  className?: string;
}) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          className={`bg-card text-card-foreground dark:shadow-black-lg border px-2 py-1 text-sm font-medium shadow-md ${className || ""}`}
        >
          {tooltip || "This is a simple tooltip"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
