"use client";

import { useState } from "react";
import { Eye, EyeOff, TrendingUp } from "lucide-react";
import { useAuthStore, User } from "@/store/useAuthStore";

type Props = {
  method: {
    id: string;
    name: string;
  };

  formData: {
    email: string;
    currency: string;
    amount: number | string;
    conversion?: number;
    fee?: number;
    tagId: string;
  };

  transactionId?: string;

  onBack: () => void;
  onSendRequest: () => void;
  isSubmitting?: boolean;
};

export default function ReceivePaymentReceipt({
  method,
  formData,
  transactionId,
  onBack,
  onSendRequest,
  isSubmitting = false,
}: Props) {
  const user = useAuthStore((s: { user: User | null }) => s.user);

  const wallet = user?.wallet;

  const balance = Number(wallet?.balance ?? 0);
  const transactionLimit = Number(wallet?.transaction_limit ?? 0);

  const [showBalance, setShowBalance] = useState(true);

  const [generatedTransactionId] = useState(() => {
    if (transactionId) return transactionId;

    return `TXN-${new Date().getFullYear()}-${Math.floor(
      Math.random() * 1000000,
    )}`;
  });

  const growth = 5.2;

  /* ---------------- SAFE NUMBER CALCULATIONS ---------------- */

  const requestAmount = Number(formData.amount || 0);

  // fallback rate if backend has not sent conversion
  const fallbackRate = 1700;

  const rate =
    formData.conversion && requestAmount
      ? Number(formData.conversion) / requestAmount
      : fallbackRate;

  const conversion = Number(formData.conversion) || requestAmount * rate;

  const fee = Number(formData.fee) || 100;

  const totalAmount = conversion + fee;

  /* ----------------------------------------------------------- */

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Back */}
      <button
        onClick={onBack}
        className="text-[13px] text-slate-500 mb-4 flex items-center gap-1 hover:text-slate-800 transition"
      >
        ← Back
      </button>

      <div className="bg-white rounded-[20px] shadow-sm overflow-hidden">
        {/* WALLET HEADER */}
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

        {/* RECEIPT DETAILS */}
        <div className="px-5 py-5">
          <h3 className="text-[16px] font-semibold mb-4">
            Receive via {method.name}
          </h3>

          <div className="space-y-3 text-[13px]">
            <DetailRow label="Payout Method" value={method.name} />

            <DetailRow
              label="Date"
              value={new Date().toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            />

            <DetailRow label="Your Email" value={formData.email} />

            <DetailRow label="Currency" value={formData.currency} />

            <DetailRow
              label="Request Amount"
              value={`$${requestAmount.toLocaleString()}`}
            />

            <DetailRow
              label="Conversion"
              value={`₦${conversion.toLocaleString()}`}
            />

            <DetailRow label="Fee" value={`₦${fee.toLocaleString()}`} />

            <DetailRow label="Transaction ID" value={generatedTransactionId} />

            <DetailRow label="Tag ID" value={formData.tagId || "N/A"} />

            <DetailRow label="Processing Time" value="1-2 days" />

            {/* TOTAL */}
            <div className="flex justify-between pt-3 border-t">
              <span className="font-bold text-emerald-700">Total Amount</span>

              <span className="font-bold text-emerald-700 text-[16px]">
                ₦{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <div className="p-4">
          <button
            onClick={onSendRequest}
            disabled={isSubmitting}
            className={[
              "w-full h-[52px] rounded-[12px] text-white font-semibold flex items-center justify-center gap-2 transition",
              isSubmitting
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-emerald-600 hover:brightness-110 cursor-pointer",
            ].join(" ")}
          >
            {isSubmitting ? "Processing..." : "Send Request"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      {" "}
      <span className="text-slate-500">{label}:</span>{" "}
      <span className="font-medium">{value}</span>{" "}
    </div>
  );
}
