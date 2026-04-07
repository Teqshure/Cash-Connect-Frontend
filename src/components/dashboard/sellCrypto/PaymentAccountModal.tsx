"use client";

import { useState, useEffect } from "react";
import { X, Check, ChevronDown, Loader2 } from "lucide-react";
import { useWithdrawalStore } from "@/store/withdrawalStore";

type PaymentAccountOption = {
  id: string;
  type: "bank";
  label: string;
  sublabel: string;
  logoText?: string;
  logoColor?: string;
  bankAccountId: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onContinue: (account: PaymentAccountOption) => void;
};

export default function PaymentAccountModal({
  open,
  onClose,
  onContinue,
}: Props) {
  const [selectedId, setSelectedId] = useState<string>("");
  const { bankAccounts, fetchBankAccounts, isLoadingAccounts } =
    useWithdrawalStore();

  useEffect(() => {
    if (open && bankAccounts.length === 0) {
      fetchBankAccounts();
    }
  }, [open, bankAccounts.length, fetchBankAccounts]);

  // Map bank accounts to UI format
  const accounts: PaymentAccountOption[] = bankAccounts.map((bank: any) => ({
    id: String(bank.id),
    type: "bank",
    label: `${bank.account_number} - ${bank.account_name || "Account Holder"}`,
    sublabel: bank.bank_name,
    logoText: bank.bank_name.substring(0, 2).toUpperCase(),
    logoColor: "bg-red-600",
    bankAccountId: bank.id,
  }));

  if (!open) return null;

  const selected = accounts.find((a) => a.id === selectedId);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full bg-white z-10 rounded-[24px] max-w-[480px] px-5 pt-5 pb-8 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-1">
          <div className="flex-1 pr-3">
            <h3 className="text-[18px] font-bold text-slate-900">
              Payment Account
            </h3>
            <p className="text-[12px] text-slate-500 mt-1 leading-5">
              Your payment will be deposited to your selected bank account once
              token transfer has been confirmed.
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

        {isLoadingAccounts ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
          </div>
        ) : (
          <>
            <div className="mt-4 space-y-2">
              {accounts.map((acc) => {
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

            <button
              type="button"
              className="mt-4 text-[13px] font-semibold text-emerald-600 hover:text-emerald-700 transition"
            >
              + Add another account
            </button>
          </>
        )}

        {!isLoadingAccounts && selected && (
          <button
            type="button"
            onClick={() => onContinue(selected)}
            className="mt-4 w-full h-[52px] rounded-[14px] bg-emerald-600 text-white text-[15px] font-semibold hover:brightness-110 transition cursor-pointer"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
