"use client";
import { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import { deleteOrder, getOrders, updateOrderStatus } from "@/lib/store";
import { Order, OrderStatus } from "@/lib/types";

const STATUSES: { value: OrderStatus; label: string }[] = [
  { value: "new", label: "جديد" },
  { value: "contacted", label: "تم التواصل" },
  { value: "confirmed", label: "مؤكد" },
  { value: "processing", label: "قيد التجهيز" },
  { value: "shipped", label: "تم الشحن" },
  { value: "delivered", label: "تم التسليم" },
  { value: "cancelled", label: "ملغي" }
];

function OrdersContent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  function refresh() {
    setOrders(getOrders());
  }
  useEffect(refresh, []);

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <h1 className="font-display text-2xl mb-6">الطلبات</h1>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs border ${filter === "all" ? "bg-brand-purple text-white dark:bg-brand-yellow dark:text-brand-ink" : "border-brand-purple/20 dark:border-brand-yellow/20"}`}
        >
          الكل
        </button>
        {STATUSES.map((s) => (
          <button
            key={s.value}
            onClick={() => setFilter(s.value)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs border ${filter === s.value ? "bg-brand-purple text-white dark:bg-brand-yellow dark:text-brand-ink" : "border-brand-purple/20 dark:border-brand-yellow/20"}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((o) => (
          <div key={o.id} className="border border-brand-purple/10 dark:border-brand-yellow/10 rounded-xl2 p-4 text-sm">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <div className="font-medium">{o.customerName} · {o.phone}</div>
              <span className="text-xs opacity-60">{new Date(o.createdAt).toLocaleString("ar")}</span>
            </div>
            <div className="opacity-80 mb-1">
              {o.item.type === "ready" ? o.item.productName : "🎨 تصميم مخصص"} · {o.item.quantity}x
              {o.item.color && ` · ${o.item.color}`}
            </div>
            {o.item.designDescription && <div className="opacity-70 mb-1">📝 {o.item.designDescription}</div>}
            {o.item.designFileName && <div className="opacity-70 mb-1">📎 {o.item.designFileName}</div>}
            {(o.city || o.address) && <div className="opacity-70 mb-1">📍 {o.city} {o.address}</div>}
            {o.item.notes && <div className="opacity-70 mb-2">🗒️ {o.item.notes}</div>}

            <div className="flex items-center gap-2 mt-3">
              <select
                value={o.status}
                onChange={(e) => {
                  updateOrderStatus(o.id, e.target.value as OrderStatus);
                  refresh();
                }}
                className="input text-xs w-auto rounded-full border border-brand-purple/20 dark:border-brand-yellow/20 px-3 py-1.5 bg-transparent"
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              <button
                onClick={() => {
                  if (confirm("حذف هذا الطلب؟")) {
                    deleteOrder(o.id);
                    refresh();
                  }
                }}
                className="text-xs text-red-500 px-3 py-1.5 rounded-full border border-red-500/20"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="opacity-60 text-sm">لا توجد طلبات.</p>}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <AdminGuard>
      <OrdersContent />
    </AdminGuard>
  );
}
