"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GiftCardGrid from "../Giftcardgrid";
import SellGiftCardForm from "./Sellgiftcardform";
import GiftCardReceipt from "../Giftcardreceipt";
import GiftCardSuccessModal from "../Giftcardsuccessmodal";
import {
  useGiftCardStore,
  GiftCard,
  GiftCardProduct,
} from "@/store/giftCardStore";

type Step = "grid" | "form" | "receipt" | "success";

type Props = { onBack: () => void };

export default function SellGiftCardFlow({ onBack }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("grid");
  const [selectedCard, setSelectedCard] = useState<GiftCard | null>(null);
  const [selectedProduct, setSelectedProduct] =
    useState<GiftCardProduct | null>(null);
  const [formData, setFormData] = useState({
    cardNumber: "",
    amount: "",
    quantity: 1,
    imageFiles: [] as File[],
    imagePreviews: [] as string[],
  });
  const [sellResponse, setSellResponse] = useState<any>(null);

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

  useEffect(() => {
    fetchGiftCards();
    fetchProducts();
  }, [fetchGiftCards, fetchProducts]);

  const handleCardSelect = (card: GiftCard) => {
    setSelectedCard(card);
    setStep("form");
  };

  const handleFormSubmit = (
    data: typeof formData,
    product: GiftCardProduct,
  ) => {
    setFormData(data);
    setSelectedProduct(product);
    setStep("receipt");
  };

  const handleConfirmOrder = async () => {
    if (!selectedCard || !selectedProduct) return;

    // Convert images to base64 strings for API
    const imageBase64Strings = await Promise.all(
      formData.imageFiles.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      }),
    );

    const payload = {
      gift_card_id: selectedCard.id,
      card_type: "code" as "physical" | "code",
      card_value: parseFloat(formData.amount),
      card_code: formData.cardNumber,
      card_pin: "",
      card_images: imageBase64Strings,
    };

    try {
      const response = await sellGiftCard(payload);
      setSellResponse(response);
      setStep("success");
    } catch (error) {
      // Error handled in store
    }
  };

  const handleSuccess = () => {
    setStep("grid");
    setSelectedCard(null);
    setSelectedProduct(null);
    setFormData({
      cardNumber: "",
      amount: "",
      quantity: 1,
      imageFiles: [],
      imagePreviews: [],
    });
    setSellResponse(null);
    router.push("/dashboard/orders");
  };

  // Filter products for selected card
  const getCardProducts = () => {
    if (!selectedCard) return [];
    return products.filter(
      (p) => p.gift_card_id === selectedCard.id && p.is_active === 1,
    );
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
          title="Sell Gift Cards"
          giftCards={giftCards}
          isLoading={isLoading}
          onSelect={handleCardSelect}
          onBack={onBack}
        />
      )}

      {step === "form" && selectedCard && (
        <SellGiftCardForm
          card={selectedCard}
          products={getCardProducts()}
          onSubmit={handleFormSubmit}
          onBack={() => setStep("grid")}
        />
      )}

      {step === "receipt" && selectedCard && selectedProduct && (
        <GiftCardReceipt
          mode="sell"
          card={selectedCard}
          product={selectedProduct}
          qty={formData.quantity}
          isSubmitting={isSubmitting}
          onBack={() => setStep("form")}
          onConfirm={handleConfirmOrder}
        />
      )}

      <GiftCardSuccessModal
        open={step === "success"}
        mode="sell"
        onOk={handleSuccess}
        message={
          sellResponse?.message ||
          "Gift card submitted successfully. Awaiting verification"
        }
      />
    </div>
  );
}
