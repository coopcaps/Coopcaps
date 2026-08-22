import { Category, Order, Product, SiteSettings } from "./types";

// بيانات أولية (Seed) — تُستخدم أول مرة فقط لملء التخزين المحلي.
// في الإنتاج تُستبدل بجدول حقيقي في قاعدة البيانات يديره الـAdmin بالكامل.

export const seedCategories: Category[] = [
  { id: "cat-baseball", name: { ar: "Baseball Cap", en: "Baseball Cap" }, slug: "baseball" },
  { id: "cat-snapback", name: { ar: "Snapback", en: "Snapback" }, slug: "snapback" },
  { id: "cat-trucker", name: { ar: "Trucker Cap", en: "Trucker Cap" }, slug: "trucker" },
  { id: "cat-bucket", name: { ar: "Bucket Hat", en: "Bucket Hat" }, slug: "bucket" }
];

const img = (seed: string) => `https://picsum.photos/seed/${seed}/900/900`;

export const seedProducts: Product[] = [
  {
    id: "p-1",
    name: { ar: "قبعة CoOp Classic", en: "CoOp Classic Cap" },
    description: {
      ar: "قبعة Baseball كلاسيكية بتطريز CoOp، خامة قطنية مريحة تناسب الاستخدام اليومي.",
      en: "A classic embroidered baseball cap in soft cotton, built for everyday wear."
    },
    price: 45,
    compareAtPrice: 55,
    category: "cat-baseball",
    colors: ["Purple", "Black", "White"],
    images: [
      { id: "i1", url: img("coop-classic-1"), isPrimary: true },
      { id: "i2", url: img("coop-classic-2") },
      { id: "i3", url: img("coop-classic-3") }
    ],
    featured: true,
    trending: true,
    visible: true,
    order: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: "p-2",
    name: { ar: "Snapback Yellow Bolt", en: "Snapback Yellow Bolt" },
    description: {
      ar: "تصميم Snapback جريء بلمسة Streetwear ولون أصفر مميز يعكس هوية CoOp.",
      en: "A bold snapback with a streetwear edge and a signature CoOp yellow hit."
    },
    price: 50,
    category: "cat-snapback",
    colors: ["Yellow", "Black"],
    images: [
      { id: "i1", url: img("coop-snap-1"), isPrimary: true },
      { id: "i2", url: img("coop-snap-2") }
    ],
    featured: true,
    trending: true,
    visible: true,
    order: 2,
    createdAt: new Date().toISOString()
  },
  {
    id: "p-3",
    name: { ar: "Trucker Mesh Purple", en: "Trucker Mesh Purple" },
    description: {
      ar: "قبعة Trucker خفيفة بظهر شبكي (Mesh) مثالية للأجواء الحارة والإطلالة الرياضية.",
      en: "A breathable mesh-back trucker cap, perfect for warm days and a sporty look."
    },
    price: 40,
    category: "cat-trucker",
    colors: ["Purple", "White"],
    images: [
      { id: "i1", url: img("coop-trucker-1"), isPrimary: true },
      { id: "i2", url: img("coop-trucker-2") }
    ],
    featured: true,
    trending: false,
    visible: true,
    order: 3,
    createdAt: new Date().toISOString()
  },
  {
    id: "p-4",
    name: { ar: "Bucket Hat Drop", en: "Bucket Hat Drop" },
    description: {
      ar: "Bucket Hat بقصة عصرية وطبعة CoOp مميزة، من أكثر القطع طلبًا هذا الموسم.",
      en: "A modern-fit bucket hat with a signature CoOp print — a season favorite."
    },
    price: 42,
    category: "cat-bucket",
    colors: ["Black", "Purple"],
    images: [
      { id: "i1", url: img("coop-bucket-1"), isPrimary: true },
      { id: "i2", url: img("coop-bucket-2") }
    ],
    featured: false,
    trending: true,
    visible: true,
    order: 4,
    createdAt: new Date().toISOString()
  },
  {
    id: "p-5",
    name: { ar: "قبعة CoOp Minimal White", en: "CoOp Minimal White Cap" },
    description: {
      ar: "تصميم بسيط ونظيف بلون أبيض، مناسب لمن يفضل الإطلالة الهادئة.",
      en: "A clean minimal design in white, for a quieter everyday look."
    },
    price: 45,
    category: "cat-baseball",
    colors: ["White"],
    images: [{ id: "i1", url: img("coop-minimal-1"), isPrimary: true }],
    featured: false,
    trending: false,
    visible: true,
    order: 5,
    createdAt: new Date().toISOString()
  },
  {
    id: "p-6",
    name: { ar: "Snapback Dark Mode", en: "Snapback Dark Mode" },
    description: {
      ar: "قبعة Snapback بلون أسود كامل مع تطريز أرجواني خفيف.",
      en: "An all-black snapback with a subtle purple embroidery accent."
    },
    price: 48,
    category: "cat-snapback",
    colors: ["Black"],
    images: [{ id: "i1", url: img("coop-darksnap-1"), isPrimary: true }],
    featured: false,
    trending: false,
    visible: true,
    order: 6,
    createdAt: new Date().toISOString()
  }
];

export const seedSettings: SiteSettings = {
  whatsappNumber: "218900000000",
  heroTitle: { ar: "CoOp Caps", en: "CoOp Caps" },
  heroTagline: { ar: "قبعتك، ستايلك.", en: "Your Cap. Your Style." },
  heroImage: img("coop-hero"),
  socials: {
    instagram: "https://instagram.com/coopcaps",
    tiktok: "https://tiktok.com/@coopcaps",
    facebook: "",
    whatsapp: ""
  },
  deliveryCities: [
    { id: "d-1", name: { ar: "طرابلس", en: "Tripoli" }, price: 10, etaDays: "1-2" },
    { id: "d-2", name: { ar: "بنغازي", en: "Benghazi" }, price: 15, etaDays: "2-4" },
    { id: "d-3", name: { ar: "مصراتة", en: "Misrata" }, price: 12, etaDays: "1-3" }
  ],
  navLinks: [
    { label: { ar: "الرئيسية", en: "Home" }, href: "/" },
    { label: { ar: "القبعات", en: "Caps" }, href: "/products" },
    { label: { ar: "صمّم قبعتك", en: "Design Yours" }, href: "/custom" },
    { label: { ar: "تواصل معنا", en: "Contact" }, href: "/#contact" }
  ],
  offersBanner: {
    enabled: true,
    title: { ar: "🔥 عرض محدود", en: "🔥 Limited Offer" },
    subtitle: { ar: "خصم على قطع مختارة هذا الأسبوع", en: "Discounts on selected pieces this week" }
  }
};

export const seedOrders: Order[] = [];
