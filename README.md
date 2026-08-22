# CoOp Caps

موقع عرض وطلب قبعات (Baseball, Snapback, Trucker, Bucket Hat) — Next.js 14 + TypeScript + Tailwind CSS، ثنائي اللغة (عربي/إنجليزي، RTL/LTR)، Dark/Light Mode، Mobile First، مع لوحة تحكم Admin وطلب عبر WhatsApp.

هذا المشروع هو **النسخة الأولى (MVP)** كما هو موصوف في البريف: Catalog + Product Showcase + Simple Orders + WhatsApp + Custom Order + Admin Dashboard — وليس متجرًا إلكترونيًا كاملاً.

## التشغيل محليًا

```bash
npm install
cp .env.example .env.local
npm run dev
```

الموقع: http://localhost:3000
لوحة التحكم: http://localhost:3000/admin (كلمة المرور الافتراضية في `.env.local`: `coopcaps2026`)

## ⚠️ نقطة مهمة جدًا قبل الإطلاق: طبقة البيانات

في هذه النسخة، كل البيانات (المنتجات، الطلبات، الإعدادات) تُخزَّن في **localStorage** داخل متصفح المستخدم — وذلك لتشغيل المشروع كاملاً بدون Backend حقيقي في المرحلة الأولى، وللسماح لك بتجربة كل الميزات فورًا.

هذا يعني:
- بيانات الـAdmin على جهازك لا تظهر تلقائيًا عند عميل آخر يفتح الموقع من جهازه.
- **يجب استبدال طبقة `lib/store.ts` بقاعدة بيانات حقيقية قبل الإطلاق الفعلي.**

كل دوال الواجهة (الصفحات والمكوّنات) تستدعي فقط دوال `lib/store.ts`
(`getProducts`, `saveProduct`, `getOrders`, `saveOrder`, `getSettings`, ...) — لذلك الربط بـ Backend حقيقي يتم في ملف واحد فقط، بدون تعديل أي صفحة.

المقترح: **Supabase** (Postgres + Auth + Storage) لأنه يغطي:
- قاعدة بيانات للمنتجات/الطلبات/الإعدادات (بدل localStorage)
- Supabase Auth بدل `lib/adminAuth.ts` التجريبي (راجع التحذير داخل الملف)
- Supabase Storage لرفع ملفات التصميم المخصص بدل Base64 المخزّن محليًا حاليًا

## بنية المشروع

```
app/
  page.tsx                 → الصفحة الرئيسية (Hero, Featured, Trending, Offers)
  products/page.tsx        → قائمة القبعات + فلترة حسب التصنيف
  products/[id]/page.tsx   → صفحة المنتج (Gallery, ألوان, طلب)
  custom/page.tsx          → صمّم قبعتك (رفع صورة/تصميم + وصف)
  admin/                   → لوحة التحكم (محمية بتسجيل دخول تجريبي)
    page.tsx               → تسجيل الدخول
    dashboard/              → نظرة عامة
    products/               → إدارة المنتجات (CRUD)
    orders/                  → إدارة الطلبات + تغيير الحالة
    settings/                → واتساب، Hero، Social، مدن التوصيل، العروض
components/                 → مكوّنات مشتركة (Navbar, Footer, ProductCard, OrderModal...)
contexts/                   → Theme (Dark/Light) و Language (AR/EN)
lib/
  types.ts                 → أنواع البيانات (تقابل تقريبًا جداول قاعدة البيانات المستقبلية)
  store.ts                 → طبقة التخزين (localStorage الآن → استبدلها بـ API حقيقي)
  seed.ts                  → بيانات تجريبية أولية
  i18n.ts                  → نصوص الواجهة بالعربي/الإنجليزي
  whatsapp.ts               → بناء رسالة الطلب ورابط واتساب
  adminAuth.ts               → دخول تجريبي — استبدله بنظام Auth حقيقي (راجع التحذير في الملف)
```

## ما تم تنفيذه من البريف (النسخة الأولى)

- هوية بصرية Purple + Yellow، Streetwear/Modern، Dark & Light Mode متناسقين، محفوظة في localStorage.
- Mobile First بالكامل، مع Grid يتكيف من عمودين على الهاتف إلى 4 على الشاشات الكبيرة.
- Home: Navbar قابل للتعديل من الإعدادات، Hero، شريط عروض، Featured، Trending، CTA للتصميم المخصص.
- صفحة منتج: Gallery صور متعددة، ألوان، كمية، ملاحظات، طلب.
- صفحة "صمّم قبعتك": اختيار لون، رفع ملف (JPG/PNG/WEBP/PDF/SVG) بحد أقصى للحجم، وصف التصميم.
- الطلب: نافذة طلب بسيطة (اسم + هاتف إجباري، مدينة/عنوان اختياري) → تُبنى رسالة تلقائيًا وتُفتح على WhatsApp، ويُحفظ الطلب في "قاعدة البيانات" (localStorage حاليًا).
- Admin Dashboard: نظرة عامة، إدارة منتجات (إضافة/تعديل/حذف/إظهار-إخفاء/Featured/Trending)، إدارة طلبات (تغيير الحالة عبر الحالات السبع المطلوبة، حذف)، إعدادات (رقم واتساب، نصوص Hero، Social، مدن التوصيل والأسعار، تفعيل شريط العروض).
- لا شيء Hard-coded في الواجهة: رقم واتساب، روابط Social، مدن التوصيل، نصوص Hero، روابط Navbar — كلها من الإعدادات القابلة للتعديل.
- SEO أساسي: Metadata, Open Graph, robots.ts, sitemap.ts, Semantic HTML, next/image لتحسين الصور.
- بنية Modular تسمح بإضافة تصنيفات/أنواع طلب/طرق دفع مستقبلًا بدون إعادة بناء.

## ما لم يُنفَّذ بعد (يحتاج قرارًا تقنيًا/Backend حقيقي)

- Backend/Database حقيقي (Supabase أو غيره) بدل localStorage.
- نظام Auth حقيقي للـAdmin (راجع `lib/adminAuth.ts`).
- تخزين ملفات حقيقي لصور التصميم المخصص (بدل Base64 المحلي).
- بحث المنتجات (Search) — مؤجل حسب البريف.
- صلاحيات متعددة (Super Admin / Editor).

## النشر (Deployment)

- Frontend: Vercel (رفع المجلد كما هو، إعداد Environment Variables من `.env.example`).
- Database/Storage: يُحدَّد عند اختيار Supabase أو بديل آخر.
- الدومين: يُحدَّد لاحقًا.
