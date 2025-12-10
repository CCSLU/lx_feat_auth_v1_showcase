import OuterShellLayout from "@/modules/2-shell/layout/outer-shell-layout";
import TopBar from "@/modules/2-shell/layout/1-top-bar/top-bar";
import InnerShellLayout from "@/modules/2-shell/layout/2-inner-shell/inner-shell-layout";
import InnerShellLeftActivityBar from "@/modules/2-shell/layout/2-inner-shell/L-left-activity-bar/left-activity-bar";
import InnerShellMainPanelLayout from "@/modules/2-shell/layout/2-inner-shell/C-main-panel/main-panel-layout";
// import InnerShellRightActivityBar from "@/modules/2-shell/layout/2-inner-shell/3-inner-shell-right-activity-bar/inner-shell-right-activity-bar";
// import BottomBar from "@/modules/2-shell/layout/3-bottom-bar/bottom-bar";

export default function ConsoleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full">
      <OuterShellLayout>
        <TopBar />
        <InnerShellLayout>
          <InnerShellLeftActivityBar />
          <InnerShellMainPanelLayout>{children}</InnerShellMainPanelLayout>
          {/* <InnerShellRightActivityBar /> */}
        </InnerShellLayout>
        {/* <BottomBar /> */}
      </OuterShellLayout>
    </div>
  );
}
