"use client";

/**
 * ReceivePaymentFlow
 *
 * Steps:
 * 1. choose   — select payment method
 * 2. form     — fill in details + generate tag
 * 3. receipt  — review full breakdown
 * 4. success  — confirmation
 */

import { useState } from "react";
import ReceivePaymentMethodGrid from "./ReceivePaymentMethodGrid";
import ReceivePaymentForm from "./ReceivePaymentForm";
import ReceivePaymentReceipt from "./ReceivePaymentReceipt";
import ReceiveSuccessModal from "./ReceiveSuccessModal";
import { ReceivePaymentMethod } from "./receivePaymentData";
import { useGlobalPaymentStore } from "@/store/globalPayment";

type Step = "choose" | "form" | "receipt" | "success";

type ReceivePaymentFormData = {
  amount: string;
  currency: string;
  email: string;
  tagId: string;
  conversion?: number;
  fee?: number;
};

type Props = {
  onBack: () => void;
};

function ReceivePaymentFlow({ onBack }: Props) {
  const [step, setStep] = useState<Step>("choose");

  const [selectedMethod, setSelectedMethod] =
    useState<ReceivePaymentMethod | null>(null);

  const [formData, setFormData] = useState<ReceivePaymentFormData | null>(null);

  const [transactionId, setTransactionId] = useState<string | null>(null);

  const receivePayment = useGlobalPaymentStore((s: any) => s.receivePayment);
  const loading = useGlobalPaymentStore((s: any) => s.loading);

  /* --------------------------
     Select Payment Method
  --------------------------- */

  const handleMethodSelect = (method: ReceivePaymentMethod) => {
    setSelectedMethod(method);
    setStep("form");
  };

  /* --------------------------
     Generate Transaction ID
  --------------------------- */

  const generateTransactionId = () => {
    const date = new Date();

    return (
      "TXN-" +
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      String(date.getDate()).padStart(2, "0") +
      "-" +
      Math.floor(Math.random() * 100000)
    );
  };

  /* --------------------------
     Form Continue
  --------------------------- */

  const handleFormContinue = (data: Omit<ReceivePaymentFormData, "tagId">) => {
    const txnId = generateTransactionId();

    setFormData({
      ...data,
      tagId: txnId,
    });

    setTransactionId(txnId);

    setStep("receipt");
  };

  /* --------------------------
     Send Request + Conversion
  --------------------------- */

  const handleSendRequest = async () => {
    if (!selectedMethod) {
      console.error("❌ No payment method selected");
      return;
    }

    if (!formData) {
      console.error("❌ Form data missing");
      return;
    }

    const usdAmount = Number(formData.amount);

    if (!usdAmount || usdAmount <= 0) {
      console.error("❌ Invalid amount:", formData.amount);
      alert("Invalid amount");
      return;
    }

    const payload = {
      method: selectedMethod.name.toUpperCase(),
      amount: usdAmount,
      crypto_amount: usdAmount,
      currency: formData.currency,
      sender_email: formData.email,
    };

    console.log("===================================");
    console.log("🚀 SEND REQUEST DEBUG");
    console.log("Selected Method:", selectedMethod);
    console.log("Form Data:", formData);
    console.log("Payload:", payload);
    console.log("===================================");

    try {
      const response = await receivePayment(payload);

      console.log("✅ API SUCCESS RESPONSE:");
      console.log(response);

      /**
       * Expected API response example:
       * {
       *   rate: 1700,
       *   fee: 100
       * }
       */

      const rate = Number(response?.rate ?? 1700);
      const fee = Number(response?.fee ?? 0);

      const conversion = usdAmount * rate;

      /* update form data with conversion */
      setFormData({
        ...formData,
        conversion,
        fee,
      });

      setStep("success");
    } catch (error) {
      console.error("❌ RECEIVE PAYMENT FAILED");
      console.error(error);
    }
  };

  /* --------------------------
     Success Handler
  --------------------------- */

  const handleSuccess = () => {
    setStep("choose");
    setSelectedMethod(null);
    setFormData(null);
    setTransactionId(null);
    onBack();
  };

  return (
    <div className="w-full">
      {/* Step 1 — Choose Method */}
      {step === "choose" && (
        <div>
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1 text-[13px] text-slate-500 hover:text-slate-800 mb-4"
          >
            ← Back
          </button>

          <h2 className="text-[20px] font-semibold text-slate-900 mb-1">
            Receive Payment
          </h2>

          <p className="text-[13px] text-slate-500 mb-6">
            Select the payment method you want to receive payment through.
          </p>

          <ReceivePaymentMethodGrid onSelect={handleMethodSelect} />
        </div>
      )}

      {/* Step 2 — Form */}
      {step === "form" && selectedMethod && (
        <ReceivePaymentForm
          method={selectedMethod}
          onBack={() => setStep("choose")}
          onContinue={handleFormContinue}
        />
      )}

      {/* Step 3 — Receipt */}
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

      {/* Step 4 — Success */}
      <ReceiveSuccessModal
        open={step === "success"}
        title="Success"
        message="Your payment request has been submitted successfully."
        onOk={handleSuccess}
      />
    </div>
  );
}

export default ReceivePaymentFlow;
