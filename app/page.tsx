"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProducts, getSettings } from "@/lib/store";
import { Product, SiteSettings } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const { locale, t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    setProducts(getProducts().filter((p) => p.visible));
    setSettings(getSettings());
  }, []);

  const featured = products.filter((p) => p.featured);
  const trending = products.filter((p) => p.trending);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[520px] md:min-h-[620px] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt="CoOp Caps Hero Background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay so text stays readable */}
          <div className="absolute inset-0 bg-brand-purple/70" />
        </div>

        {/* Yellow accent shape */}
        <div
          className="absolute -end-24 -top-24 w-72 h-72 rounded-full bg-brand-yellow/90 z-10"
          style={{ clipPath: "polygon(20% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%, 0% 20%)" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-24 w-full">
          <div className="max-w-xl text-white">
            <span className="cap-tag !static !inline-block !rotate-0 mb-4">CoOp Caps</span>
            <h1 className="font-display text-4xl md:text-6xl leading-tight mb-4">
              {settings ? settings.heroTitle[locale] : "CoOp Caps"}
            </h1>
            <p className="text-lg md:text-xl text-brand-yellow font-mono mb-8">
              {settings ? settings.heroTagline[locale] : "Your Cap. Your Style."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="focus-ring px-6 py-3 rounded-full bg-brand-yellow text-brand-ink font-semibold hover:opacity-90"
              >
                {t("browseCaps")}
              </Link>
              <Link
                href="/custom"
                className="focus-ring px-6 py-3 rounded-full border border-white/40 text-white hover:bg-white/10"
              >
                {t("designYoursBtn")}
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Offers banner */}
      {settings?.offersBanner.enabled && (
        <section className="bg-brand-yellow text-brand-ink">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-center">
            <span>{settings.offersBanner.title[locale]}</span>
            <span className="opacity-70">— {settings.offersBanner.subtitle[locale]}</span>
          </div>
        </section>
      )}

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl">{t("featured")}</h2>
          <Link href="/products" className="text-sm font-medium text-brand-purple dark:text-brand-yellow">
            {t("seeAll")} →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Trending */}
      {trending.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="font-display text-2xl mb-6">{t("trendingNow")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trending.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Custom design CTA */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="rounded-xl2 bg-brand-ink text-white dark:bg-brand-yellow dark:text-brand-ink p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl mb-2">{t("customDesignTitle")}</h3>
            <p className="opacity-80 max-w-md">{t("customDesignDesc")}</p>
          </div>
          <Link
            href="/custom"
            className="focus-ring shrink-0 px-6 py-3 rounded-full bg-brand-yellow text-brand-ink dark:bg-brand-ink dark:text-brand-yellow font-semibold"
          >
            {t("designYoursBtn")}
          </Link>
        </div>
      </section>
    </div>
  );
}
