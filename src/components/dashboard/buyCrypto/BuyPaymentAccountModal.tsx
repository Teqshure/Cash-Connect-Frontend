"use client";

import { useState, useEffect } from "react";
import { X, Check, ChevronDown } from "lucide-react";
import { PAYMENT_ACCOUNTS, PaymentAccountOption } from "./buyCryptoData";

type Props = {
  open: boolean;
  onClose: () => void;
  onContinue: (account: PaymentAccountOption) => void;

  // ✅ OPTIONAL (future API support)
  accounts?: PaymentAccountOption[];
  loading?: boolean;
};

export default function BuyPaymentAccountModal({
  open,
  onClose,
  onContinue,
  accounts,
  loading = false,
}: Props) {
  // ✅ Use API accounts if provided, fallback to static
  const data = accounts && accounts.length ? accounts : PAYMENT_ACCOUNTS;

  const [selectedId, setSelectedId] = useState<string>(data[0]?.id);

  // ✅ Reset selection when modal opens
  useEffect(() => {
    if (open && data.length) {
      setSelectedId(data[0].id);
    }
  }, [open, data]);

  if (!open) return null;

  const selected = data.find((a) => a.id === selectedId)!;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full bg-white z-10 rounded-[24px] max-w-[480px] px-5 pt-5 pb-8 shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-1">
          <div className="flex-1 pr-3">
            <h3 className="text-[18px] font-bold text-slate-900">
              Payment Account
            </h3>
            <p className="text-[12px] text-slate-500 mt-1 leading-5">
              Choose your mode of payment, Bank transfer, Crypto, or from
              balance
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-full border border-slate-200 grid place-items-center hover:bg-slate-50 transition flex-shrink-0 mt-0.5"
          >
            <X className="h-3.5 w-3.5 text-slate-600" />
          </button>
        </div>

        {/* ✅ Loading state */}
        {loading && (
          <p className="text-center text-sm text-slate-500 mt-6">
            Loading payment accounts...
          </p>
        )}

        {/* Account list */}
        {!loading && (
          <div className="mt-4 space-y-2">
            {data.map((acc) => {
              const isSelected = selectedId === acc.id;
              return (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => setSelectedId(acc.id)}
                  className={[
                    "w-full flex items-center gap-3 px-4 py-3.5 rounded-[14px] border transition text-left",
                    isSelected
                      ? "border-emerald-400 bg-white"
                      : "border-slate-200 bg-white hover:border-slate-300",
                  ].join(" ")}
                >
                  <div
                    className={`h-11 w-11 rounded-full ${acc.logoColor} flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0`}
                  >
                    {acc.logoText}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-slate-800 truncate">
                      {acc.label}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {acc.sublabel}
                    </p>
                  </div>
                  {isSelected ? (
                    <div className="h-6 w-6 rounded-full bg-emerald-500 grid place-items-center flex-shrink-0">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </div>
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        <button
          type="button"
          className="mt-4 text-[13px] font-semibold text-emerald-600 hover:text-emerald-700 transition"
        >
          Add another account
        </button>

        <button
          type="button"
          disabled={!selected}
          onClick={() => onContinue(selected)}
          className={[
            "mt-4 w-full h-[52px] rounded-[14px] text-white text-[15px] font-semibold transition",
            selected
              ? "bg-emerald-600 hover:brightness-110 cursor-pointer"
              : "bg-slate-300 cursor-not-allowed",
          ].join(" ")}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
