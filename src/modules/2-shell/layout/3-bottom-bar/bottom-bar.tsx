export default function BottomBar() {
  return (
    <div className="flex h-6 w-full items-start pt-2">
      {/* Left side content */}
      <div className="flex h-full flex-1 items-center justify-start gap-2"></div>

      {/* Middle content */}
      <div className="flex h-full flex-1 items-center justify-center gap-2"></div>

      {/* Right side content */}
      <div className="flex h-full flex-1 items-center justify-end gap-2"></div>
    </div>
  );
}
