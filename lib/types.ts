// أنواع البيانات الأساسية للمشروع.
// عند الانتقال إلى Supabase/DB حقيقية، هذه الأنواع تبقى كما هي تقريبًا
// (تصبح جداول: products, categories, orders, custom_orders, settings)

export type Locale = "ar" | "en";

export interface LocalizedText {
  ar: string;
  en: string;
}

export interface ProductImage {
  id: string;
  url: string;
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  price: number;
  compareAtPrice?: number; // للعروض / الخصومات
  category: string; // categoryId
  colors: string[];
  images: ProductImage[];
  featured: boolean;
  trending: boolean;
  visible: boolean;
  order: number; // ترتيب العرض
  createdAt: string;
}

export interface Category {
  id: string;
  name: LocalizedText;
  slug: string;
}

export type OrderStatus =
  | "new"
  | "contacted"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderType = "ready" | "custom";

export interface OrderItem {
  id: string;
  type: OrderType;
  productId?: string; // لطلبات "ready"
  productName?: string;
  color?: string;
  quantity: number;
  notes?: string;
  // خاص بالطلب المخصص
  designDescription?: string;
  designFileName?: string;
  designFileDataUrl?: string; // Base64 للعرض التجريبي فقط — يجب استبداله بتخزين ملفات حقيقي (S3/Supabase Storage)
}

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  city?: string;
  address?: string;
  status: OrderStatus;
  item: OrderItem;
}

export interface DeliveryCity {
  id: string;
  name: LocalizedText;
  price: number;
  etaDays: string;
}

export interface SiteSettings {
  whatsappNumber: string;
  heroTitle: LocalizedText;
  heroTagline: LocalizedText;
  heroImage: string;
  socials: {
    instagram?: string;
    tiktok?: string;
    facebook?: string;
    whatsapp?: string;
  };
  deliveryCities: DeliveryCity[];
  navLinks: { label: LocalizedText; href: string }[];
  offersBanner: {
    enabled: boolean;
    title: LocalizedText;
    subtitle: LocalizedText;
  };
}
