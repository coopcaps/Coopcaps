"use client";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage();
  return (
    <button
      onClick={toggleLocale}
      aria-label="Toggle language"
      className="focus-ring px-3 h-9 rounded-full text-xs font-mono border border-brand-purple/20 dark:border-brand-yellow/30 hover:bg-brand-purple/5 dark:hover:bg-brand-yellow/10 transition-colors"
    >
      {locale === "ar" ? "EN" : "AR"}
    </button>
  );
}
