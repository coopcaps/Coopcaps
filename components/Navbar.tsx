"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { getSettings } from "@/lib/store";
import { SiteSettings } from "@/lib/types";

export default function Navbar() {
  const { locale, t } = useLanguage();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const links = settings?.navLinks ?? [];

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-brand-paper/85 dark:bg-brand-ink/85 border-b border-brand-purple/10 dark:border-brand-yellow/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-xl tracking-tight text-brand-purple dark:text-brand-yellow">
          CoOp <span className="text-brand-yellow dark:text-brand-purpleLight">Caps</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand-purple dark:hover:text-brand-yellow transition-colors">
              {link.label[locale]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
          <button
            className="md:hidden focus-ring w-9 h-9 flex items-center justify-center"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-brand-purple/10 dark:border-brand-yellow/10 px-4 py-3 flex flex-col gap-3 text-sm font-medium">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label[locale]}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
