"use client";

import { useState } from "react";
import { Minus, Plus, Upload } from "lucide-react";
import { GiftCard, GiftCardProduct } from "@/store/giftCardStore";

type Props = {
  card: GiftCard;
  products: GiftCardProduct[];
  onSubmit: (data: any, selectedProduct: GiftCardProduct) => void;
  onBack: () => void;
};

export default function SellGiftCardForm({
  card,
  products,
  onSubmit,
  onBack,
}: Props) {
  const [cardNumber, setCardNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState(2);
  const [selectedProduct, setSelectedProduct] =
    useState<GiftCardProduct | null>(null);

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const match = products.find(
      (p) => parseFloat(p.amount) === parseFloat(value),
    );
    setSelectedProduct(match || null);
  };

  const total = selectedProduct
    ? parseFloat(selectedProduct.amount) * quantity * 1450
    : 0;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Back */}
      <button
        onClick={onBack}
        className="text-[14px] text-slate-600 mb-6 cursor-pointer"
      >
        ← Back
      </button>

      {/* MAIN CARD */}
      <div className="bg-white rounded-[24px] shadow-sm px-6 py-6 space-y-6">
        {/* Card Number */}
        <div>
          <p className="text-[14px] text-slate-700 mb-2">
            Enter giftcard number
          </p>
          <input
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Enter card number"
            className="w-full h-[50px] rounded-[12px] bg-slate-100 px-4 text-[14px] outline-none"
          />
        </div>

        {/* Amount */}
        <div>
          <p className="text-[14px] text-slate-700 mb-2">Enter amount in ($)</p>
          <select
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="w-full h-[50px] rounded-[12px] bg-slate-100 px-4 text-[14px] outline-none"
          >
            <option value="">$200</option>
            {products.map((p) => (
              <option key={p.id} value={p.amount}>
                ${p.amount}
              </option>
            ))}
          </select>
        </div>

        {/* Upload */}
        <div>
          <p className="text-[14px] text-slate-700 mb-2">
            Upload Giftcard image
          </p>

          <label className="flex items-center gap-3 bg-slate-100 rounded-[12px] px-4 py-4 cursor-pointer">
            <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center">
              <Upload className="text-white w-5 h-5" />
            </div>

            <div>
              <p className="text-[13px] text-slate-700">Click here -</p>
              <p className="text-[11px] text-slate-400">
                Supported Format: SVG, JPG, PNG (10mb each)
              </p>
            </div>

            <input type="file" className="hidden" />
          </label>
        </div>

        {/* Quantity + Rate */}
        <div>
          <p className="text-[14px] text-slate-700 mb-2">Quantity</p>

          <div className="flex items-center gap-3">
            {/* Counter */}
            <div className="flex items-center border rounded-[12px] px-4 py-2 gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="cursor-pointer"
              >
                <Minus />
              </button>

              <span className="w-6 text-center">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="cursor-pointer"
              >
                <Plus />
              </button>
            </div>

            {/* Rate pill */}
            <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-[12px] text-[13px]">
              1,450.00 per USDT
            </div>
          </div>
        </div>

        {/* Total */}
        {total > 0 && (
          <div className="text-center">
            <p className="text-[13px] text-slate-500">Total Amount:</p>
            <p className="text-[20px] font-bold text-slate-900">
              ₦{total.toLocaleString()}
            </p>
          </div>
        )}

        {/* Button */}
        <button className="w-[70%] mx-auto block h-[48px] rounded-[12px] bg-emerald-600 text-white font-semibold cursor-pointer">
          Sell Now
        </button>
      </div>
    </div>
  );
}
