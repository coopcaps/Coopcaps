"use client";

// ==========================================================================
// طبقة تخزين مؤقتة (Mock Data Layer) تعتمد على localStorage.
//
// الهدف: تشغيل المشروع كامل الوظائف بدون Backend حقيقي في هذه المرحلة،
// مع إبقاء الواجهة (Components/Pages) غير مرتبطة إطلاقًا بطريقة التخزين.
//
// عند الربط بـ Supabase/Backend حقيقي لاحقًا:
//   - استبدل الدوال هنا فقط (getProducts, saveProduct, ...) بنداءات API حقيقية.
//   - لا حاجة لتعديل أي صفحة أو Component، لأنها تستدعي هذه الدوال فقط.
// ==========================================================================

import { Category, Order, Product, SiteSettings } from "./types";
import { seedCategories, seedOrders, seedProducts, seedSettings } from "./seed";

const KEYS = {
  products: "coopcaps_products",
  categories: "coopcaps_categories",
  orders: "coopcaps_orders",
  settings: "coopcaps_settings"
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function ensureSeeded() {
  if (typeof window === "undefined") return;
  if (!window.localStorage.getItem(KEYS.products)) write(KEYS.products, seedProducts);
  if (!window.localStorage.getItem(KEYS.categories)) write(KEYS.categories, seedCategories);
  if (!window.localStorage.getItem(KEYS.orders)) write(KEYS.orders, seedOrders);
  if (!window.localStorage.getItem(KEYS.settings)) write(KEYS.settings, seedSettings);
}

// ---------- Products ----------
export function getProducts(): Product[] {
  ensureSeeded();
  return read<Product[]>(KEYS.products, seedProducts).sort((a, b) => a.order - b.order);
}
export function getProduct(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}
export function saveProduct(product: Product) {
  const all = getProducts();
  const idx = all.findIndex((p) => p.id === product.id);
  if (idx >= 0) all[idx] = product;
  else all.push(product);
  write(KEYS.products, all);
}
export function deleteProduct(id: string) {
  write(KEYS.products, getProducts().filter((p) => p.id !== id));
}

// ---------- Categories ----------
export function getCategories(): Category[] {
  ensureSeeded();
  return read<Category[]>(KEYS.categories, seedCategories);
}
export function saveCategory(category: Category) {
  const all = getCategories();
  const idx = all.findIndex((c) => c.id === category.id);
  if (idx >= 0) all[idx] = category;
  else all.push(category);
  write(KEYS.categories, all);
}
export function deleteCategory(id: string) {
  write(KEYS.categories, getCategories().filter((c) => c.id !== id));
}

// ---------- Orders ----------
export function getOrders(): Order[] {
  ensureSeeded();
  return read<Order[]>(KEYS.orders, seedOrders).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
export function saveOrder(order: Order) {
  const all = getOrders();
  all.unshift(order);
  write(KEYS.orders, all);
}
export function updateOrderStatus(id: string, status: Order["status"]) {
  const all = getOrders().map((o) => (o.id === id ? { ...o, status } : o));
  write(KEYS.orders, all);
}
export function deleteOrder(id: string) {
  write(KEYS.orders, getOrders().filter((o) => o.id !== id));
}

// ---------- Settings ----------
export function getSettings(): SiteSettings {
  ensureSeeded();
  return read<SiteSettings>(KEYS.settings, seedSettings);
}
export function saveSettings(settings: SiteSettings) {
  write(KEYS.settings, settings);
}

export function newId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}
