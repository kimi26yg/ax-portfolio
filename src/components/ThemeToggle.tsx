"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-card shadow-lg border border-border text-foreground transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "light" ? (
        <Moon className="w-5 h-5 text-indigo-600 dark:text-teal-400" />
      ) : (
        <Sun className="w-5 h-5 text-orange-500" />
      )}
    </button>
  );
}
