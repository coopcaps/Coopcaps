"use client";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import OrderModal from "@/components/OrderModal";

const COLORS = ["Purple", "Yellow", "Black", "White"];
const MAX_FILE_MB = 8;
const ACCEPTED = ".jpg,.jpeg,.png,.webp,.pdf,.svg";

export default function CustomOrderPage() {
  const { t } = useLanguage();
  const [color, setColor] = useState(COLORS[0]);
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState<string | undefined>();
  const [fileDataUrl, setFileDataUrl] = useState<string | undefined>();
  const [fileError, setFileError] = useState("");
  const [showOrder, setShowOrder] = useState(false);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setFileError(`${t("required")} (max ${MAX_FILE_MB}MB)`);
      return;
    }
    setFileError("");
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setFileDataUrl(reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl mb-2">{t("customDesignTitle")}</h1>
      <p className="opacity-70 mb-8">{t("customDesignDesc")}</p>

      <div className="mb-6">
        <div className="text-sm font-medium mb-2">{t("chooseColor")}</div>
        <div className="flex gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`focus-ring px-4 py-2 rounded-full text-sm border ${
                color === c
                  ? "bg-brand-purple text-white border-brand-purple dark:bg-brand-yellow dark:text-brand-ink dark:border-brand-yellow"
                  : "border-brand-purple/20 dark:border-brand-yellow/20"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm font-medium mb-2">{t("uploadDesign")}</div>
        <label className="focus-ring flex flex-col items-center justify-center gap-2 border-2 border-dashed border-brand-purple/30 dark:border-brand-yellow/30 rounded-xl2 p-8 cursor-pointer hover:bg-brand-purple/5 dark:hover:bg-brand-yellow/5 text-center">
          <span className="text-3xl">📎</span>
          <span className="text-sm font-medium">{fileName ?? t("uploadDesign")}</span>
          <span className="text-xs opacity-60">{t("uploadHint")}</span>
          <input type="file" accept={ACCEPTED} onChange={handleFile} className="hidden" />
        </label>
        {fileError && <p className="text-red-500 text-xs mt-2">{fileError}</p>}
      </div>

      <label className="block mb-8 text-sm">
        <span className="block mb-2 font-medium">{t("designDescription")}</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="focus-ring w-full rounded-lg border border-brand-purple/20 dark:border-brand-yellow/20 bg-transparent px-3 py-2"
        />
      </label>

      <button
        onClick={() => setShowOrder(true)}
        className="focus-ring w-full py-3 rounded-full bg-brand-purple text-white dark:bg-brand-yellow dark:text-brand-ink font-semibold"
      >
        {t("submitOrder")}
      </button>

      {showOrder && (
        <OrderModal
          item={{
            id: "item-custom-" + Date.now(),
            type: "custom",
            color,
            quantity: 1,
            designDescription: description || undefined,
            designFileName: fileName,
            designFileDataUrl: fileDataUrl
          }}
          onClose={() => setShowOrder(false)}
        />
      )}
    </div>
  );
}
