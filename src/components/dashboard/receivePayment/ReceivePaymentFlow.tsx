// components/dashboard/receivePayment/ReceivePaymentFlow.tsx

"use client";

import { useState } from "react";
import ReceivePaymentMethodGrid from "./ReceivePaymentMethodGrid";
import ReceivePaymentForm from "./ReceivePaymentForm";
import ReceiveAccountsList from "./ReceiveAccountsList";
import ReceiveErrorModal from "./ReceiveErrorModal";
import ReceiveSuccessModal from "./ReceiveSuccessModal";
import { UIPaymentMethod, useGlobalPaymentStore } from "@/store/globalPayment";

type Step = "choose" | "form" | "accounts" | "error";

type FormDataType = {
  amount: number;
  currency: string;
  country: string;
  gender: string;
};

type Props = {
  onBack: () => void; // ✅ Add this prop
};

export default function ReceivePaymentFlow({ onBack }: Props) {
  const [step, setStep] = useState<Step>("choose");
  const [selectedMethod, setSelectedMethod] = useState<UIPaymentMethod | null>(
    null,
  );
  const [formData, setFormData] = useState<FormDataType | null>(null);
  const [showCopied, setShowCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { findAccounts, availableAccounts, loading, currencies } =
    useGlobalPaymentStore();

  // --------------------------------------------------
  // METHOD SELECT
  // --------------------------------------------------
  const handleMethodSelect = (method: UIPaymentMethod) => {
    setSelectedMethod(method);
    setStep("form");
  };

  // --------------------------------------------------
  // Validate amount against currency limits
  // --------------------------------------------------
  const validateAmount = (
    amount: number,
    currency: string,
    methodId?: number,
  ): string | null => {
    if (!methodId) return null;

    const methodCurrencies = currencies[methodId];
    if (!methodCurrencies || methodCurrencies.length === 0) return null;

    const currencyData = methodCurrencies.find(
      (c: any) => c.currency === currency,
    );
    if (!currencyData) return null;

    const minAmount = parseFloat(currencyData.min_amount);
    const maxAmount = parseFloat(currencyData.max_amount);

    if (!isNaN(minAmount) && minAmount > 0 && amount < minAmount) {
      return `Minimum amount is ${minAmount.toLocaleString()} ${currency}`;
    }

    if (!isNaN(maxAmount) && maxAmount > 0 && amount > maxAmount) {
      return `Maximum amount is ${maxAmount.toLocaleString()} ${currency}`;
    }

    return null;
  };

  // --------------------------------------------------
  // FORM SUBMIT → FIND ACCOUNTS
  // --------------------------------------------------
  const handleFormSubmit = async (data: FormDataType) => {
    if (!selectedMethod) return;

    // Validate amount before sending to API
    const validationError = validateAmount(
      data.amount,
      data.currency,
      selectedMethod.paymentMethodId,
    );

    if (validationError) {
      setErrorMessage(validationError);
      setStep("error");
      return;
    }

    setFormData(data);

    try {
      const payload = {
        payment_method: selectedMethod.code || selectedMethod.id,
        currency: data.currency,
        country: data.country,
        gender: data.gender,
        expected_amount: data.amount,
      };

      console.log("🔍 Sending find accounts payload:", payload);

      const accounts = await findAccounts(payload);

      console.log("✅ Accounts found:", accounts);

      if (!accounts || accounts.length === 0) {
        setErrorMessage(
          "No accounts found for this request. Please try different options.",
        );
        setStep("error");
        return;
      }

      setStep("accounts");
    } catch (err: any) {
      console.error("Find accounts error:", err);

      let errorMsg = "Failed to find accounts. Please try again.";

      if (err.message) {
        errorMsg = err.message;
      }

      if (
        errorMsg.toLowerCase().includes("amount") &&
        errorMsg.toLowerCase().includes("range")
      ) {
        errorMsg =
          "The amount you entered is outside the allowed range for this payment method.";
      }

      setErrorMessage(errorMsg);
      setStep("error");
    }
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------
  return (
    <div className="w-full">
      {/* Step 1 - Method selection */}
      {step === "choose" && (
        <ReceivePaymentMethodGrid
          onSelect={handleMethodSelect}
          onBack={onBack}
        />
      )}

      {/* Step 2 - Form */}
      {step === "form" && selectedMethod && (
        <ReceivePaymentForm
          method={selectedMethod}
          onBack={() => setStep("choose")}
          onContinue={handleFormSubmit}
          isLoading={loading}
        />
      )}

      {/* Step 3 - Available Accounts */}
      {step === "accounts" && (
        <ReceiveAccountsList
          accounts={availableAccounts}
          currency={formData?.currency || "USD"}
          onBack={() => setStep("form")}
          onCopy={() => setShowCopied(true)}
        />
      )}

      {/* Error Modal */}
      <ReceiveErrorModal
        open={step === "error"}
        onClose={() => {
          setStep("form");
          setErrorMessage("");
        }}
        errorMessage={errorMessage}
      />

      {/* Success Modal */}
      <ReceiveSuccessModal
        open={showCopied}
        title="Account Copied!"
        message="Share account details with your sender"
        onOk={() => setShowCopied(false)}
      />
    </div>
  );
}
