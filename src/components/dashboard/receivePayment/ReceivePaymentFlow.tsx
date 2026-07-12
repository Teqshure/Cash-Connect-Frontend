"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReceivePaymentMethodGrid from "./ReceivePaymentMethodGrid";
import ReceivePaymentForm from "./ReceivePaymentForm";
import ReceiveAccountsList from "./ReceiveAccountsList";
import ReceiveErrorModal from "./ReceiveErrorModal";
import ReceiveSuccessModal from "./ReceiveSuccessModal";
import ReceiveP2PTradeScreen from "./ReceiveP2PTradeScreen";
import { UIPaymentMethod, useGlobalPaymentStore } from "@/store/globalPayment";
import { AlertTriangle, Clock } from "lucide-react";

type Step = "choose" | "form" | "accounts" | "error" | "p2p_trade";

type FormDataType = {
  amount: number;
  currency: string;
  country: string;
  gender: string;
};

export default function ReceivePaymentFlow({ onBack }: any) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("choose");
  const [selectedMethod, setSelectedMethod] = useState<UIPaymentMethod | null>(
    null,
  );
  const [formData, setFormData] = useState<FormDataType | null>(null);

  const [showSuccess, setShowSuccess] = useState(false); // ✅ notify admin modal
  const [showCopyModal, setShowCopyModal] = useState(false); // ✅ copy modal
  const [unavailableMethodName, setUnavailableMethodName] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [activeTx, setActiveTx] = useState<any>(null);

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
    if (!method.accounts || method.accounts.length === 0) {
      setUnavailableMethodName(method.name);
      return;
    }
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
    console.log("📢 [ACCOUNT SELECTED / CREATING SESSION]");
    console.log("📢 ACCOUNT:", account);
    console.log("📢 FORM DATA:", formData);

    try {
      const payload = {
        account_id: account.id,
        expected_amount: formData?.amount || 0,
      };

      console.log("🚀 [CALLING submitTransaction WITH]:", payload);

      const res = await submitTransaction(payload);
      const txData = res?.data || res;

      console.log("✅ [TRANSACTION CREATED]:", txData);
      setActiveTx(txData);
      setStep("p2p_trade");
      return res;
    } catch (err: any) {
      console.error("❌ TRANSACTION ERROR:", err);
      if (err.status === 409 || err.message?.toLowerCase().includes("duplicate") || err.message?.toLowerCase().includes("active expected payment")) {
        setIsDuplicate(true);
      } else {
        setErrorMessage(err.message);
        setStep("error");
      }
      throw err;
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
          onCopy={() => {}}
        />
      )}

      {step === "p2p_trade" && activeTx && (
        <ReceiveP2PTradeScreen
          tx={activeTx}
          onCancel={() => setStep("choose")}
          onComplete={() => {
            setShowSuccess(true);
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
        message="Account details copied successfully. Admin has been notified."
        onOk={() => {
          setShowCopyModal(false);
          setStep("choose");
        }}
      />

      {isDuplicate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[24px] shadow-2xl p-8 max-w-sm w-full text-center flex flex-col items-center animate-in zoom-in-95 duration-200 border border-slate-100 max-h-[85vh] overflow-y-auto">
            <div className="w-16 h-16 bg-amber-50 border border-amber-100 rounded-full flex items-center justify-center mb-5 animate-pulse">
              <Clock className="w-8 h-8 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
            <h3 className="text-[17px] font-bold text-slate-800 mb-2">
              Active Session Found
            </h3>
            <p className="text-[13px] text-slate-500 mb-6 px-3 leading-relaxed">
              You already have an active expected payment request matching this amount and payment method option. Please copy the account details from your Payouts screen to complete the payment.
            </p>
            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={() => {
                  setIsDuplicate(false);
                  router.push("/payouts");
                }}
                className="w-full py-3 bg-[#00B86B] hover:bg-[#009b5a] text-white font-bold rounded-xl text-sm transition cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                Go to Payouts
              </button>
              <button
                onClick={() => {
                  setIsDuplicate(false);
                  setStep("choose");
                }}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {unavailableMethodName && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[24px] shadow-2xl p-8 max-w-sm w-full text-center flex flex-col items-center animate-in zoom-in-95 duration-200 border border-slate-100 max-h-[85vh] overflow-y-auto">
            <div className="w-16 h-16 bg-amber-50 border border-amber-100 rounded-full flex items-center justify-center mb-5 animate-bounce">
              <AlertTriangle className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-[17px] font-bold text-slate-800 mb-2">
              Payment method not available
            </h3>
            <p className="text-[13px] text-slate-500 mb-6 px-3 leading-relaxed">
              Payment method not available check back later
            </p>
            <button
              onClick={() => setUnavailableMethodName(null)}
              className="w-full py-3 bg-[#007042] hover:bg-[#005a35] text-white font-bold rounded-xl text-sm transition cursor-pointer shadow-sm"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
