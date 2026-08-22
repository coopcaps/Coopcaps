"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProductCard({ product }: { product: Product }) {
  const { locale, t } = useLanguage();
  const primary = product.images.find((i) => i.isPrimary) ?? product.images[0];
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <div className="group relative rounded-xl2 overflow-hidden bg-white dark:bg-white/5 border border-brand-purple/10 dark:border-brand-yellow/10 hover:shadow-lg transition-shadow">
      {product.trending && <span className="cap-tag">{t("trendingNow")}</span>}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          {primary && (
            <Image
              src={primary.url}
              alt={product.name[locale]}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          )}
        </div>
      </Link>
      <div className="p-3">
        <h3 className="font-medium text-sm truncate">{product.name[locale]}</h3>
        <div className="flex items-center gap-2 mt-1 price-tag text-sm">
          <span className="font-bold text-brand-purple dark:text-brand-yellow">${product.price}</span>
          {onSale && <span className="line-through opacity-50 text-xs">${product.compareAtPrice}</span>}
        </div>
        <div className="flex gap-2 mt-3">
          <Link
            href={`/products/${product.id}`}
            className="focus-ring flex-1 text-center text-xs font-medium py-2 rounded-full border border-brand-purple/30 dark:border-brand-yellow/30 hover:bg-brand-purple/5 dark:hover:bg-brand-yellow/10"
          >
            {t("viewProduct")}
          </Link>
          <Link
            href={`/products/${product.id}?order=1`}
            className="focus-ring flex-1 text-center text-xs font-semibold py-2 rounded-full bg-brand-purple text-white dark:bg-brand-yellow dark:text-brand-ink hover:opacity-90"
          >
            {t("orderNow")}
          </Link>
        </div>
      </div>
    </div>
  );
}
