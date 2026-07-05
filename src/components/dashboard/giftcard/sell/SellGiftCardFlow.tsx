"use client";

import { useState, useEffect } from "react";

import SellGiftCardForm from "./Sellgiftcardform";
import GiftCardReceipt from "../Giftcardreceipt";
import GiftCardSuccessModal from "../Giftcardsuccessmodal";
import GiftCardGrid from "../Giftcardgrid";

import {
  useGiftCardStore,
  GiftCard,
  GiftCardProduct,
} from "@/store/giftCardStore";

import { useRateStore } from "@/store/rateStore";
import { useTransactionStore } from "@/store/Transactionstore";

type Step = "grid" | "form" | "receipt" | "success";

type Props = {
  onBack: () => void;
};

type SellFormData = {
  cardNumber: string;
  amount: string;
  quantity: number;
  imageFiles: File[];
  customBrandName?: string;
  currency?: string;
};

export default function SellGiftCardFlow({ onBack }: Props) {
  const [step, setStep] = useState<Step>("grid");
  const [selectedCard, setSelectedCard] = useState<GiftCard | null>(null);
  const [selectedProduct, setSelectedProduct] =
    useState<GiftCardProduct | null>(null);
  const [formData, setFormData] = useState<SellFormData | null>(null);

  const {
    giftCards,
    products,
    isLoading,
    error,
    isSubmitting,
    fetchGiftCards,
    fetchProducts,
    sellGiftCard,
    clearError,
  } = useGiftCardStore();

  // ✅ Only need fetchRateByTypeAndId here — per-card fetch happens inside
  // SellGiftCardForm and GiftCardReceipt when card.id is known
  const { fetchRateByTypeAndId } = useRateStore();

  /* ---------------- LOAD APIs ---------------- */

  useEffect(() => {
    fetchGiftCards();
    fetchProducts();
  }, []);

  /* ---------------- SELECT CARD ---------------- */

  const handleCardSelect = (card: GiftCard) => {
    console.log("Selected Gift Card:", card);
    setSelectedCard(card);
    // ✅ Pre-fetch the rate as soon as user selects a card
    fetchRateByTypeAndId("gift_card", card.id);
    setStep("form");
  };

  /* ---------------- FILTER PRODUCTS ---------------- */

  const filteredProducts = products.filter(
    (p: GiftCardProduct) => Number(p.gift_card_id) === Number(selectedCard?.id),
  );

  /* ---------------- FORM SUBMIT ---------------- */

  const handleFormSubmit = (data: SellFormData, product: GiftCardProduct) => {
    console.log("Form Data Submitted:", data);
    console.log("Selected Product:", product);
    setFormData(data);
    setSelectedProduct(product);
    setStep("receipt");
  };

  /* ---------------- CONFIRM SELL ---------------- */

  const handleConfirmSell = async () => {
    if (!selectedCard || !selectedProduct || !formData) {
      console.error("Missing required data");
      return;
    }

    if (isSubmitting) return;

    try {
      const payload = new FormData();

      payload.append("gift_card_id", selectedCard.id.toString());
      payload.append("card_type", "physical");
      payload.append("amount", formData.amount);
      payload.append("card_code", formData.cardNumber);
      payload.append("card_pin", formData.cardNumber);

      if (formData.customBrandName) {
        payload.append("custom_brand_name", formData.customBrandName);
      }
      if (formData.currency) {
        payload.append("currency", formData.currency);
      }

      /* ---------------- IMAGE UPLOAD ---------------- */

      if (formData.imageFiles.length > 0) {
        formData.imageFiles.forEach((file) => {
          payload.append("card_images[]", file);
        });
      }

      /* ---------------- DEBUG LOGS ---------------- */

      console.log("===== SELL GIFTCARD REQUEST =====");
      payload.forEach((value, key) => console.log(key, value));
      console.log("=================================");

      const response = await sellGiftCard(payload);

      console.log("===== BACKEND RESPONSE =====");
      console.log(response);
      console.log("============================");

      // Force refresh transactions to update history and overview immediately
      useTransactionStore.getState().fetchTransactions(true);

      setStep("success");
    } catch (err) {
      console.error("❌ Sell order failed:", err);
    }
  };

  /* ---------------- SUCCESS ---------------- */

  const handleSuccess = () => {
    setSelectedCard(null);
    setSelectedProduct(null);
    setFormData(null);
    setStep("grid");
    onBack();
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex justify-between">
          <span>{error}</span>
          <button onClick={clearError}>Dismiss</button>
        </div>
      )}

      {/* ---------------- CARD GRID ---------------- */}
      {step === "grid" && (
        <GiftCardGrid
          title="Sell Gift Cards"
          giftCards={giftCards}
          isLoading={isLoading}
          onSelect={handleCardSelect}
          onBack={onBack}
        />
      )}

      {/* ---------------- FORM ---------------- */}
      {step === "form" && selectedCard && (
        <SellGiftCardForm
          card={selectedCard}
          products={filteredProducts}
          onSubmit={handleFormSubmit}
          onBack={() => setStep("grid")}
        />
      )}

      {/* ---------------- RECEIPT ---------------- */}
      {step === "receipt" && selectedCard && selectedProduct && formData && (
        <GiftCardReceipt
          mode="sell"
          card={selectedCard}
          product={selectedProduct}
          qty={formData.quantity}
          isSubmitting={isSubmitting}
          onBack={() => setStep("form")}
          onConfirm={handleConfirmSell}
        />
      )}

      {/* ---------------- SUCCESS MODAL ---------------- */}
      <GiftCardSuccessModal
        open={step === "success"}
        mode="sell"
        onOk={handleSuccess}
      />
    </div>
  );
}
