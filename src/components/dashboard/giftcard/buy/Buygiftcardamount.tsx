"use client";

import { useState, useEffect, useMemo } from "react";
import { Minus, Plus, Loader2 } from "lucide-react";
import Image from "next/image";

import {
  useGiftCardStore,
  GiftCard,
  GiftCardProduct,
} from "@/store/giftCardStore";

import { useRateStore } from "@/store/rateStore";

type Props = {
  card: GiftCard;
  onBack: () => void;
  onContinue: (product: GiftCardProduct, qty: number) => void;
};

export default function BuyGiftCardAmount({ card, onBack, onContinue }: Props) {
  const { products, isLoading, fetchProducts } = useGiftCardStore();
  const { fetchRates, getBuyRate } = useRateStore();

  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [cardProducts, setCardProducts] = useState<GiftCardProduct[]>([]);

  useEffect(() => {
    fetchProducts();
    fetchRates();
  }, [fetchProducts, fetchRates]);

  useEffect(() => {
    // FIX: Add type annotation for p
    const filtered = products.filter(
      (p: GiftCardProduct) => p.gift_card_id === card.id && p.is_active === 1,
    );

    setCardProducts(filtered);

    const initial: Record<number, number> = {};
    filtered.forEach((p: GiftCardProduct) => {
      initial[p.id] = 0;
    });

    setQuantities(initial);
  }, [products, card.id]);

  const updateQty = (productId: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] ?? 0) + delta),
    }));
  };

  const totalUSD = useMemo(() => {
    return cardProducts.reduce((acc, product) => {
      const qty = quantities[product.id] ?? 0;
      return acc + Number(product.amount) * qty;
    }, 0);
  }, [cardProducts, quantities]);

  const rate = getBuyRate(card.id);
  const totalNGN = totalUSD * rate;
  const hasSelection = totalUSD > 0;

  const handleBuy = () => {
    // FIX: Add type annotation for product
    const selected = cardProducts.find(
      (product: GiftCardProduct) => (quantities[product.id] ?? 0) > 0,
    );

    if (!selected) return;

    onContinue(selected, quantities[selected.id] ?? 0);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[900px] mx-auto">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-[13px] text-slate-500 hover:text-slate-800 mb-6"
      >
        ← Back
      </button>

      {/* Header */}
      <div className="mb-6 rounded-[10px] bg-emerald-50 px-4 py-2.5 text-center">
        <p className="text-[13px] text-emerald-700 font-semibold">
          {card.name} Gift Cards
        </p>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* PRODUCTS */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          {cardProducts.map((product: GiftCardProduct) => {
            const qty = quantities[product.id] ?? 0;
            const amount = Number(product.amount);

            return (
              <div
                key={product.id}
                className="rounded-[14px] border border-slate-100 bg-white p-4 flex flex-col gap-3 shadow-sm"
              >
                <div className="h-20 rounded-[10px] bg-slate-100 flex items-center justify-center overflow-hidden relative">
                  {card.image && card.image.startsWith("http") ? (
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      sizes="100px"
                      className="object-contain p-1"
                    />
                  ) : (
                    <span className="text-xl font-bold text-slate-400">
                      {card.name.charAt(0)}
                    </span>
                  )}
                </div>

                <p className="text-[13px] font-semibold text-emerald-600 text-center">
                  ${amount} {card.name}
                </p>

                <p className="text-[11px] text-center text-slate-500">
                  Quantity
                </p>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => updateQty(product.id, -1)}
                    className="h-7 w-7 rounded-full border border-slate-200 grid place-items-center"
                  >
                    <Minus className="h-3 w-3 text-slate-600" />
                  </button>

                  <span className="w-5 text-center font-semibold text-slate-800">
                    {qty}
                  </span>

                  <button
                    onClick={() => updateQty(product.id, 1)}
                    className="h-7 w-7 rounded-full border border-slate-200 grid place-items-center"
                  >
                    <Plus className="h-3 w-3 text-slate-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* RATE PANEL */}
        <div className="flex flex-col gap-4 lg:min-w-[260px]">
          {/* Rate + Cost */}
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="bg-emerald-50 text-emerald-700 text-[13px] px-4 py-2 rounded-lg font-medium text-center">
              Rate:
              <span className="font-semibold ml-1">
                {rate.toLocaleString()}/$
              </span>
            </div>

            <div className="bg-slate-100 text-slate-700 text-[13px] px-4 py-2 rounded-lg font-medium text-center">
              Cost:
              <span className="font-semibold ml-1">
                ₦{totalNGN.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="text-center lg:text-left">
            <p className="text-[13px] text-slate-500 font-medium">
              Total Amount:
            </p>

            <p className="text-[22px] font-bold text-slate-900">
              NGN{totalNGN.toLocaleString()}
            </p>
          </div>

          {/* Buy Button */}
          <button
            onClick={handleBuy}
            disabled={!hasSelection}
            className={`w-full lg:w-[220px] h-[48px] rounded-[12px] font-semibold text-[15px] transition ${
              hasSelection
                ? "bg-emerald-600 text-white hover:brightness-110"
                : "bg-slate-200 text-slate-500 cursor-not-allowed"
            }`}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
