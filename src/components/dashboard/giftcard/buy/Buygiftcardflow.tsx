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
    isLoading,
    error,
    isSubmitting,
    fetchGiftCards,
    createOrder,
    clearError,
  } = useGiftCardStore();

  /* ---------------------------------- */
  /* FETCH GIFTCARDS */
  /* ---------------------------------- */

  useEffect(() => {
    fetchGiftCards();
  }, [fetchGiftCards]);

  /* ---------------------------------- */
  /* SELECT CARD */
  /* ---------------------------------- */

  const handleCardSelect = (card: GiftCard) => {
    console.log("Selected Card:", card);

    setSelectedCard(card);
    setStep("amount");
  };

  /* ---------------------------------- */
  /* SELECT AMOUNT */
  /* ---------------------------------- */

  const handleAmountContinue = (product: GiftCardProduct, quantity: number) => {
    if (!product || !product.id) {
      console.error("Invalid product selected");
      return;
    }

    console.log("Selected Product:", product);
    console.log("Quantity:", quantity);

    setSelectedProduct(product);
    setQty(quantity);

    setStep("receipt");
  };

  /* ---------------------------------- */
  /* CONFIRM ORDER */
  /* ---------------------------------- */

  const handleConfirmOrder = async () => {
    if (!selectedProduct || !selectedProduct.id) {
      console.error("No valid product selected");
      return;
    }

    if (isSubmitting) return;

    try {
      const payload = {
        gift_card_product_id: selectedProduct.id,
        quantity: qty,
      };

      console.log("BUY ORDER PAYLOAD:", payload);

      await createOrder(payload);

      setStep("success");
    } catch (err) {
      console.error("Order creation failed:", err);
    }
  };

  /* ---------------------------------- */
  /* SUCCESS HANDLER */
  /* ---------------------------------- */

  const handleSuccess = () => {
    console.log("Order completed successfully");

    setSelectedCard(null);
    setSelectedProduct(null);
    setQty(1);

    setStep("grid");

    onBack();
  };

  return (
    <div className="w-full">
      {/* ERROR ALERT */}

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

      {/* STEP 1 — CARD GRID */}

      {step === "grid" && (
        <GiftCardGrid
          title="Buy Gift Cards"
          giftCards={giftCards}
          isLoading={isLoading}
          onSelect={handleCardSelect}
          onBack={onBack}
        />
      )}

      {/* STEP 2 — SELECT AMOUNT */}

      {step === "amount" && selectedCard && (
        <BuyGiftCardAmount
          card={selectedCard}
          onBack={() => setStep("grid")}
          onContinue={handleAmountContinue}
        />
      )}

      {/* STEP 3 — RECEIPT */}

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

      {/* STEP 4 — SUCCESS */}

      <GiftCardSuccessModal
        open={step === "success"}
        mode="buy"
        onOk={handleSuccess}
      />
    </div>
  );
}
