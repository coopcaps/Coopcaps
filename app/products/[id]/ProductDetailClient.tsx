"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProduct } from "@/lib/store";
import { Product } from "@/lib/types";
import OrderModal from "@/components/OrderModal";

export default function ProductDetailClient() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const { locale, t } = useLanguage();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [showOrder, setShowOrder] = useState(false);

  useEffect(() => {
    const p = getProduct(id);
    setProduct(p ?? null);
    if (p?.colors?.[0]) setColor(p.colors[0]);
    if (searchParams.get("order")) setShowOrder(true);
  }, [id, searchParams]);

  if (product === undefined) return null;
  if (product === null) {
    return <div className="max-w-3xl mx-auto px-4 py-16 text-center opacity-70">{t("outOfStock")}</div>;
  }

  const image = product.images[activeImage];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="relative aspect-square rounded-xl2 overflow-hidden border border-brand-purple/10 dark:border-brand-yellow/10">
            {image && <Image src={image.url} alt={product.name[locale]} fill className="object-cover" />}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {product.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(idx)}
                  className={`focus-ring relative w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    idx === activeImage ? "border-brand-purple dark:border-brand-yellow" : "border-transparent"
                  }`}
                >
                  <Image src={img.url} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="font-display text-2xl md:text-3xl mb-2">{product.name[locale]}</h1>
          <div className="price-tag text-2xl font-bold text-brand-purple dark:text-brand-yellow mb-4">
            ${product.price}
            {product.compareAtPrice && (
              <span className="text-base line-through opacity-50 ms-2">${product.compareAtPrice}</span>
            )}
          </div>
          <p className="opacity-80 leading-relaxed mb-6">{product.description[locale]}</p>

          {product.colors.length > 0 && (
            <div className="mb-6">
              <div className="text-sm font-medium mb-2">{t("color")}</div>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`focus-ring px-3 py-1.5 rounded-full text-sm border ${
                      color === c
                        ? "bg-brand-purple text-white border-brand-purple dark:bg-brand-yellow dark:text-brand-ink dark:border-brand-yellow"
                        : "border-brand-purple/20 dark:border-brand-yellow/20"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <div className="text-sm font-medium mb-2">{t("quantity")}</div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="focus-ring w-9 h-9 rounded-full border border-brand-purple/20 dark:border-brand-yellow/20"
              >
                −
              </button>
              <span className="w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="focus-ring w-9 h-9 rounded-full border border-brand-purple/20 dark:border-brand-yellow/20"
              >
                +
              </button>
            </div>
          </div>

          <label className="block mb-6 text-sm">
            <span className="block mb-2 font-medium">{t("notes")}</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="focus-ring w-full rounded-lg border border-brand-purple/20 dark:border-brand-yellow/20 bg-transparent px-3 py-2"
            />
          </label>

          <button
            onClick={() => setShowOrder(true)}
            className="focus-ring w-full py-3 rounded-full bg-brand-purple text-white dark:bg-brand-yellow dark:text-brand-ink font-semibold"
          >
            {t("orderNow")}
          </button>
        </div>
      </div>

      {showOrder && (
        <OrderModal
          item={{
            id: "item-" + product.id,
            type: "ready",
            productId: product.id,
            productName: product.name[locale],
            color,
            quantity,
            notes: notes || undefined
          }}
          onClose={() => setShowOrder(false)}
        />
      )}
    </div>
  );
}
