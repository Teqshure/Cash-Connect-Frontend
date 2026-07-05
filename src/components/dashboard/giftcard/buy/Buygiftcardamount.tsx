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
  const { fetchRates, getGiftCardBuyRate } = useRateStore();
  const rates = useRateStore((state: any) => state.rates);

  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [cardProducts, setCardProducts] = useState<GiftCardProduct[]>([]);

  /* ------------------------------------------------------ */
  /* FETCH PRODUCTS & RATES */
  /* ------------------------------------------------------ */

  useEffect(() => {
    fetchProducts();
    fetchRates();
  }, [fetchProducts, fetchRates]);

  /* ------------------------------------------------------ */
  /* FILTER PRODUCTS FOR SELECTED CARD */
  /* ------------------------------------------------------ */

  useEffect(() => {
    const filtered = products.filter(
      (p: GiftCardProduct) =>
        Number(p.gift_card_id) === Number(card.id) &&
        Number(p.is_active) === 1,
    );

    setCardProducts(filtered);

    const initialQty: Record<number, number> = {};
    filtered.forEach((p: GiftCardProduct) => {
      initialQty[p.id] = 0;
    });

    setQuantities(initialQty);
  }, [products, card.id]);

  /* ------------------------------------------------------ */
  /* IMAGE PATH RESOLVER */
  /* ------------------------------------------------------ */

  const getFullImageUrl = (imagePath: string | null | undefined) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    const host = typeof window !== "undefined" ? window.location.hostname : "";
    const apiBase = (host.includes("localhost") || host.includes("127.0.0.1"))
      ? "http://localhost:8000"
      : "https://api.cashconnectworld.com";
    return `${apiBase}/storage/${imagePath}`;
  };

  /* ------------------------------------------------------ */
  /* UPDATE QUANTITY */
  /* ------------------------------------------------------ */

  const updateQty = (productId: number, delta: number) => {
    const prod = cardProducts.find((p) => p.id === productId);
    if (!prod || prod.quantity <= 0) return;

    setQuantities((prev) => {
      const current = prev[productId] ?? 0;
      const next = current + delta;
      return {
        ...prev,
        [productId]: Math.max(0, Math.min(prod.quantity, next)),
      };
    });
  };

  /* ------------------------------------------------------ */
  /* CALCULATIONS */
  /* ------------------------------------------------------ */

  const totalUSD = useMemo(() => {
    return cardProducts.reduce((total, product) => {
      const qty = quantities[product.id] ?? 0;
      const amount = Number(product.amount) || 0;
      return total + amount * qty;
    }, 0);
  }, [cardProducts, quantities]);

  // ✅ FIXED: Using getGiftCardBuyRate with rates dependency for hot reload
  const rate = useMemo(
    () => getGiftCardBuyRate(card.id) || 0,
    [getGiftCardBuyRate, card.id, rates],
  );

  const totalNGN = useMemo(() => totalUSD * rate, [totalUSD, rate]);

  const hasSelection = totalUSD > 0;

  /* ------------------------------------------------------ */
  /* HANDLE BUY */
  /* ------------------------------------------------------ */

  const handleBuy = () => {
    const selected = cardProducts.find(
      (product) => (quantities[product.id] ?? 0) > 0,
    );

    if (!selected) return;

    onContinue(selected, quantities[selected.id] ?? 0);
  };

  /* ------------------------------------------------------ */
  /* LOADING STATE */
  /* ------------------------------------------------------ */

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[900px] mx-auto">
      {/* BACK */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-[13px] text-slate-500 hover:text-slate-800 mb-6"
      >
        ← Back
      </button>

      {/* HEADER */}
      <div className="mb-6 rounded-[10px] bg-emerald-50 px-4 py-2.5 text-center">
        <p className="text-[13px] text-emerald-700 font-semibold">
          {card.name} Gift Cards
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* PRODUCTS GRID */}
        <div className="flex-1">
          {cardProducts.length === 0 ? (
            <div className="bg-white rounded-[14px] border border-slate-100 p-8 text-center shadow-sm">
              <p className="text-sm text-slate-400">No stock or denominations available for this brand.</p>
              <p className="text-xs text-slate-300 mt-1">Please contact admin or check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {cardProducts.map((product) => {
                const qty = quantities[product.id] ?? 0;
                const amount = Number(product.amount) || 0;
                const isOutOfStock = product.quantity <= 0;

                return (
                  <div
                    key={product.id}
                    className="rounded-[14px] border border-slate-100 bg-white p-4 flex flex-col gap-3 shadow-sm"
                  >
                    <div className="h-20 rounded-[10px] bg-slate-100 flex items-center justify-center overflow-hidden relative">
                      {card.image ? (
                        <Image
                          src={getFullImageUrl(card.image)}
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

                    {isOutOfStock ? (
                      <div className="flex items-center justify-center gap-1.5 py-2 text-red-500">
                        <span className="text-[12px] font-bold tracking-tight bg-red-50 px-3 py-1 rounded-full">Out of Stock</span>
                      </div>
                    ) : (
                      <>
                        <p className="text-[11px] text-center text-slate-500">
                          Quantity
                        </p>

                        <div className="flex items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateQty(product.id, -1)}
                            disabled={qty <= 0}
                            className={`h-7 w-7 rounded-full border grid place-items-center transition ${
                              qty <= 0
                                ? "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed"
                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <Minus className="h-3 w-3" />
                          </button>

                          <span className="w-5 text-center font-semibold text-slate-800">
                            {qty}
                          </span>

                          <button
                            type="button"
                            onClick={() => updateQty(product.id, 1)}
                            disabled={qty >= product.quantity}
                            className={`h-7 w-7 rounded-full border grid place-items-center transition ${
                              qty >= product.quantity
                                ? "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed"
                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RATE PANEL */}
        <div className="flex flex-col gap-4 lg:min-w-[260px]">
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

          <div className="text-center lg:text-left">
            <p className="text-[13px] text-slate-500 font-medium">
              Total Amount:
            </p>

            <p className="text-[22px] font-bold text-slate-900">
              NGN {totalNGN.toLocaleString()}
            </p>
          </div>

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
