"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { attemptLogin, isAdminAuthed } from "@/lib/adminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAdminAuthed()) router.replace("/admin/dashboard");
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (attemptLogin(password)) {
      router.replace("/admin/dashboard");
    } else {
      setError("كلمة المرور غير صحيحة");
    }
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-20">
      <h1 className="font-display text-2xl mb-6 text-center">لوحة تحكم CoOp Caps</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="text-sm">
          <span className="block mb-1 font-medium">كلمة المرور</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus-ring w-full rounded-lg border border-brand-purple/20 dark:border-brand-yellow/20 bg-transparent px-3 py-2"
            autoFocus
          />
        </label>
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <button
          type="submit"
          className="focus-ring w-full py-3 rounded-full bg-brand-purple text-white dark:bg-brand-yellow dark:text-brand-ink font-semibold"
        >
          دخول
        </button>
        <p className="text-xs opacity-50 text-center mt-2">
          هذا دخول تجريبي (Demo) — يجب استبداله بنظام Auth حقيقي قبل الإطلاق.
        </p>
      </form>
    </div>
  );
}
