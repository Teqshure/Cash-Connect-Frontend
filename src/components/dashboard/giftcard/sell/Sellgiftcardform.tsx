"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Minus, Plus, Upload } from "lucide-react";

import { GiftCard, GiftCardProduct } from "@/store/giftCardStore";
import { useRateStore } from "@/store/rateStore";

interface Props {
  card: GiftCard;
  products: GiftCardProduct[];
  onSubmit: (data: any, product: GiftCardProduct) => void;
  onBack: () => void;
}

export default function SellGiftCardForm({
  card,
  products,
  onSubmit,
  onBack,
}: Props) {
  const [cardNumber, setCardNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] =
    useState<GiftCardProduct | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [error, setError] = useState("");

  // Custom states
  const [customBrandName, setCustomBrandName] = useState("");
  const [currency, setCurrency] = useState("USD");

  const isCustomCard = String(card.id) === "other";

  // ✅ Use the typed convenience getter
  const { fetchRateByTypeAndId, getGiftCardSellRate } = useRateStore();
  const rates = useRateStore((state: any) => state.rates);

  /* ---------------- FETCH RATES ---------------- */

  useEffect(() => {
    fetchRateByTypeAndId("gift_card", "other");
  }, [fetchRateByTypeAndId]);

  // ✅ All cards are bought at the same rate (the "Other" card's rate)
  const rate = useMemo(() => {
    const otherRateObj = rates.find(
      (r: any) =>
        (r.rateable_type || "").toLowerCase().includes("gift") &&
        (String(r.rateable_id) === "other" ||
          r.rateable?.name === "Other")
    );
    if (otherRateObj) return Number(otherRateObj.sell_rate) || 500;
    
    // Fallback to first available giftcard rate in store
    const fallbackRate = rates.find((r: any) => (r.rateable_type || "").toLowerCase().includes("gift"));
    return fallbackRate ? Number(fallbackRate.sell_rate) || 500 : 500;
  }, [rates]);

  /* ---------------- AMOUNT CHANGE ---------------- */

  const handleAmountChange = (value: string) => {
    setAmount(value);
    setError("");
    const product = products.find((p) => String(p.amount) === String(value));
    setSelectedProduct(product || null);
  };

  /* ---------------- IMAGE UPLOAD ---------------- */

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const invalidFiles = files.filter((file) => file.size > 10 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      setError("Some files exceed the 10MB limit");
      return;
    }

    setError("");
    setImageFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    setImagePreviews(previews);
  };

  /* ---------------- VALIDATION ---------------- */

  const validateForm = () => {
    if (!cardNumber.trim()) {
      setError("Please enter the gift card number");
      return false;
    }
    if (!amount.trim() || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return false;
    }
    if (imageFiles.length === 0) {
      setError("Please upload at least one gift card image");
      return false;
    }
    if (isCustomCard && !customBrandName.trim()) {
      setError("Please enter the gift card brand name");
      return false;
    }
    return true;
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = () => {
    if (!validateForm()) return;

    onSubmit(
      {
        cardNumber,
        amount,
        quantity,
        imageFiles,
        customBrandName: isCustomCard ? customBrandName : undefined,
        currency: isCustomCard ? currency : undefined,
      },
      {
        id: selectedProduct?.id || 0,
        gift_card_id: card.id,
        amount: String(amount),
        currency: isCustomCard ? currency : "USD",
        quantity: quantity,
        card_code: cardNumber,
        card_pin: cardNumber,
        card_details: null,
        is_active: 1,
        created_at: "",
        updated_at: "",
      }
    );
  };

  /* ---------------- TOTAL ---------------- */

  const total = amount && rate && !isNaN(Number(amount))
    ? Number(amount) * quantity * Number(rate)
    : 0;

  /* ---------------- CLEANUP ---------------- */

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  return (
    <div className="w-full max-w-md mx-auto">
      <button onClick={onBack} className="mb-6 text-sm">
        ← Back
      </button>

      <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
        {/* CUSTOM BRAND NAME */}
        {isCustomCard && (
          <div>
            <p className="text-sm mb-2 font-medium text-slate-700">Enter Brand Name</p>
            <input
              value={customBrandName}
              onChange={(e) => setCustomBrandName(e.target.value)}
              placeholder="e.g. Sephora, Best Buy"
              className="w-full h-[48px] rounded-xl bg-slate-100 px-4 text-sm outline-none focus:bg-white border border-transparent focus:border-emerald-500 transition"
            />
          </div>
        )}

        {/* CUSTOM CURRENCY */}
        {isCustomCard && (
          <div>
            <p className="text-sm mb-2 font-medium text-slate-700">Select Currency</p>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full h-[48px] rounded-xl bg-slate-100 px-4 text-sm outline-none focus:bg-white border border-transparent focus:border-emerald-500 transition"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD (CA$)</option>
              <option value="AUD">AUD (A$)</option>
            </select>
          </div>
        )}

        {/* CARD NUMBER */}
        <div>
          <p className="text-sm mb-2 font-medium text-slate-700">Enter giftcard number</p>
          <input
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Enter card number / code"
            className="w-full h-[48px] rounded-xl bg-slate-100 px-4 text-sm outline-none focus:bg-white border border-transparent focus:border-emerald-500 transition"
          />
        </div>

        {/* AMOUNT */}
        <div>
          <p className="text-sm mb-2 font-medium text-slate-700">
            Enter amount ({isCustomCard ? currency : "USD"})
          </p>
          <input
            type="number"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="e.g. 100"
            className="w-full h-[48px] rounded-xl bg-slate-100 px-4 text-sm outline-none focus:bg-white border border-transparent focus:border-emerald-500 transition"
          />
          {/* Preset Suggestions */}
          {!isCustomCard && products.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {products.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleAmountChange(String(p.amount))}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition ${
                    amount === String(p.amount)
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                >
                  ${p.amount}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <p className="text-sm mb-2 font-medium text-slate-700">Upload Giftcard image</p>
          <label className="flex items-center gap-3 bg-slate-100 rounded-xl p-4 cursor-pointer hover:bg-slate-200/50 transition">
            <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center">
              <Upload className="text-white w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700">Click here to upload</p>
              <p className="text-[10px] text-slate-400">JPG, PNG (max 10MB)</p>
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          {imagePreviews.length > 0 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {imagePreviews.map((src, i) => (
                <div key={i} className="relative w-16 h-16 border border-slate-100 rounded-lg overflow-hidden">
                  <Image
                    src={src}
                    alt="Giftcard preview"
                    fill
                    sizes="64px"
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* QUANTITY */}
        <div>
          <p className="text-sm mb-2 font-medium text-slate-700">Quantity</p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4 border border-slate-200 rounded-xl px-4 py-2 bg-white">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-slate-500 hover:text-slate-800"
              >
                <Minus size={16} />
              </button>
              <span className="font-semibold text-slate-800 w-4 text-center text-sm">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="text-slate-500 hover:text-slate-800"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="bg-emerald-50 text-emerald-700 text-xs px-3 py-2 rounded-lg font-semibold border border-emerald-100">
              {rate > 0 ? `₦${rate.toLocaleString()} / $` : "Loading rate..."}
            </div>
          </div>
        </div>

        {/* TOTAL */}
        {total > 0 && (
          <div className="text-center bg-slate-50 rounded-xl py-3 border border-slate-100">
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Total Amount</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">₦{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-medium border border-red-100">
            {error}
          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full h-[52px] rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition cursor-pointer text-sm shadow-md"
        >
          Sell Now
        </button>
      </div>
    </div>
  );
}
