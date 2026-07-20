"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Minus, Plus, Upload, CheckCircle } from "lucide-react";

import { GiftCard, GiftCardProduct } from "@/store/giftCardStore";
import { useRateStore } from "@/store/rateStore";

interface Props {
  card: GiftCard;
  products: GiftCardProduct[];
  onSubmit: (data: any, product: GiftCardProduct) => void;
  onBack: () => void;
}

const DEFAULT_DENOMINATIONS = [25, 50, 100, 200, 500];

export default function SellGiftCardForm({
  card,
  products,
  onSubmit,
  onBack,
}: Props) {
  // Card Type state: 'physical' or 'ecode'
  const [cardType, setCardType] = useState<"physical" | "ecode">("physical");

  // Form states
  const [cardNumber, setCardNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [customAmountActive, setCustomAmountActive] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<GiftCardProduct | null>(null);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [error, setError] = useState("");

  // Custom brand states
  const [customBrandName, setCustomBrandName] = useState("");
  const [currency, setCurrency] = useState("USD");

  const isCustomCard = String(card.id) === "other";

  // Available denomination values
  const presetValues = useMemo(() => {
    if (!isCustomCard && products && products.length > 0) {
      const productAmounts = products
        .map((p) => Number(p.amount))
        .filter((a) => !isNaN(a) && a > 0);
      if (productAmounts.length > 0) {
        return Array.from(new Set([...productAmounts, ...DEFAULT_DENOMINATIONS])).sort((a, b) => a - b);
      }
    }
    return DEFAULT_DENOMINATIONS;
  }, [isCustomCard, products]);

  // Rate store
  const { fetchRateByTypeAndId } = useRateStore();
  const rates = useRateStore((state: any) => state.rates);

  useEffect(() => {
    fetchRateByTypeAndId("gift_card", "other");
  }, [fetchRateByTypeAndId]);

  const rate = useMemo(() => {
    const otherRateObj = rates.find(
      (r: any) =>
        (r.rateable_type || "").toLowerCase().includes("gift") &&
        (String(r.rateable_id) === "other" || r.rateable?.name === "Other")
    );
    if (otherRateObj) return Number(otherRateObj.sell_rate) || 500;

    const fallbackRate = rates.find((r: any) =>
      (r.rateable_type || "").toLowerCase().includes("gift")
    );
    return fallbackRate ? Number(fallbackRate.sell_rate) || 500 : 500;
  }, [rates]);

  /* ---------------- AMOUNT CHANGE ---------------- */

  const handleAmountChange = (value: string) => {
    setAmount(value);
    setError("");
    const product = products.find((p) => String(p.amount) === String(value));
    setSelectedProduct(product || null);
  };

  /* ---------------- IMAGE UPLOAD (MAX 5MB) ---------------- */

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // 5MB max file size validation
    const invalidFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      setError("File size exceeds the 5MB limit. Please upload smaller images.");
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
    if (isCustomCard && !customBrandName.trim()) {
      setError("Please enter the gift card brand name");
      return false;
    }

    if (!amount.trim() || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please select or enter a valid gift card amount");
      return false;
    }

    if (cardType === "ecode") {
      if (!cardNumber.trim()) {
        setError("Please enter the E-code / gift card code");
        return false;
      }
    } else {
      // Physical Card
      if (imageFiles.length === 0) {
        setError("Please upload at least one gift card image for physical card verification");
        return false;
      }
    }

    return true;
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = () => {
    if (!validateForm()) return;

    onSubmit(
      {
        cardType,
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
        card_code: cardNumber || (cardType === "physical" ? "PHYSICAL" : ""),
        card_pin: cardNumber || (cardType === "physical" ? "PHYSICAL" : ""),
        card_details: null,
        is_active: 1,
        created_at: "",
        updated_at: "",
      }
    );
  };

  /* ---------------- TOTAL ---------------- */

  const total =
    amount && rate && !isNaN(Number(amount))
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
      <button
        onClick={onBack}
        className="mb-6 text-sm text-slate-500 hover:text-slate-800 transition flex items-center gap-1"
      >
        ← Back to Gift Cards
      </button>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-slate-800">Sell {card.name}</h2>
          <p className="text-xs text-slate-500 mt-0.5">Fill in the details to exchange your card for cash</p>
        </div>

        {/* 1. CARD TYPE SELECTOR */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            What card type do you want to sell?
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setCardType("physical");
                setError("");
              }}
              className={`h-[50px] rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                cardType === "physical"
                  ? "bg-emerald-50 border-emerald-600 text-emerald-700 shadow-sm"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cardType === "physical" && <CheckCircle className="w-4 h-4 text-emerald-600" />}
              <span>Physical Card</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCardType("ecode");
                setError("");
              }}
              className={`h-[50px] rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                cardType === "ecode"
                  ? "bg-emerald-50 border-emerald-600 text-emerald-700 shadow-sm"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cardType === "ecode" && <CheckCircle className="w-4 h-4 text-emerald-600" />}
              <span>E-code</span>
            </button>
          </div>
        </div>

        {/* CUSTOM BRAND NAME (if Other) */}
        {isCustomCard && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Enter Brand Name</p>
            <input
              value={customBrandName}
              onChange={(e) => setCustomBrandName(e.target.value)}
              placeholder="e.g. Sephora, Best Buy, Target"
              className="w-full h-[48px] rounded-xl bg-slate-50 px-4 text-sm outline-none focus:bg-white border border-slate-200 focus:border-emerald-500 transition"
            />
          </div>
        )}

        {/* CUSTOM CURRENCY (if Other) */}
        {isCustomCard && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Select Currency</p>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full h-[48px] rounded-xl bg-slate-50 px-4 text-sm outline-none focus:bg-white border border-slate-200 focus:border-emerald-500 transition cursor-pointer"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD (CA$)</option>
              <option value="AUD">AUD (A$)</option>
            </select>
          </div>
        )}

        {/* 2. SELECT GIFT CARD VALUE / DENOMINATIONS */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Gift Card Value ({isCustomCard ? currency : "USD"})
            </p>
            {amount && (
              <span className="text-xs font-bold text-emerald-600">${amount}</span>
            )}
          </div>

          {/* Preset Value Chips */}
          <div className="flex gap-2 mb-3 flex-wrap">
            {presetValues.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => {
                  handleAmountChange(String(val));
                  setCustomAmountActive(false);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  amount === String(val) && !customAmountActive
                    ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                ${val}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setCustomAmountActive(true);
                if (presetValues.includes(Number(amount))) {
                  setAmount("");
                }
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                customAmountActive || (amount && !presetValues.includes(Number(amount)))
                  ? "border-emerald-600 bg-emerald-50 text-emerald-700 font-bold"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              Custom Value
            </button>
          </div>

          {/* Custom Amount Field */}
          {(customAmountActive || (amount && !presetValues.includes(Number(amount)))) && (
            <div className="mt-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  handleAmountChange(e.target.value);
                  if (!presetValues.includes(Number(e.target.value))) {
                    setCustomAmountActive(true);
                  }
                }}
                placeholder="Enter custom amount (e.g. 150)"
                className="w-full h-[48px] rounded-xl bg-slate-50 px-4 text-sm outline-none focus:bg-white border border-slate-200 focus:border-emerald-500 transition"
              />
            </div>
          )}
        </div>

        {/* 3. CONDITIONAL CODE ENTRY VS IMAGE UPLOAD */}
        {cardType === "ecode" ? (
          /* E-CODE ENTRY */
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Enter E-code / Gift Card Code *
            </p>
            <input
              value={cardNumber}
              onChange={(e) => {
                setCardNumber(e.target.value);
                setError("");
              }}
              placeholder="Enter E-code / claim code / PIN"
              className="w-full h-[48px] rounded-xl bg-slate-50 px-4 text-sm font-mono outline-none focus:bg-white border border-slate-200 focus:border-emerald-500 transition"
            />
          </div>
        ) : (
          /* PHYSICAL CARD IMAGE UPLOAD & OPTIONAL CODE */
          <>
            {/* PHYSICAL IMAGE UPLOAD (MAX 5MB) */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Upload Gift Card Image * (Max 5MB)
              </p>
              <label className="flex items-center gap-3 bg-slate-50 rounded-xl p-4 cursor-pointer hover:bg-slate-100 transition border border-dashed border-slate-300">
                <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                  <Upload className="text-white w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-700">Click to upload gift card image</p>
                  <p className="text-[10px] text-slate-400">JPG, PNG (max 5MB per file)</p>
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
                    <div key={i} className="relative w-16 h-16 border border-slate-200 rounded-lg overflow-hidden shadow-sm">
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

            {/* OPTIONAL CODE ENTRY FOR PHYSICAL */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Enter Gift Card Number / Code (Optional)
              </p>
              <input
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Enter card code or PIN if readable"
                className="w-full h-[48px] rounded-xl bg-slate-50 px-4 text-sm outline-none focus:bg-white border border-slate-200 focus:border-emerald-500 transition"
              />
            </div>
          </>
        )}

        {/* QUANTITY */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Quantity</p>
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

        {/* TOTAL PAYOUT */}
        {total > 0 && (
          <div className="text-center bg-slate-50 rounded-xl py-3 border border-slate-100">
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Total Payout Amount</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">₦{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-medium border border-red-100">
            {error}
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full h-[52px] rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition cursor-pointer text-sm shadow-md"
        >
          Sell Now
        </button>
      </div>
    </div>
  );
}
