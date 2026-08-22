"use client";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCategories, getProducts } from "@/lib/store";
import { Category, Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const { locale, t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    setProducts(getProducts().filter((p) => p.visible));
    setCategories(getCategories());
  }, []);

  const filtered = useMemo(
    () => (activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory)),
    [products, activeCategory]
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl mb-6">{t("caps")}</h1>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-1 px-1">
        <button
          onClick={() => setActiveCategory("all")}
          className={`focus-ring shrink-0 px-4 py-2 rounded-full text-sm border transition-colors ${
            activeCategory === "all"
              ? "bg-brand-purple text-white border-brand-purple dark:bg-brand-yellow dark:text-brand-ink dark:border-brand-yellow"
              : "border-brand-purple/20 dark:border-brand-yellow/20"
          }`}
        >
          {locale === "ar" ? "الكل" : "All"}
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`focus-ring shrink-0 px-4 py-2 rounded-full text-sm border transition-colors ${
              activeCategory === c.id
                ? "bg-brand-purple text-white border-brand-purple dark:bg-brand-yellow dark:text-brand-ink dark:border-brand-yellow"
                : "border-brand-purple/20 dark:border-brand-yellow/20"
            }`}
          >
            {c.name[locale]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="opacity-60 text-sm">{t("outOfStock")}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
