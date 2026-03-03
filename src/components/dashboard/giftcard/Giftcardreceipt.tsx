"use client";

import { GiftCard, GiftCardDenomination } from "./Giftcarddata";

type Props = {
  mode: "buy" | "sell";
  card: GiftCard;
  denomination: GiftCardDenomination;
  qty: number;
  onBack: () => void;
  onConfirm: () => void;
};

export default function GiftCardReceipt({
  mode,
  card,
  denomination,
  qty,
  onBack,
  onConfirm,
}: Props) {
  const orderAmount = denomination.ngnPrice * qty;
  const transactionFee = 0;
  const totalAmount = orderAmount + transactionFee;

  const rows = [
    { label: "Gift Card", value: card.name, colored: true },
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
    { label: "Name:", value: "" },
    {
      label: "Value (qty):",
      value: `$${denomination.value} (x${qty})`,
      colored: true,
    },
    { label: "Deliver to", value: "" },
    {
      label: "Order Amount:",
      value: `₦${orderAmount.toLocaleString()}.0`,
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
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-[13px] text-slate-500 hover:text-slate-800 mb-6 cursor-pointer transition"
      >
        ← Back
      </button>

      {/* Wallet balance card placeholder */}
      <div className="mb-5 rounded-[16px] bg-emerald-600 px-5 py-4 text-white">
        <p className="text-[12px] text-white/70">Total Balance</p>
        <p className="text-[26px] font-bold mt-0.5">₦300,000</p>
        <p className="text-[11px] text-white/60 mt-1">
          Transaction Limit &nbsp; ₦100,000
        </p>
        <div className="mt-3 flex gap-3">
          <button
            type="button"
            className="flex-1 h-[36px] rounded-[10px] bg-white/20 text-white text-[12px] font-semibold"
          >
            + Fund Wallet
          </button>
          <button
            type="button"
            className="flex-1 h-[36px] rounded-[10px] bg-white/20 text-white text-[12px] font-semibold"
          >
            ↓ Withdraw
          </button>
        </div>
      </div>

      {/* Receipt rows */}
      <div className="bg-white rounded-[16px] border border-slate-100 shadow-sm px-5 py-4 space-y-3 mb-5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <span
              className={`text-[13px] ${row.colored ? "text-emerald-600 font-medium" : "text-slate-500"}`}
            >
              {row.label}
            </span>
            <span className="text-[13px] font-semibold text-slate-800">
              {row.value || "—"}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={onConfirm}
        className="w-full h-[52px] rounded-[12px] bg-emerald-600 text-white font-semibold text-[15px] hover:brightness-110 transition cursor-pointer"
      >
        {mode === "buy" ? "Buy Now" : "Sell Now"}
      </button>
    </div>
  );
}
