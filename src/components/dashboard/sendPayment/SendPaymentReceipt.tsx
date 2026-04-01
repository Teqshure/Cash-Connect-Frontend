"use client";

import { useState } from "react";
import { Eye, EyeOff, TrendingUp, Loader2 } from "lucide-react";
import { UIPaymentMethod, useSendPayment } from "@/store/globalPayment";
import { PaymentFormData } from "./SendPaymentForm";
import { useAuthStore, User } from "@/store/useAuthStore";

type Props = {
  method: UIPaymentMethod;
  formData: PaymentFormData;
  onBack: () => void;
  onSuccess: () => void;
};

export default function SendPaymentReceipt({
  method,
  formData,
  onBack,
  onSuccess,
}: Props) {
  const { submitPayment, submitting } = useSendPayment();

  /* Wallet API for header */
  const user = useAuthStore((s: { user: User | null }) => s.user);
  const wallet = user?.wallet;

  const balance = Number(wallet?.balance ?? 0);
  const transactionLimit = Number(wallet?.transaction_limit ?? 0);

  const [showBalance, setShowBalance] = useState(true);
  const [error, setError] = useState("");

  const growth = 5.2;

  const amount = typeof formData.amount === "number" ? formData.amount : 0;
  const transactionFee = 0;
  const totalAmount = amount + transactionFee;

  const rows = [
    {
      label: "Date",
      value: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    },

    { label: "Name", value: formData.email },

    {
      label: "Value (qty)",
      value: `$${(amount / 100).toFixed(0)} (x1)`,
    },

    {
      label: "Order Amount",
      value: `₦${amount.toLocaleString()}.00`,
    },

    {
      label: "Transaction fee",
      value: `₦${transactionFee}.00`,
    },
  ];
  async function handleConfirm() {
    setError("");

    try {
      await submitPayment(formData, method);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Payment failed. Please try again.");
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        disabled={submitting}
        className="flex items-center gap-1 text-[13px] text-slate-500 hover:text-slate-800 mb-4 cursor-pointer transition disabled:opacity-50"
      >
        ← Back
      </button>

      <div className="bg-white rounded-[22px] shadow-sm overflow-hidden">
        {/* Wallet Header */}
        <div className="relative bg-emerald-600 px-5 py-5 text-white">
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/20 px-2.5 py-1 rounded-full text-[11px] font-medium">
            <TrendingUp className="w-3 h-3" />+{growth}%
          </div>

          <p className="text-[12px] text-white/70">Total Balance</p>

          <div className="flex items-center gap-2 mt-1">
            <p
              className={`text-[30px] font-semibold tracking-tight transition-all duration-300 ${
                showBalance ? "blur-0 opacity-100" : "blur-sm opacity-40"
              }`}
            >
              ₦{balance.toLocaleString()}
            </p>

            <button
              onClick={() => setShowBalance(!showBalance)}
              className="opacity-80 hover:opacity-100 transition"
            >
              {showBalance ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="flex justify-between mt-2 text-[12px] text-white/60">
            <span>Transaction Limit</span>
            <span className="text-white/80">
              ₦{transactionLimit.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Receipt Body */}
        <div className="px-5 py-5">
          {/* Header row like "Gift Card → Netflix" */}
          <div className="flex justify-between mb-4">
            <span className="text-emerald-600 font-semibold">Send Payment</span>

            <span className="text-slate-800 font-medium">{method.name}</span>
          </div>

          <div className="space-y-3 text-[13px]">
            {rows.map((row) => (
              <DetailRow
                key={row.label}
                label={row.label}
                value={row.value || "—"}
              />
            ))}

            {/* Total */}
            <div className="flex justify-between pt-3 border-t">
              <span className="text-emerald-600 font-semibold">
                Total Amount
              </span>

              <span className="font-semibold text-slate-900">
                ₦{totalAmount.toLocaleString()}.00
              </span>
            </div>
          </div>
        </div>

        {error && (
          <p className="px-5 pb-3 text-[13px] text-red-500 text-center">
            {error}
          </p>
        )}

        {/* Confirm Button */}
        <div className="p-4">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={submitting}
            className={[
              "w-full h-[52px] rounded-[12px] text-white font-semibold flex items-center justify-center gap-2 transition",
              submitting
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-emerald-600 hover:brightness-110 cursor-pointer",
            ].join(" ")}
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? "Processing..." : "Confirm Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-emerald-600 font-medium">{label}:</span>
      <span className="text-slate-800">{value}</span>
    </div>
  );
}
