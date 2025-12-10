import ThemeToggle from "@/components/theme/theme-toggle-1";
import EloxAppIcon from "../../../../../public/icons/elox-app-icon";

import TopBarSelectOrg from "@/modules/2-shell/layout/1-top-bar/top-bar-select-org";
import TopBarToggleChat from "@/modules/2-shell/layout/1-top-bar/top-bar-toggle-chat";
import TopBarAvatar from "@/modules/2-shell/layout/1-top-bar/top-bar-user";
import TopBarNotification from "@/modules/2-shell/layout/1-top-bar/top-bar-notification";

export default function TopBar() {
  return (
    <div className="flex h-11 w-full items-center justify-between pb-2">
      {/* Left side content */}
      <div className="flex h-full flex-1 items-center gap-2">
        <div className="border-border flex aspect-square h-9 w-9 items-center justify-center rounded-md border bg-black p-1">
          <EloxAppIcon className="h-6 w-6" />
        </div>

        <div className="bg-border h-[24px] w-[1px] rounded-lg" />
        <TopBarSelectOrg />
      </div>
      {/* Middle content - alineado al centro */}
      <div className="flex h-full flex-1 items-center justify-center gap-2"></div>
      {/* Right side content */}
      <div className="flex h-full flex-1 items-center justify-end gap-2">
        <TopBarNotification />
        <TopBarToggleChat />
        <ThemeToggle />
        <TopBarAvatar />
      </div>
    </div>
  );
}
