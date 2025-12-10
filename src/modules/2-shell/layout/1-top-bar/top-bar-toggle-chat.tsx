import { Toggle } from "@/components/ui/toggle";
import { PanelRightOpen } from "lucide-react";

export default function TopBarToggleChat() {
  return (
    <Toggle
      variant="outline"
      className="hover:bg-accent hover:text-accent-foreground size-9 cursor-pointer shadow-none border-none"
      pressed={false}
    >
      <PanelRightOpen
        size={16}
        className="text-muted-foreground absolute shrink-0 scale-100 opacity-100 transition-all"
        aria-hidden="true"
      />
    </Toggle>
  );
}
