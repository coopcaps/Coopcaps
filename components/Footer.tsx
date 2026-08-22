"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSettings } from "@/lib/store";
import { SiteSettings } from "@/lib/types";

export default function Footer() {
  const { locale, t } = useLanguage();
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  return (
    <footer id="contact" className="border-t border-brand-purple/10 dark:border-brand-yellow/10 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3 text-sm">
        <div>
          <div className="font-display text-lg text-brand-purple dark:text-brand-yellow mb-2">CoOp Caps</div>
          <p className="opacity-70">{locale === "ar" ? settings?.heroTagline.ar : settings?.heroTagline.en}</p>
          <p className="opacity-70 mt-2">{t("deliveryAllLibya")} · {t("cashOnDelivery")}</p>
        </div>
        <div>
          <div className="font-semibold mb-2">{t("contact")}</div>
          <div className="flex flex-col gap-1 opacity-80">
            {settings?.socials.instagram && (
              <a href={settings.socials.instagram} target="_blank" rel="noreferrer">Instagram</a>
            )}
            {settings?.socials.tiktok && (
              <a href={settings.socials.tiktok} target="_blank" rel="noreferrer">TikTok</a>
            )}
            {settings?.whatsappNumber && (
              <a href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            )}
          </div>
        </div>
        <div>
          <div className="font-semibold mb-2">{t("admin")}</div>
          <Link href="/admin" className="opacity-80 hover:opacity-100">/admin →</Link>
        </div>
      </div>
      <div className="text-center text-xs opacity-50 pb-6">
        © {new Date().getFullYear()} CoOp Caps — {t("footerRights")}
      </div>
    </footer>
  );
}
