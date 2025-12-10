"use client";

import { Toggle } from "@/components/ui/toggle";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Toggle
        variant="default"
        className="dark:hover:bg-secondary size-9 cursor-pointer shadow-none dark:bg-transparent"
        pressed={theme === "dark"}
        onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        <MoonIcon
          size={16}
          className="text-muted-foreground shrink-0 scale-100 opacity-100 transition-all dark:scale-0 dark:opacity-0"
          aria-hidden="true"
        />
        <SunIcon
          size={16}
          className="text-muted-foreground absolute shrink-0 scale-0 opacity-0 transition-all dark:scale-100 dark:opacity-100"
          aria-hidden="true"
        />
      </Toggle>
    </div>
  );
}
