"use client";

import { useEffect, useState } from "react";
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

  const { fetchRates, getSellRate } = useRateStore();

  /* ---------------- FETCH RATES ---------------- */

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  const rate = getSellRate(card.id) || 0;

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

    if (!selectedProduct) {
      setError("Please select an amount");
      return false;
    }

    if (imageFiles.length === 0) {
      setError("Please upload at least one gift card image");
      return false;
    }

    return true;
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = () => {
    if (!validateForm()) return;
    if (!selectedProduct) return;

    onSubmit(
      {
        cardNumber,
        amount,
        quantity,
        imageFiles,
      },
      selectedProduct,
    );
  };

  /* ---------------- TOTAL ---------------- */

  const total =
    selectedProduct && rate
      ? Number(selectedProduct.amount) * quantity * Number(rate)
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
        {/* CARD NUMBER */}

        <div>
          <p className="text-sm mb-2">Enter giftcard number</p>

          <input
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Enter card number"
            className="w-full h-[48px] rounded-xl bg-slate-100 px-4"
          />
        </div>

        {/* AMOUNT */}

        <div>
          <p className="text-sm mb-2">Enter amount ($)</p>

          <select
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="w-full h-[48px] rounded-xl bg-slate-100 px-4"
          >
            <option value="">Select amount</option>

            {products.map((product) => (
              <option key={product.id} value={product.amount}>
                ${product.amount}
              </option>
            ))}
          </select>
        </div>

        {/* IMAGE UPLOAD */}

        <div>
          <p className="text-sm mb-2">Upload Giftcard image</p>

          <label className="flex items-center gap-3 bg-slate-100 rounded-xl p-4 cursor-pointer">
            <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
              <Upload className="text-white w-5 h-5" />
            </div>

            <div>
              <p className="text-xs">Click here</p>
              <p className="text-[10px] text-gray-400">JPG, PNG (max 10MB)</p>
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
                <div key={i} className="relative w-16 h-16">
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
          <p className="text-sm mb-2">Quantity</p>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4 border rounded-xl px-4 py-2">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                <Minus size={16} />
              </button>

              <span>{quantity}</span>

              <button onClick={() => setQuantity((q) => q + 1)}>
                <Plus size={16} />
              </button>
            </div>

            <div className="bg-green-100 text-green-700 text-xs px-3 py-2 rounded-lg">
              ₦{rate.toLocaleString()} / $
            </div>
          </div>
        </div>

        {/* TOTAL */}

        {selectedProduct && (
          <div className="text-center">
            <p className="text-xs text-gray-500">Total Amount</p>

            <p className="text-xl font-bold">₦{total.toLocaleString()}</p>
          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* BUTTON */}

        <button
          onClick={handleSubmit}
          className="w-[70%] mx-auto block h-[48px] rounded-xl bg-green-600 text-white font-semibold"
        >
          Sell Now
        </button>
      </div>
    </div>
  );
}
