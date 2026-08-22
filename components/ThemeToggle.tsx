"use client";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="focus-ring w-9 h-9 rounded-full flex items-center justify-center border border-brand-purple/20 dark:border-brand-yellow/30 hover:bg-brand-purple/5 dark:hover:bg-brand-yellow/10 transition-colors"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
