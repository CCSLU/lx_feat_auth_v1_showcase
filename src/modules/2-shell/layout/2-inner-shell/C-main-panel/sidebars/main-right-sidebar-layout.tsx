export default function RightSidebarLayout({
  children,
}: {
  children?: React.ReactNode;
} = {}) {
  return (
    <div className="w-64 flex-shrink-0 overflow-auto border-l border-border md:block hidden">
      {children}
    </div>
  );
}