"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { isAdminAuthed, logoutAdmin } from "@/lib/adminAuth";

const NAV = [
  { href: "/admin/dashboard", label: "نظرة عامة" },
  { href: "/admin/products", label: "المنتجات" },
  { href: "/admin/orders", label: "الطلبات" },
  { href: "/admin/settings", label: "الإعدادات" }
];

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAdminAuthed()) {
      router.replace("/admin");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-[200px_1fr] gap-8">
      <aside className="flex md:flex-col gap-2 overflow-x-auto">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`focus-ring shrink-0 px-4 py-2 rounded-lg text-sm font-medium ${
              pathname === item.href
                ? "bg-brand-purple text-white dark:bg-brand-yellow dark:text-brand-ink"
                : "hover:bg-brand-purple/5 dark:hover:bg-brand-yellow/10"
            }`}
          >
            {item.label}
          </Link>
        ))}
        <button
          onClick={() => {
            logoutAdmin();
            router.replace("/admin");
          }}
          className="focus-ring shrink-0 px-4 py-2 rounded-lg text-sm font-medium text-start opacity-70 hover:opacity-100"
        >
          تسجيل الخروج
        </button>
      </aside>
      <div>{children}</div>
    </div>
  );
}
