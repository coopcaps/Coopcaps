import { Locale, Order } from "./types";

// يبني رسالة الطلب ورابط واتساب. رقم الواتساب قادم من الـSettings (قابل للتعديل من الـAdmin)
// وليس Hard-coded في الواجهة، كما هو مطلوب في البريف.

export function buildOrderMessage(order: Order, locale: Locale): string {
  const lines: string[] = [];

  if (locale === "ar") {
    lines.push("السلام عليكم، أريد طلب قبعة من CoOp Caps.");
    lines.push("");
    if (order.item.type === "ready") {
      lines.push(`المنتج: ${order.item.productName ?? "-"}`);
      if (order.item.color) lines.push(`اللون: ${order.item.color}`);
    } else {
      lines.push("نوع الطلب: تصميم مخصص (Custom Design)");
      if (order.item.color) lines.push(`لون القبعة: ${order.item.color}`);
      if (order.item.designDescription) lines.push(`وصف التصميم: ${order.item.designDescription}`);
      if (order.item.designFileName) lines.push(`الملف المرفق: ${order.item.designFileName}`);
    }
    lines.push(`الكمية: ${order.item.quantity}`);
    lines.push("");
    lines.push(`الاسم: ${order.customerName}`);
    lines.push(`رقم الهاتف: ${order.phone}`);
    if (order.city) lines.push(`المدينة: ${order.city}`);
    if (order.address) lines.push(`العنوان: ${order.address}`);
    if (order.item.notes) lines.push(`ملاحظات: ${order.item.notes}`);
  } else {
    lines.push("Hi, I'd like to order a cap from CoOp Caps.");
    lines.push("");
    if (order.item.type === "ready") {
      lines.push(`Product: ${order.item.productName ?? "-"}`);
      if (order.item.color) lines.push(`Color: ${order.item.color}`);
    } else {
      lines.push("Order type: Custom Design");
      if (order.item.color) lines.push(`Cap color: ${order.item.color}`);
      if (order.item.designDescription) lines.push(`Design description: ${order.item.designDescription}`);
      if (order.item.designFileName) lines.push(`Attached file: ${order.item.designFileName}`);
    }
    lines.push(`Quantity: ${order.item.quantity}`);
    lines.push("");
    lines.push(`Name: ${order.customerName}`);
    lines.push(`Phone: ${order.phone}`);
    if (order.city) lines.push(`City: ${order.city}`);
    if (order.address) lines.push(`Address: ${order.address}`);
    if (order.item.notes) lines.push(`Notes: ${order.item.notes}`);
  }

  return lines.join("\n");
}

export function buildWhatsappLink(whatsappNumber: string, message: string): string {
  const digitsOnly = whatsappNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
}
