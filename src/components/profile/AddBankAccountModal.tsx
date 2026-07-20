"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useWithdrawalStore } from "@/store/withdrawalStore";
import { useAuthStore } from "@/store/useAuthStore";

type AddBankAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
  accountToEdit?: any | null;
};

export default function AddBankAccountModal({ isOpen, onClose, accountToEdit }: AddBankAccountModalProps) {
  const { addBankAccount, error: storeError, isAdding } = useWithdrawalStore();
  const refreshUser = useAuthStore((s: any) => s.refreshUser);

  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (accountToEdit) {
        setBankName(accountToEdit.bank_name || "");
        setAccountNumber(accountToEdit.account_number ? String(accountToEdit.account_number) : "");
      } else {
        setBankName("");
        setAccountNumber("");
      }
      setLocalError(null);
    }
  }, [isOpen, accountToEdit]);

  if (!isOpen) return null;

  const isEditing = !!accountToEdit;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (accountNumber.length !== 10) {
      setLocalError("Account number must be exactly 10 digits.");
      return;
    }

    try {
      await addBankAccount(bankName, accountNumber, accountToEdit?.id);
      await refreshUser();
      onClose();
    } catch (err: any) {
      setLocalError(err.message || "Failed to save bank account.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-[24px] w-full max-w-md p-8 shadow-xl animate-in fade-in zoom-in-95 duration-200 overflow-y-auto max-h-[85vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[18px] font-semibold text-slate-900">
            {isEditing ? "Edit Bank Account" : "Add New Bank Account"}
          </h2>
          <button 
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {(localError || storeError) && (
          <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-xl text-xs font-semibold">
            {localError || storeError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">Bank Name</label>
            <input
              type="text"
              placeholder="e.g. GTBank, Access Bank, Kuda"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full h-[48px] px-4 rounded-xl border border-slate-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition font-medium text-slate-800"
              required
              disabled={isAdding}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">Account Number</label>
            <input
              type="text"
              pattern="[0-9]*"
              maxLength={10}
              placeholder="10-digit account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
              className="w-full h-[48px] px-4 rounded-xl border border-slate-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition font-medium text-slate-800"
              required
              disabled={isAdding}
            />
          </div>

          <button
            type="submit"
            disabled={isAdding}
            className="mt-4 w-full h-[48px] rounded-xl bg-emerald-600 text-white font-medium text-[15px] hover:bg-emerald-700 transition disabled:opacity-70 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          >
            {isAdding ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving Account...
              </>
            ) : isEditing ? (
              "Update Bank Account"
            ) : (
              "Add Bank Account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
