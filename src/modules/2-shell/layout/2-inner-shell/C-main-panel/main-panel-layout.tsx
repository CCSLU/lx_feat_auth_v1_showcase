export default function MainPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="border-border bg-background flex flex-1 items-center rounded-lg border shadow-inner-sm dark:shadow-inner-black-sm">
      {children}
    </div>
  );
}
