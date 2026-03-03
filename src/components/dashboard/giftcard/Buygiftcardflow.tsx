"use client";

/**
 * BuyGiftCardFlow
 * step 1 — grid    : choose gift card
 * step 2 — amount  : select denomination + qty
 * step 3 — receipt : review order
 * step 4 — success : confirmation modal
 */

import { useState } from "react";
import GiftCardGrid from "./Giftcardgrid";
import BuyGiftCardAmount from "./Buygiftcardamount";
import GiftCardReceipt from "./Giftcardreceipt";
import GiftCardSuccessModal from "./Giftcardsuccessmodal";
import { GiftCard, GiftCardDenomination } from "./Giftcarddata";

type Step = "grid" | "amount" | "receipt" | "success";

type Props = { onBack: () => void };

export default function BuyGiftCardFlow({ onBack }: Props) {
  const [step, setStep] = useState<Step>("grid");
  const [card, setCard] = useState<GiftCard | null>(null);
  const [denom, setDenom] = useState<GiftCardDenomination | null>(null);
  const [qty, setQty] = useState(1);

  const handleCardSelect = (c: GiftCard) => {
    setCard(c);
    setStep("amount");
  };

  const handleAmountContinue = (d: GiftCardDenomination, q: number) => {
    setDenom(d);
    setQty(q);
    setStep("receipt");
  };

  const handleSuccess = () => {
    setStep("grid");
    setCard(null);
    setDenom(null);
    setQty(1);
    onBack();
  };

  return (
    <div className="w-full">
      {step === "grid" && (
        <GiftCardGrid
          title="Buy Gift Cards"
          onSelect={handleCardSelect}
          onBack={onBack}
        />
      )}
      {step === "amount" && card && (
        <BuyGiftCardAmount
          card={card}
          onBack={() => setStep("grid")}
          onContinue={handleAmountContinue}
        />
      )}
      {step === "receipt" && card && denom && (
        <GiftCardReceipt
          mode="buy"
          card={card}
          denomination={denom}
          qty={qty}
          onBack={() => setStep("amount")}
          onConfirm={() => setStep("success")}
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
