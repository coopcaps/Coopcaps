"use client";
import { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import { getOrders, getProducts } from "@/lib/store";
import { Order, Product } from "@/lib/types";

function DashboardContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setProducts(getProducts());
    setOrders(getOrders());
  }, []);

  const newOrders = orders.filter((o) => o.status === "new").length;
  const stats = [
    { label: "المنتجات", value: products.length },
    { label: "إجمالي الطلبات", value: orders.length },
    { label: "طلبات جديدة", value: newOrders },
    { label: "طلبات مخصصة", value: orders.filter((o) => o.item.type === "custom").length }
  ];

  return (
    <div>
      <h1 className="font-display text-2xl mb-6">نظرة عامة</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl2 border border-brand-purple/10 dark:border-brand-yellow/10 p-4"
          >
            <div className="text-2xl font-display text-brand-purple dark:text-brand-yellow">{s.value}</div>
            <div className="text-sm opacity-70">{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="font-semibold mb-3">آخر الطلبات</h2>
      <div className="flex flex-col divide-y divide-brand-purple/10 dark:divide-brand-yellow/10 border border-brand-purple/10 dark:border-brand-yellow/10 rounded-xl2 overflow-hidden">
        {orders.slice(0, 5).map((o) => (
          <div key={o.id} className="p-3 flex items-center justify-between text-sm">
            <div>
              <div className="font-medium">{o.customerName}</div>
              <div className="opacity-60">{o.item.productName ?? "تصميم مخصص"} · {o.item.quantity}x</div>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-brand-purple/10 dark:bg-brand-yellow/10">
              {o.status}
            </span>
          </div>
        ))}
        {orders.length === 0 && <div className="p-4 text-sm opacity-60">لا توجد طلبات بعد.</div>}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AdminGuard>
      <DashboardContent />
    </AdminGuard>
  );
}
