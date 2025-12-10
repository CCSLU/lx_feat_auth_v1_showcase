export default function MainLeftSidebarLayout({
  children,
}: {
  children?: React.ReactNode;
} = {}) {
  return (
    <div className="w-64 flex-shrink-0 overflow-auto border-r border-border md:block hidden">
      {children}
    </div>
  );
}