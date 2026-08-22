"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import AdminGuard from "@/components/AdminGuard";
import { deleteProduct, getCategories, getProducts, newId, saveProduct } from "@/lib/store";
import { Category, Product } from "@/lib/types";

const emptyProduct = (categories: Category[]): Product => ({
  id: newId("p"),
  name: { ar: "", en: "" },
  description: { ar: "", en: "" },
  price: 0,
  category: categories[0]?.id ?? "",
  colors: [],
  images: [{ id: newId("img"), url: "https://picsum.photos/seed/" + Date.now() + "/900/900", isPrimary: true }],
  featured: false,
  trending: false,
  visible: true,
  order: 0,
  createdAt: new Date().toISOString()
});

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);

  function refresh() {
    setProducts(getProducts());
    setCategories(getCategories());
  }

  useEffect(refresh, []);

  function handleSave(p: Product) {
    saveProduct(p);
    setEditing(null);
    refresh();
  }

  function handleDelete(id: string) {
    if (confirm("حذف هذا المنتج؟")) {
      deleteProduct(id);
      refresh();
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl">المنتجات</h1>
        <button
          onClick={() => setEditing(emptyProduct(categories))}
          className="focus-ring px-4 py-2 rounded-full bg-brand-purple text-white dark:bg-brand-yellow dark:text-brand-ink text-sm font-semibold"
        >
          + إضافة منتج
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-3 border border-brand-purple/10 dark:border-brand-yellow/10 rounded-xl p-2"
          >
            <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
              {p.images[0] && <Image src={p.images[0].url} alt="" fill className="object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{p.name.ar || p.name.en}</div>
              <div className="text-xs opacity-60">
                ${p.price} · {p.visible ? "ظاهر" : "مخفي"} {p.featured && "· مميز"} {p.trending && "· ترند"}
              </div>
            </div>
            <button onClick={() => setEditing(p)} className="focus-ring text-sm px-3 py-1.5 rounded-full border border-brand-purple/20 dark:border-brand-yellow/20">
              تعديل
            </button>
            <button onClick={() => handleDelete(p.id)} className="focus-ring text-sm px-3 py-1.5 rounded-full text-red-500 border border-red-500/20">
              حذف
            </button>
          </div>
        ))}
        {products.length === 0 && <p className="opacity-60 text-sm">لا توجد منتجات بعد.</p>}
      </div>

      {editing && (
        <ProductEditor product={editing} categories={categories} onCancel={() => setEditing(null)} onSave={handleSave} />
      )}
    </div>
  );
}

function ProductEditor({
  product,
  categories,
  onCancel,
  onSave
}: {
  product: Product;
  categories: Category[];
  onCancel: () => void;
  onSave: (p: Product) => void;
}) {
  const [form, setForm] = useState<Product>(product);

  function update<K extends keyof Product>(key: K, value: Product[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-brand-paper dark:bg-brand-ink w-full sm:max-w-lg sm:rounded-xl2 rounded-t-2xl p-5 max-h-[90vh] overflow-y-auto">
        <h2 className="font-display text-lg mb-4">تعديل المنتج</h2>
        <div className="flex flex-col gap-3 text-sm">
          <Row label="الاسم (عربي)">
            <input className="input" value={form.name.ar} onChange={(e) => update("name", { ...form.name, ar: e.target.value })} />
          </Row>
          <Row label="Name (English)">
            <input className="input" value={form.name.en} onChange={(e) => update("name", { ...form.name, en: e.target.value })} />
          </Row>
          <Row label="الوصف (عربي)">
            <textarea className="input" rows={2} value={form.description.ar} onChange={(e) => update("description", { ...form.description, ar: e.target.value })} />
          </Row>
          <Row label="Description (English)">
            <textarea className="input" rows={2} value={form.description.en} onChange={(e) => update("description", { ...form.description, en: e.target.value })} />
          </Row>
          <Row label="السعر">
            <input type="number" className="input" value={form.price} onChange={(e) => update("price", Number(e.target.value))} />
          </Row>
          <Row label="السعر قبل الخصم (اختياري)">
            <input type="number" className="input" value={form.compareAtPrice ?? ""} onChange={(e) => update("compareAtPrice", e.target.value ? Number(e.target.value) : undefined)} />
          </Row>
          <Row label="التصنيف">
            <select className="input" value={form.category} onChange={(e) => update("category", e.target.value)}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name.ar}</option>
              ))}
            </select>
          </Row>
          <Row label="الألوان (مفصولة بفاصلة)">
            <input className="input" value={form.colors.join(", ")} onChange={(e) => update("colors", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
          </Row>
          <Row label="رابط الصورة الرئيسية">
            <input
              className="input"
              value={form.images[0]?.url ?? ""}
              onChange={(e) =>
                update("images", [{ id: form.images[0]?.id ?? newId("img"), url: e.target.value, isPrimary: true }, ...form.images.slice(1)])
              }
            />
          </Row>
          <div className="flex gap-4 flex-wrap">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.visible} onChange={(e) => update("visible", e.target.checked)} /> ظاهر
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} /> مميز (Featured)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.trending} onChange={(e) => update("trending", e.target.checked)} /> ترند (Trending)
            </label>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onCancel} className="focus-ring flex-1 py-2.5 rounded-full border border-brand-purple/20 dark:border-brand-yellow/20">
            إلغاء
          </button>
          <button
            onClick={() => onSave(form)}
            className="focus-ring flex-1 py-2.5 rounded-full bg-brand-purple text-white dark:bg-brand-yellow dark:text-brand-ink font-semibold"
          >
            حفظ
          </button>
        </div>
      </div>
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

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block mb-1 font-medium">{label}</span>
      {children}
    </label>
  );
}

export default function ProductsPage() {
  return (
    <AdminGuard>
      <ProductsContent />
    </AdminGuard>
  );
}
