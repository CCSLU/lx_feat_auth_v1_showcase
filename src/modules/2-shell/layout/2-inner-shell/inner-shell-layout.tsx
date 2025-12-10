export default function InnerShellLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="align-center flex h-full w-full flex-1 flex-row justify-between">
      {children}
    </div>
  );
}
