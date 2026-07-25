"use client";

import { useState, useEffect } from "react";
import GiftCardGrid from "../Giftcardgrid";
import BuyGiftCardAmount from "./Buygiftcardamount";
import GiftCardReceipt from "../Giftcardreceipt";
import GiftCardSuccessModal from "../Giftcardsuccessmodal";

import {
  useGiftCardStore,
  GiftCard,
  GiftCardProduct,
} from "@/store/giftCardStore";
import { useTransactionStore } from "@/store/Transactionstore";

type Step = "grid" | "amount" | "receipt" | "success";

type Props = {
  onBack: () => void;
};

export default function BuyGiftCardFlow({ onBack }: Props) {
  const [step, setStep] = useState<Step>("grid");
  const [selectedCard, setSelectedCard] = useState<GiftCard | null>(null);
  const [selectedProduct, setSelectedProduct] =
    useState<GiftCardProduct | null>(null);
  const [qty, setQty] = useState(1);

  const {
    giftCards,
    products,
    isLoading,
    error,
    isSubmitting,
    fetchGiftCards,
    fetchProducts,
    createOrder,
    clearError,
  } = useGiftCardStore();

  useEffect(() => {
    fetchGiftCards();
    fetchProducts();
  }, [fetchGiftCards, fetchProducts]);

  // Only display gift cards that have active products in stock
  const activeBuyCards = giftCards.filter((card) =>
    products.some(
      (prod) =>
        String(prod.gift_card_id) === String(card.id) &&
        Number(prod.quantity) > 0
    )
  );

  /* SELECT CARD */

  const handleCardSelect = (card: GiftCard) => {
    setSelectedCard(card);
    setStep("amount");
  };

  /* SELECT AMOUNT */

  const handleAmountContinue = (product: GiftCardProduct, quantity: number) => {
    if (!product?.id) return;

    setSelectedProduct(product);
    setQty(quantity);

    setStep("receipt");
  };

  /* CONFIRM ORDER */

  const handleConfirmOrder = async () => {
    if (!selectedProduct?.id) return;

    if (isSubmitting) return;

    try {
      const payload = {
        gift_card_product_id: selectedProduct.id,
        quantity: qty,
      };

      console.log("BUY ORDER PAYLOAD:", payload);

      await createOrder(payload);

      // Force refresh transactions to update history and overview immediately
      useTransactionStore.getState().fetchTransactions(true);

      setStep("success");
    } catch (err) {
      console.error("Order creation failed:", err);
    }
  };

  /* SUCCESS */

  const handleSuccess = () => {
    setSelectedCard(null);
    setSelectedProduct(null);
    setQty(1);

    setStep("grid");

    onBack();
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-[13px] flex justify-between items-center">
          <span>{error}</span>

          <button
            onClick={clearError}
            className="text-red-700 underline text-[11px]"
          >
            Dismiss
          </button>
        </div>
      )}

      {step === "grid" && (
        <GiftCardGrid
          title="Buy Gift Cards"
          giftCards={activeBuyCards}
          isLoading={isLoading}
          onSelect={handleCardSelect}
          onBack={onBack}
        />
      )}

      {step === "amount" && selectedCard && (
        <BuyGiftCardAmount
          card={selectedCard}
          onBack={() => setStep("grid")}
          onContinue={handleAmountContinue}
        />
      )}

      {step === "receipt" && selectedCard && selectedProduct && (
        <GiftCardReceipt
          mode="buy"
          card={selectedCard}
          product={selectedProduct}
          qty={qty}
          isSubmitting={isSubmitting}
          onBack={() => setStep("amount")}
          onConfirm={handleConfirmOrder}
        />
      )}

      <GiftCardSuccessModal
        open={step === "success"}
        mode="buy"
        onOk={handleSuccess}
      />
    </div>
  );
}
