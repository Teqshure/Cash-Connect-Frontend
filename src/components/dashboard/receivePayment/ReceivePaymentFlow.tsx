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

export default function ReceivePaymentFlow({ onBack }: any) {
  const [step, setStep] = useState<Step>("choose");
  const [selectedMethod, setSelectedMethod] = useState<UIPaymentMethod | null>(
    null,
  );
  const [formData, setFormData] = useState<FormDataType | null>(null);

  const [showSuccess, setShowSuccess] = useState(false); // ✅ notify admin modal
  const [showCopyModal, setShowCopyModal] = useState(false); // ✅ copy modal

  const [errorMessage, setErrorMessage] = useState("");

  const {
    findAccounts,
    submitTransaction,
    availableAccounts,
    loading,
    currencies,
  } = useGlobalPaymentStore();

  // ---------------- CLEAN ACCOUNTS ----------------
  const cleanedAccounts = (availableAccounts || []).map((item: any) => {
    console.log("🔍 [RAW ITEM]:", item);
    return item.account || item;
  });

  console.log("✅ [FINAL CLEAN ACCOUNTS]:", cleanedAccounts);

  // ---------------- METHOD SELECT ----------------
  const handleMethodSelect = (method: UIPaymentMethod) => {
    console.log("🟢 Selected Method:", method);
    setSelectedMethod(method);
    setStep("form");
  };

  // ---------------- VALIDATION ----------------
  const validateAmount = (
    amount: number,
    currency: string,
    methodId?: number,
  ) => {
    console.log("🧪 [VALIDATION]:", { amount, currency, methodId });

    if (!methodId) return null;

    const methodCurrencies = currencies[methodId];
    if (!methodCurrencies) return null;

    const currencyData = methodCurrencies.find(
      (c: any) => c.currency === currency,
    );

    if (!currencyData) return null;

    const min = parseFloat(currencyData.min_amount);
    const max = parseFloat(currencyData.max_amount);

    if (amount < min) return `Minimum amount is ${min}`;
    if (amount > max) return `Maximum amount is ${max}`;

    return null;
  };

  // ---------------- FORM SUBMIT ----------------
  const handleFormSubmit = async (data: FormDataType) => {
    if (!selectedMethod) return;

    console.log("🚀 [FORM SUBMIT DATA]:", data);

    const error = validateAmount(
      data.amount,
      data.currency,
      selectedMethod.paymentMethodId,
    );

    if (error) {
      setErrorMessage(error);
      setStep("error");
      return;
    }

    setFormData(data);

    try {
      const accounts = await findAccounts({
        payment_method: selectedMethod.code || selectedMethod.id,
        currency: data.currency,
        country: data.country,
        gender: data.gender,
        expected_amount: data.amount,
      });

      console.log("✅ [ACCOUNTS RETURNED]:", accounts);

      if (!accounts || accounts.length === 0) {
        setErrorMessage("No accounts found");
        setStep("error");
        return;
      }

      console.log("➡️ Moving to accounts screen");
      setStep("accounts");
    } catch (err: any) {
      console.error("❌ ERROR:", err);
      setErrorMessage(err.message);
      setStep("error");
    }
  };

  // ---------------- ACCOUNT SELECT ----------------
  const handleAccountSelect = async (account: any) => {
    console.log("📢 [NOTIFY ADMIN CLICKED]");
    console.log("📢 ACCOUNT:", account);
    console.log("📢 FORM DATA:", formData);

    try {
      const payload = {
        account_id: account.id,
        expected_amount: formData?.amount || 0,
      };

      console.log("🚀 [CALLING submitTransaction WITH]:", payload);

      const res = await submitTransaction(payload);

      console.log("✅ [TRANSACTION CREATED]:", res);

      setShowSuccess(true);
    } catch (err: any) {
      console.error("❌ TRANSACTION ERROR:", err);
      setErrorMessage(err.message);
      setStep("error");
    }
  };

  // ---------------- RENDER ----------------
  console.log("📺 [RENDERING ACCOUNTS]:", cleanedAccounts);

  return (
    <div className="w-full">
      {step === "choose" && (
        <ReceivePaymentMethodGrid
          onSelect={handleMethodSelect}
          onBack={onBack}
        />
      )}

      {step === "form" && selectedMethod && (
        <ReceivePaymentForm
          method={selectedMethod}
          onBack={() => setStep("choose")}
          onContinue={handleFormSubmit}
          isLoading={loading}
        />
      )}

      {step === "accounts" && (
        <ReceiveAccountsList
          accounts={cleanedAccounts}
          currency={formData?.currency || ""}
          onBack={() => setStep("form")}
          onSelect={handleAccountSelect}
          onCopy={() => {
            console.log("📋 COPY TRIGGERED");
            setShowCopyModal(true); // ✅ SHOW COPY MODAL
          }}
        />
      )}

      {/* ERROR */}
      <ReceiveErrorModal
        open={step === "error"}
        onClose={() => setStep("form")}
        errorMessage={errorMessage}
      />

      {/* SUCCESS (ADMIN NOTIFIED) */}
      <ReceiveSuccessModal
        open={showSuccess}
        title="Admin Notified!"
        message="Payment will be sent once admin confirms and approves."
        onOk={() => {
          setShowSuccess(false);
          setStep("choose");
        }}
      />

      {/* COPY MODAL */}
      <ReceiveSuccessModal
        open={showCopyModal}
        title="Copied!"
        message="Account details copied successfully."
        onOk={() => setShowCopyModal(false)}
      />
    </div>
  );
}
