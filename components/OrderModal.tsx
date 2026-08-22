"use client";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSettings, newId, saveOrder } from "@/lib/store";
import { Order, OrderItem } from "@/lib/types";
import { buildOrderMessage, buildWhatsappLink } from "@/lib/whatsapp";

export default function OrderModal({
  item,
  onClose
}: {
  item: OrderItem;
  onClose: () => void;
}) {
  const { locale, t } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const settings = getSettings();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError(t("required"));
      return;
    }
    const order: Order = {
      id: newId("order"),
      createdAt: new Date().toISOString(),
      customerName: name.trim(),
      phone: phone.trim(),
      city: city.trim() || undefined,
      address: address.trim() || undefined,
      status: "new",
      item
    };
    saveOrder(order);
    const message = buildOrderMessage(order, locale);
    const link = buildWhatsappLink(settings.whatsappNumber, message);
    window.open(link, "_blank");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4">
      <div className="bg-brand-paper dark:bg-brand-ink w-full sm:max-w-md sm:rounded-xl2 rounded-t-2xl p-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg">{t("orderNow")}</h2>
          <button onClick={onClose} className="focus-ring text-sm opacity-60 hover:opacity-100">
            ✕ {t("close")}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Field label={t("customerName")} value={name} onChange={setName} required />
          <Field label={t("phone")} value={phone} onChange={setPhone} required type="tel" />
          <Field label={t("city")} value={city} onChange={setCity} />
          <Field label={t("address")} value={address} onChange={setAddress} />

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="submit"
            className="focus-ring mt-2 w-full py-3 rounded-full bg-brand-purple text-white dark:bg-brand-yellow dark:text-brand-ink font-semibold flex items-center justify-center gap-2"
          >
            {t("orderViaWhatsapp")} 💬
          </button>
          <p className="text-xs opacity-60 text-center">{t("cashOnDelivery")} · {t("deliveryAllLibya")}</p>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="text-sm">
      <span className="block mb-1 font-medium">
        {label} {required && <span className="text-brand-yellow">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="focus-ring w-full rounded-lg border border-brand-purple/20 dark:border-brand-yellow/20 bg-transparent px-3 py-2"
      />
    </label>
  );
}
