"use client";

/**
 * ReceivePaymentFlow
 *
 * Steps:
 *   1. choose   — select payment method
 *   2. form     — fill in details + generate tag
 *   3. receipt  — review full breakdown
 *   4. success  — confirmation
 */

import { useState } from "react";
import ReceivePaymentMethodGrid from "./ReceivePaymentMethodGrid";
import ReceivePaymentForm, {
  ReceivePaymentFormData,
} from "./ReceivePaymentForm";
import ReceivePaymentReceipt from "./ReceivePaymentReceipt";
import ReceiveSuccessModal from "./ReceiveSuccessModal";
import { ReceivePaymentMethod } from "./receivePaymentData";

type Step = "choose" | "form" | "receipt" | "success";

type Props = {
  onBack: () => void;
};

function ReceivePaymentFlow({ onBack }: Props) {
  const [step, setStep] = useState<Step>("choose");
  const [selectedMethod, setSelectedMethod] =
    useState<ReceivePaymentMethod | null>(null);
  const [formData, setFormData] = useState<ReceivePaymentFormData | null>(null);

  const handleMethodSelect = (method: ReceivePaymentMethod) => {
    setSelectedMethod(method);
    setStep("form");
  };

  const handleFormContinue = (data: ReceivePaymentFormData) => {
    setFormData(data);
    setStep("receipt");
  };

  const handleSendRequest = () => setStep("success");

  const handleSuccess = () => {
    setStep("choose");
    setSelectedMethod(null);
    setFormData(null);
    onBack();
  };

  return (
    <div className="w-full">
      {/* Step 1: Choose method */}
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
            Receive Payment
          </h2>
          <p className="text-[13px] text-slate-500 mb-6">
            Select the payment method you want to receive payment through.
          </p>
          <ReceivePaymentMethodGrid onSelect={handleMethodSelect} />
        </div>
      )}

      {/* Step 2: Form */}
      {step === "form" && selectedMethod && (
        <ReceivePaymentForm
          method={selectedMethod}
          onBack={() => setStep("choose")}
          onContinue={handleFormContinue}
        />
      )}

      {/* Step 3: Receipt */}
      {step === "receipt" && selectedMethod && formData && (
        <ReceivePaymentReceipt
          method={selectedMethod}
          formData={formData}
          onBack={() => setStep("form")}
          onSendRequest={handleSendRequest}
        />
      )}

      {/* Step 4: Success */}
      <ReceiveSuccessModal
        open={step === "success"}
        title="Thanks"
        message="🎉 Payment Received. The amount has been credited to your wallet."
        onOk={handleSuccess}
      />
    </div>
  );
}

export default ReceivePaymentFlow;
