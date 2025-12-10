import OuterShellLayout from "@/modules/2-shell/layout/outer-shell-layout";
import TopBar from "@/modules/2-shell/layout/1-top-bar/top-bar";
import InnerShellLayout from "@/modules/2-shell/layout/2-inner-shell/inner-shell-layout";
import LeftActivityBar from "@/modules/2-shell/layout/2-inner-shell/L-left-activity-bar/left-activity-bar";
import MainPanelLayout from "@/modules/2-shell/layout/2-inner-shell/C-main-panel/main-panel-layout";
// import RightActivityBar from "@/modules/2-shell/layout/2-inner-shell/R-right-activity-bar/right-activity-bar";
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
          <LeftActivityBar />
          <MainPanelLayout>
            {children}
          </MainPanelLayout>
          {/* <RightActivityBar /> */}
        </InnerShellLayout>
        {/* <BottomBar /> */}
      </OuterShellLayout>
    </div>
  );
}
