"use client";

// ==========================================================================
// !! تحذير أمان مهم !!
// هذا نظام دخول تجريبي فقط (كلمة مرور ثابتة تُقارن في المتصفح) لغرض تشغيل
// الـDemo والتصميم. وهو غير آمن للإنتاج لأن كلمة المرور تصل إلى الـClient.
//
// قبل الإطلاق الحقيقي، استبدل هذا الملف بنظام Auth حقيقي، مثل:
//   - Supabase Auth (Email/Password أو Magic Link) + Row Level Security
//   - أو NextAuth.js مع مزود مناسب
// ويجب أن يتم التحقق من الجلسة على الخادم (Middleware/Server Components)
// وليس فقط في المتصفح كما هنا.
// ==========================================================================

const SESSION_KEY = "coopcaps_admin_session";

export function attemptLogin(password: string): boolean {
  const expected = process.env.NEXT_PUBLIC_ADMIN_DEMO_PASSWORD ?? "coopcaps2026";
  const ok = password === expected;
  if (ok && typeof window !== "undefined") {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  }
  return ok;
}

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(SESSION_KEY) === "1";
}

export function logoutAdmin() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(SESSION_KEY);
}
