"use client";

import { useState } from "react";
import PaymentMethodGrid from "./PaymentMethodGrid";
import SendPaymentForm, { PaymentFormData } from "./SendPaymentForm";
import SendPaymentReceipt from "./SendPaymentReceipt";
import SendSuccessModal from "./Sendsuccessmodal ";
import { PaymentMethod } from "./sendPaymentData";

import { useSendPayment } from "@/store/globalPayment";

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

  const { submitPayment } = useSendPayment();

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setStep("form");
  };

  const handleFormContinue = (data: PaymentFormData) => {
    setFormData(data);
    setStep("receipt");
  };

  const handleBuyNow = async () => {
    if (!selectedMethod || !formData) return;

    try {
      await submitPayment(formData, selectedMethod);
      setStep("success");
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };

  const handleSuccess = () => {
    setStep("choose");
    setSelectedMethod(null);
    setFormData(null);
    onBack();
  };

  return (
    <div className="w-full">
      {step === "choose" && (
        <div>
          <PaymentMethodGrid onSelect={handleMethodSelect} />
        </div>
      )}

      {step === "form" && selectedMethod && (
        <SendPaymentForm
          method={selectedMethod}
          onBack={() => setStep("choose")}
          onContinue={handleFormContinue}
        />
      )}

      {step === "receipt" && selectedMethod && formData && (
        <SendPaymentReceipt
          method={selectedMethod}
          formData={formData}
          onBack={() => setStep("form")}
          onBuyNow={handleBuyNow}
        />
      )}

      <SendSuccessModal
        open={step === "success"}
        title="Thanks"
        message="Your payment has been sent and is being verified."
        onOk={handleSuccess}
      />
    </div>
  );
}
