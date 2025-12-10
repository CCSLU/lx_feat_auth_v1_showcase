export default function OuterShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-sidebar flex h-screen w-full flex-col items-center justify-between rounded-2xl p-2">
      {children}
    </div>
  );
}
