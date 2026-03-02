"use client";

import { ReceivePaymentMethod, RATE_PER_USDT } from "./receivePaymentData";
import { ReceivePaymentFormData } from "./ReceivePaymentForm";

type Props = {
  method: ReceivePaymentMethod;
  formData: ReceivePaymentFormData;
  onBack: () => void;
  onSendRequest: () => void;
};

type ReceiptRow = {
  label: string;
  value: string;
};

function ReceivePaymentReceipt({
  method,
  formData,
  onBack,
  onSendRequest,
}: Props) {
  const amount = typeof formData.amount === "number" ? formData.amount : 0;
  const requestAmountUSD = (amount / RATE_PER_USDT).toFixed(0);
  const conversion = amount;
  const fee = Math.round(amount * 0.02);
  const total = amount + fee;

  const rows: ReceiptRow[] = [
    { label: "Payout Method:", value: method.name },
    {
      label: "Date:",
      value: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    { label: "Your Email", value: formData.email || "—" },
    { label: "Currency:", value: formData.currency },
    { label: "Request Amount:", value: `$${requestAmountUSD}` },
    { label: "Conversion:", value: `₦${conversion.toLocaleString()}` },
    { label: "Fee:", value: `₦${fee.toLocaleString()}` },
    { label: "Transaction ID:", value: formData.tagId },
    { label: "Tag ID:", value: formData.tagId },
    { label: "Total Amount:", value: `₦${total.toLocaleString()}` },
    { label: "Processing Time:", value: "1-2/days" },
  ];

  return (
    <div className="w-full">
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-[13px] text-slate-500 hover:text-slate-800 mb-6 cursor-pointer transition"
      >
        ← Back
      </button>

      {/* Wallet balance card */}
      <div className="mb-6 rounded-[16px] bg-emerald-600 px-6 py-5 text-white">
        <p className="text-[12px] text-white/70">Total Balance</p>
        <p className="text-[28px] font-bold mt-1">₦300,000</p>
        <p className="text-[12px] text-white/70 mt-2">
          Transaction Limit: ₦100,000
        </p>
        <div className="mt-3 flex gap-3">
          <button className="flex-1 h-[36px] rounded-[10px] bg-white text-emerald-700 text-[13px] font-semibold">
            + Fund Wallet
          </button>
          <button className="flex-1 h-[36px] rounded-[10px] bg-emerald-700 text-white text-[13px] font-semibold border border-white/20">
            ↓ Withdraw
          </button>
        </div>
      </div>

      {/* Receipt rows */}
      <div className="bg-white rounded-[16px] border border-slate-100 shadow-sm px-6 py-5 space-y-4">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-start justify-between gap-4"
          >
            <span className="text-[13px] text-emerald-600 font-medium whitespace-nowrap">
              {row.label}
            </span>
            <span className="text-[13px] font-semibold text-slate-800 text-right break-all">
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Send Request */}
      <button
        type="button"
        onClick={onSendRequest}
        className="mt-6 h-[52px] w-full rounded-[12px] bg-emerald-600 text-white font-semibold text-[15px] hover:brightness-110 transition cursor-pointer"
      >
        Send Request
      </button>
    </div>
  );
}

export default ReceivePaymentReceipt;
