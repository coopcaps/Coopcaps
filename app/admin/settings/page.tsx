"use client";
import { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import { getSettings, newId, saveSettings } from "@/lib/store";
import { SiteSettings } from "@/lib/types";

function SettingsContent() {
  const [form, setForm] = useState<SiteSettings | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(getSettings());
  }, []);

  if (!form) return null;

  function update<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setForm((f) => (f ? { ...f, [key]: value } : f));
  }

  function handleSave() {
    if (!form) return;
    saveSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <h1 className="font-display text-2xl mb-6">الإعدادات</h1>

      <Section title="واتساب">
        <Row label="رقم WhatsApp (بدون + أو مسافات)">
          <input className="input" value={form.whatsappNumber} onChange={(e) => update("whatsappNumber", e.target.value)} />
        </Row>
      </Section>

      <Section title="الصفحة الرئيسية">
        <Row label="عنوان Hero (عربي)">
          <input className="input" value={form.heroTitle.ar} onChange={(e) => update("heroTitle", { ...form.heroTitle, ar: e.target.value })} />
        </Row>
        <Row label="Hero Title (English)">
          <input className="input" value={form.heroTitle.en} onChange={(e) => update("heroTitle", { ...form.heroTitle, en: e.target.value })} />
        </Row>
        <Row label="Tagline (عربي)">
          <input className="input" value={form.heroTagline.ar} onChange={(e) => update("heroTagline", { ...form.heroTagline, ar: e.target.value })} />
        </Row>
        <Row label="Tagline (English)">
          <input className="input" value={form.heroTagline.en} onChange={(e) => update("heroTagline", { ...form.heroTagline, en: e.target.value })} />
        </Row>
        <Row label="رابط صورة Hero">
          <input className="input" value={form.heroImage} onChange={(e) => update("heroImage", e.target.value)} />
        </Row>
      </Section>

      <Section title="العروض (Banner)">
        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={form.offersBanner.enabled}
            onChange={(e) => update("offersBanner", { ...form.offersBanner, enabled: e.target.checked })}
          />
          إظهار شريط العروض
        </label>
        <Row label="عنوان العرض (عربي)">
          <input
            className="input"
            value={form.offersBanner.title.ar}
            onChange={(e) => update("offersBanner", { ...form.offersBanner, title: { ...form.offersBanner.title, ar: e.target.value } })}
          />
        </Row>
      </Section>

      <Section title="التواصل الاجتماعي">
        <Row label="Instagram">
          <input className="input" value={form.socials.instagram ?? ""} onChange={(e) => update("socials", { ...form.socials, instagram: e.target.value })} />
        </Row>
        <Row label="TikTok">
          <input className="input" value={form.socials.tiktok ?? ""} onChange={(e) => update("socials", { ...form.socials, tiktok: e.target.value })} />
        </Row>
        <Row label="Facebook">
          <input className="input" value={form.socials.facebook ?? ""} onChange={(e) => update("socials", { ...form.socials, facebook: e.target.value })} />
        </Row>
      </Section>

      <Section title="مدن التوصيل">
        <div className="flex flex-col gap-2 mb-3">
          {form.deliveryCities.map((city, idx) => (
            <div key={city.id} className="flex items-center gap-2">
              <input
                className="input flex-1"
                value={city.name.ar}
                onChange={(e) => {
                  const cities = [...form.deliveryCities];
                  cities[idx] = { ...city, name: { ...city.name, ar: e.target.value } };
                  update("deliveryCities", cities);
                }}
              />
              <input
                type="number"
                className="input w-24"
                value={city.price}
                onChange={(e) => {
                  const cities = [...form.deliveryCities];
                  cities[idx] = { ...city, price: Number(e.target.value) };
                  update("deliveryCities", cities);
                }}
              />
              <button
                onClick={() => update("deliveryCities", form.deliveryCities.filter((c) => c.id !== city.id))}
                className="text-xs text-red-500 px-2"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() =>
            update("deliveryCities", [
              ...form.deliveryCities,
              { id: newId("city"), name: { ar: "", en: "" }, price: 0, etaDays: "1-3" }
            ])
          }
          className="text-xs px-3 py-1.5 rounded-full border border-brand-purple/20 dark:border-brand-yellow/20"
        >
          + إضافة مدينة
        </button>
      </Section>

      <button
        onClick={handleSave}
        className="focus-ring px-6 py-3 rounded-full bg-brand-purple text-white dark:bg-brand-yellow dark:text-brand-ink font-semibold"
      >
        {saved ? "تم الحفظ ✓" : "حفظ الإعدادات"}
      </button>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgba(91, 42, 157, 0.2);
          background: transparent;
          padding: 0.5rem 0.75rem;
        }
        .dark .input {
          border-color: rgba(244, 196, 48, 0.2);
        }
      `}</style>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 border border-brand-purple/10 dark:border-brand-yellow/10 rounded-xl2 p-4">
      <h2 className="font-semibold mb-3">{title}</h2>
      <div className="flex flex-col gap-3 text-sm">{children}</div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block mb-1 font-medium">{label}</span>
      {children}
    </label>
  );
}

export default function SettingsPage() {
  return (
    <AdminGuard>
      <SettingsContent />
    </AdminGuard>
  );
}
