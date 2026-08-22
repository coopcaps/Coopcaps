// Server Component — required for generateStaticParams in static export
import { Suspense } from "react";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return [
    { id: "p-1" }, { id: "p-2" }, { id: "p-3" },
    { id: "p-4" }, { id: "p-5" }, { id: "p-6" },
  ];
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={null}>
      <ProductDetailClient />
    </Suspense>
  );
}
