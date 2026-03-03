"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import {
  GiftCard,
  DENOMINATIONS,
  GiftCardDenomination,
  RATE_PER_USDT,
} from "./Giftcarddata";

type Props = {
  card: GiftCard;
  onBack: () => void;
  onContinue: (denomination: GiftCardDenomination, qty: number) => void;
};

export default function BuyGiftCardAmount({ card, onBack, onContinue }: Props) {
  const [quantities, setQuantities] = useState<Record<number, number>>(
    Object.fromEntries(DENOMINATIONS.map((d) => [d.value, 0])),
  );

  const updateQty = (value: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [value]: Math.max(0, (prev[value] ?? 0) + delta),
    }));
  };

  const totalNGN = DENOMINATIONS.reduce(
    (sum, d) => sum + d.ngnPrice * (quantities[d.value] ?? 0),
    0,
  );

  const hasSelection = totalNGN > 0;

  const handleBuy = () => {
    // Find first denomination with qty > 0 for receipt
    const firstDenom = DENOMINATIONS.find(
      (d) => (quantities[d.value] ?? 0) > 0,
    );
    if (!firstDenom) return;
    onContinue(firstDenom, quantities[firstDenom.value] ?? 0);
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-[13px] text-slate-500 hover:text-slate-800 mb-6 cursor-pointer transition"
      >
        ← Back
      </button>

      {/* Rate banner */}
      <div className="mb-5 rounded-[10px] bg-emerald-50 px-4 py-2.5 text-center">
        <p className="text-[13px] text-emerald-700 font-semibold">
          {RATE_PER_USDT.toLocaleString()}.00 per USDT
        </p>
      </div>

      {/* Denomination cards with qty */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
        {DENOMINATIONS.map((d) => {
          const qty = quantities[d.value] ?? 0;
          return (
            <div
              key={d.value}
              className="rounded-[14px] border border-slate-100 bg-white p-3 flex flex-col gap-3 shadow-sm"
            >
              {/* Card preview */}
              <div
                className={`w-full h-20 rounded-[10px] ${card.bgColor} flex items-center justify-center overflow-hidden`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.logo}
                  alt={card.name}
                  className="h-14 w-full object-contain p-1"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                />
              </div>
              <p className="text-[13px] font-semibold text-emerald-600 text-center">
                ${d.value} {card.name}
              </p>
              <p className="text-[11px] text-slate-500 text-center -mt-2">
                Quantity
              </p>

              {/* Qty counter */}
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => updateQty(d.value, -1)}
                  className="h-7 w-7 rounded-full border border-slate-200 grid place-items-center hover:bg-slate-50 transition cursor-pointer"
                >
                  <Minus className="h-3 w-3 text-slate-600" />
                </button>
                <span className="text-[15px] font-semibold text-slate-800 w-5 text-center">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => updateQty(d.value, 1)}
                  className="h-7 w-7 rounded-full border border-slate-200 grid place-items-center hover:bg-slate-50 transition cursor-pointer"
                >
                  <Plus className="h-3 w-3 text-slate-600" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total */}
      {hasSelection && (
        <div className="mb-4 rounded-[10px] bg-slate-50 border border-slate-200 px-4 py-3 flex items-center justify-between">
          <span className="text-[13px] text-slate-600 font-medium">
            Total Amount:
          </span>
          <span className="text-[16px] font-bold text-slate-900">
            NGN{totalNGN.toLocaleString()}.0
          </span>
        </div>
      )}

      {/* Buy Now */}
      <button
        type="button"
        onClick={handleBuy}
        disabled={!hasSelection}
        className={[
          "w-full h-[52px] rounded-[12px] font-semibold text-[15px] transition",
          hasSelection
            ? "bg-emerald-600 text-white hover:brightness-110 cursor-pointer"
            : "bg-slate-200 text-slate-500 cursor-not-allowed",
        ].join(" ")}
      >
        Buy Now
      </button>
    </div>
  );
}
