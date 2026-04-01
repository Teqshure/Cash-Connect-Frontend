// components/dashboard/receivePayment/ReceivePaymentFlow.tsx
"use client";

import { useState } from "react";
import ReceivePaymentMethodGrid from "./ReceivePaymentMethodGrid";
import ReceivePaymentForm from "./ReceivePaymentForm";
import ReceivePaymentReceipt from "./ReceivePaymentReceipt";
import ReceiveSuccessModal from "./ReceiveSuccessModal";

import {
  UIPaymentMethod,
  useGlobalPaymentStore,
  usePaymentMethodRate,
} from "@/store/globalPayment";

type Step = "choose" | "form" | "receipt" | "success";

type FormDataType = {
  amount: number;
  currency: string;
  country: string;
  email: string;
  gender: string;
  tagId: string;
  conversion?: number;
  fee?: number;
};

type Props = {
  onBack: () => void;
};

export default function ReceivePaymentFlow({ onBack }: Props) {
  const [step, setStep] = useState<Step>("choose");
  const [selectedMethod, setSelectedMethod] = useState<UIPaymentMethod | null>(
    null,
  );
  const [formData, setFormData] = useState<FormDataType | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const receivePayment = useGlobalPaymentStore((s: any) => s.receivePayment);
  const loading = useGlobalPaymentStore((s: any) => s.submitting);

  const rate = usePaymentMethodRate(selectedMethod);

  // --------------------------------------------------
  // METHOD SELECT
  // --------------------------------------------------

  const handleMethodSelect = (method: UIPaymentMethod) => {
    setSelectedMethod(method);
    setStep("form");
  };

  // --------------------------------------------------
  // FORM CONTINUE
  // --------------------------------------------------

  const handleFormContinue = (data: Omit<FormDataType, "tagId">) => {
    const tag = `TXN-${Date.now()}`;

    setTransactionId(tag);

    setFormData({
      ...data,
      tagId: tag,
    });

    setStep("receipt");
  };

  // --------------------------------------------------
  // SEND REQUEST TO BACKEND
  // --------------------------------------------------

  const handleSendRequest = async () => {
    if (!selectedMethod || !formData) return;

    const usdAmount = Number(formData.amount);

    if (!usdAmount || usdAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const cryptoAmount = Number((usdAmount / rate).toFixed(6));

    const payload = {
      method: selectedMethod.code || selectedMethod.id,
      crypto_amount: cryptoAmount,
      currency: formData.currency,
      sender_email: formData.email,
    };

    try {
      const response = await receivePayment(payload);

      const fee = Number(response?.data?.fee ?? 0);
      const conversion = usdAmount * rate;

      setFormData({
        ...formData,
        conversion,
        fee,
      });

      setStep("success");
    } catch (error: any) {
      console.error("Receive payment failed:", error);
      alert(error?.message || "Payment request failed.");
    }
  };

  // --------------------------------------------------
  // SUCCESS RESET
  // --------------------------------------------------

  const handleSuccess = () => {
    setStep("choose");
    setSelectedMethod(null);
    setFormData(null);
    setTransactionId(null);
    onBack();
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="w-full">
      {/* Step 1 - Method selection */}
      {step === "choose" && (
        <ReceivePaymentMethodGrid onSelect={handleMethodSelect} />
      )}

      {/* Step 2 - Form */}
      {step === "form" && selectedMethod && (
        <ReceivePaymentForm
          method={selectedMethod}
          onBack={() => setStep("choose")}
          onContinue={handleFormContinue}
        />
      )}

      {/* Step 3 - Receipt */}
      {step === "receipt" && selectedMethod && formData && (
        <ReceivePaymentReceipt
          method={selectedMethod}
          formData={formData}
          transactionId={transactionId || undefined}
          onBack={() => setStep("form")}
          onSendRequest={handleSendRequest}
          isSubmitting={loading}
        />
      )}

      {/* Step 4 - Success */}
      <ReceiveSuccessModal
        open={step === "success"}
        title="Success"
        message="Your payment request has been submitted successfully."
        onOk={handleSuccess}
      />
    </div>
  );
}
