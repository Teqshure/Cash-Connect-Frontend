"use client";

/**
 * SendPaymentReceipt
 * Shows a receipt summary before final confirmation.
 */

import { PaymentMethod } from "./sendPaymentData";
import { PaymentFormData } from "./SendPaymentForm";

type Props = {
  method: PaymentMethod;
  formData: PaymentFormData;
  onBack: () => void;
  onBuyNow: () => void;
};

type ReceiptRow = { label: string; value: string; colored?: boolean };

export default function SendPaymentReceipt({
  method,
  formData,
  onBack,
  onBuyNow,
}: Props) {
  const amount = typeof formData.amount === "number" ? formData.amount : 0;
  const transactionFee = 0;
  const totalAmount = amount + transactionFee;

  const rows: ReceiptRow[] = [
    { label: "Gift Card", value: method.name, colored: true },
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
    { label: "Name", value: "" },
    { label: "Value (qty):", value: "$30 (x1)" },
    { label: "Deliver to", value: "" },
    {
      label: "Order Amount:",
      value: `₦${amount.toLocaleString()}.0`,
      colored: true,
    },
    { label: "Transaction fee:", value: `₦${transactionFee}.0`, colored: true },
    {
      label: "Total Amount:",
      value: `₦${totalAmount.toLocaleString()}.0`,
      colored: true,
    },
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

      {/* Method name header */}
      <div className="mb-6 rounded-[16px] bg-emerald-600 px-6 py-5 text-white">
        <p className="text-[13px] text-white/80">Payment via</p>
        <p className="text-[22px] font-bold mt-1">{method.name}</p>
        <p className="text-[13px] text-white/70 mt-1">
          {formData.currency} · {formData.country}
        </p>
      </div>

      {/* Receipt rows */}
      <div className="bg-white rounded-[16px] border border-slate-100 shadow-sm px-6 py-5 space-y-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <span
              className={[
                "text-[13px]",
                row.colored ? "text-emerald-600 font-medium" : "text-slate-500",
              ].join(" ")}
            >
              {row.label}
            </span>
            <span className="text-[13px] font-semibold text-slate-800">
              {row.value || "—"}
            </span>
          </div>
        ))}
      </div>

      {/* Buy Now */}
      <button
        type="button"
        onClick={onBuyNow}
        className="mt-6 h-[52px] w-full rounded-[12px] bg-emerald-600 text-white font-semibold text-[15px] hover:brightness-110 transition cursor-pointer"
      >
        Buy Now
      </button>
    </div>
  );
}
