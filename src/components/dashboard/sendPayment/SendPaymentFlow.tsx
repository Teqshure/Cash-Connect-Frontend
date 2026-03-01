"use client";

/**
 * SendPaymentFlow
 *
 * Orchestrates the full send payment flow:
 *   step 1 — choose   : select a payment method
 *   step 2 — form     : fill in payment details
 *   step 3 — receipt  : review order summary
 *   step 4 — success  : confirmation modal
 */

import { useState } from "react";
import PaymentMethodGrid from "./PaymentMethodGrid";
import SendPaymentForm, { PaymentFormData } from "./SendPaymentForm";
import SendPaymentReceipt from "./SendPaymentReceipt";
import SendSuccessModal from "./Sendsuccessmodal ";
import { PaymentMethod } from "./sendPaymentData";

type Step = "choose" | "form" | "receipt" | "success";

type Props = {
  onBack: () => void;
};

export default function SendPaymentFlow({ onBack }: Props) {
  const [step, setStep] = useState<Step>("choose");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [formData, setFormData] = useState<PaymentFormData | null>(null);

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setStep("form");
  };

  const handleFormContinue = (data: PaymentFormData) => {
    setFormData(data);
    setStep("receipt");
  };

  const handleBuyNow = () => setStep("success");

  const handleSuccess = () => {
    setStep("choose");
    setSelectedMethod(null);
    setFormData(null);
    onBack();
  };

  return (
    <div className="w-full">
      {/* Step 1: Choose payment method */}
      {step === "choose" && (
        <div>
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1 text-[13px] text-slate-500 hover:text-slate-800 mb-4 cursor-pointer transition"
          >
            ← Back
          </button>
          <h2 className="text-[20px] font-semibold text-slate-900 mb-1">
            Send Payment
          </h2>
          <p className="text-[13px] text-slate-500 mb-6">
            Select the payment method you want to send payment through.
          </p>
          <PaymentMethodGrid onSelect={handleMethodSelect} />
        </div>
      )}

      {/* Step 2: Payment form */}
      {step === "form" && selectedMethod && (
        <SendPaymentForm
          method={selectedMethod}
          onBack={() => setStep("choose")}
          onContinue={handleFormContinue}
        />
      )}

      {/* Step 3: Receipt */}
      {step === "receipt" && selectedMethod && formData && (
        <SendPaymentReceipt
          method={selectedMethod}
          formData={formData}
          onBack={() => setStep("form")}
          onBuyNow={handleBuyNow}
        />
      )}

      {/* Step 4: Success modal */}
      <SendSuccessModal
        open={step === "success"}
        title="Thanks"
        message="Your payment has been sent and is being verified."
        onOk={handleSuccess}
      />
    </div>
  );
}
