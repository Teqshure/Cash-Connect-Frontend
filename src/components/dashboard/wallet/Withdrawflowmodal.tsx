"use client";

import { useCallback, useEffect, useState } from "react";
import { X, Check, Plus, Loader2, Trash2 } from "lucide-react";
import { useWithdrawalStore, BankAccount } from "@/store/withdrawalStore";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type Step = "choose" | "add" | "addSuccess" | "success";

type Props = {
  open: boolean;
  onClose: () => void;
  amount: number;
  currency?: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function WithdrawFlowModal({
  open,
  onClose,
  amount,
  currency = "NGN",
}: Props) {
  const {
    bankAccounts,
    isLoadingAccounts,
    isSubmitting,
    isAdding,
    isDeleting,
    error,
    fetchBankAccounts,
    addBankAccount,
    createWithdrawal,
    deleteBankAccount,
  } = useWithdrawalStore();

  const [step, setStep] = useState<Step>("choose");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // Add account form state
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bvn, setBvn] = useState("");

  // Fetch bank accounts when modal opens
  useEffect(() => {
    if (open) fetchBankAccounts();
  }, [open, fetchBankAccounts]);

  // Auto-select first account when accounts load
  useEffect(() => {
    if (bankAccounts.length > 0 && selectedId === null) {
      setSelectedId(bankAccounts[0].id);
    }
  }, [bankAccounts, selectedId]);

  const closeAll = useCallback(() => {
    setStep("choose");
    setSelectedId(null);
    setDeleteConfirmId(null);
    setAccountNumber("");
    setBankName("");
    setBvn("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeAll]);

  if (!open) return null;

  // Basic validation
  const canAdd =
    accountNumber.length >= 10 &&
    accountNumber.length <= 20 &&
    bankName.trim().length > 0 &&
    bvn.length >= 10 &&
    bvn.length <= 20;

  const handleWithdraw = async () => {
    if (!selectedId) return;
    try {
      await createWithdrawal(amount, selectedId);
      setStep("success");
    } catch {
      /* error shown from store */
    }
  };

  const handleAddAccount = async () => {
    try {
      await addBankAccount(bankName, accountNumber, bvn);
      setStep("addSuccess");
      // Reset form
      setAccountNumber("");
      setBankName("");
      setBvn("");
    } catch {
      /* error shown from store */
    }
  };

  const handleDeleteAccount = async (accountId: number) => {
    try {
      await deleteBankAccount(accountId);
      setDeleteConfirmId(null);

      // If the deleted account was selected, clear selection
      if (selectedId === accountId) {
        setSelectedId(null);
      }
    } catch {
      /* error shown from store */
    }
  };

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        aria-label="Close modal"
        onClick={closeAll}
        className="absolute inset-0 bg-black/30"
      />

      <div className="absolute inset-0 grid place-items-center px-4">
        <div className="w-full max-w-[500px] rounded-[28px] bg-white shadow-[0_25px_80px_rgba(2,6,23,0.25)] overflow-hidden">
          {/* ── Step 1: Choose account ─────────────────────────────────── */}
          {step === "choose" && (
            <div className="px-7 py-7">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h3 className="text-[20px] font-semibold text-slate-900">
                    Withdrawal Account
                  </h3>
                  <p className="text-[13px] text-slate-500 mt-0.5">
                    Select the account you want to withdraw to.
                  </p>
                </div>
                <button
                  onClick={closeAll}
                  className="h-8 w-8 rounded-full border border-slate-200 grid place-items-center hover:bg-slate-50 transition"
                >
                  <X className="h-4 w-4 text-slate-600" />
                </button>
              </div>

              {/* Loading */}
              {isLoadingAccounts && (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
                </div>
              )}

              {/* API Error */}
              {error && (
                <p className="mt-4 text-[13px] text-red-500 text-center">
                  {error}
                </p>
              )}

              {/* Empty state */}
              {!isLoadingAccounts && bankAccounts.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-[13px] text-slate-400">
                    No bank accounts saved yet.
                  </p>
                </div>
              )}

              {/* Accounts list */}
              {!isLoadingAccounts && bankAccounts.length > 0 && (
                <div className="mt-5 space-y-3">
                  {bankAccounts.map((acc: BankAccount) => {
                    const isSelected = selectedId === acc.id;
                    const isDeletingThis = deleteConfirmId === acc.id;
                    const initials = acc.bank_name.slice(0, 2).toUpperCase();

                    return (
                      <div
                        key={acc.id}
                        className={[
                          "relative rounded-[14px] border transition",
                          isSelected
                            ? "border-emerald-400 bg-emerald-50/40"
                            : "border-slate-200 bg-white hover:bg-slate-50",
                        ].join(" ")}
                      >
                        {/* Delete confirmation overlay */}
                        {isDeletingThis && (
                          <div className="absolute inset-0 bg-white/95 rounded-[14px] z-10 flex items-center justify-between px-4">
                            <span className="text-[13px] text-slate-700">
                              Delete this account?
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-3 py-1.5 text-[12px] font-medium rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleDeleteAccount(acc.id)}
                                disabled={isDeleting}
                                className="px-3 py-1.5 text-[12px] font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                              >
                                {isDeleting && (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                )}
                                Delete
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-4 px-4 py-4">
                          <button
                            type="button"
                            onClick={() => setSelectedId(acc.id)}
                            className="flex-1 flex items-center gap-4 min-w-0"
                          >
                            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-[13px] flex-shrink-0">
                              {initials}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[14px] font-semibold text-slate-800 truncate">
                                {acc.account_number}
                                {acc.account_name
                                  ? ` — ${acc.account_name}`
                                  : ""}
                              </p>
                              <p className="text-[12px] text-slate-500 mt-0.5">
                                {acc.bank_name}
                              </p>
                            </div>
                          </button>

                          {/* Delete button */}
                          <button
                            onClick={() => setDeleteConfirmId(acc.id)}
                            className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition flex-shrink-0"
                            aria-label="Delete account"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                          {isSelected && (
                            <div className="h-6 w-6 rounded-full bg-emerald-500 grid place-items-center flex-shrink-0">
                              <Check className="h-3.5 w-3.5 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep("add")}
                  className="text-[13px] font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add another account
                </button>
                <button
                  type="button"
                  onClick={handleWithdraw}
                  disabled={!selectedId || isSubmitting}
                  className={[
                    "h-[44px] px-8 rounded-[12px] text-[14px] font-semibold transition flex items-center gap-2",
                    selectedId && !isSubmitting
                      ? "bg-emerald-600 text-white hover:brightness-110 cursor-pointer"
                      : "bg-slate-200 text-slate-500 cursor-not-allowed",
                  ].join(" ")}
                >
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Processing..." : "Continue"}
                </button>
              </div>
            </div>
          )}

          {/* ── Step 2: Add new account ────────────────────────────────── */}
          {step === "add" && (
            <div className="px-7 py-7">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[20px] font-semibold text-slate-900">
                  Add Account
                </h3>
                <button
                  onClick={closeAll}
                  className="h-8 w-8 rounded-full border border-slate-200 grid place-items-center hover:bg-slate-50 transition"
                >
                  <X className="h-4 w-4 text-slate-600" />
                </button>
              </div>

              {error && (
                <p className="mb-4 text-[13px] text-red-500 text-center">
                  {error}
                </p>
              )}

              <div className="space-y-4">
                <div>
                  <label className="text-[13px] font-medium text-slate-700 mb-1.5 block">
                    Account number
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={20}
                    value={accountNumber}
                    onChange={(e) =>
                      setAccountNumber(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="Enter account number (10–20 digits)"
                    className="w-full h-[48px] rounded-[10px] border border-slate-200 bg-slate-50 px-4 text-[14px] outline-none focus:border-emerald-500 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="text-[13px] font-medium text-slate-700 mb-1.5 block">
                    Bank name
                  </label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="Enter bank name"
                    className="w-full h-[48px] rounded-[10px] border border-slate-200 bg-slate-50 px-4 text-[14px] outline-none focus:border-emerald-500 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="text-[13px] font-medium text-slate-700 mb-1.5 block">
                    BVN (Bank verification number)
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={20}
                    value={bvn}
                    onChange={(e) => setBvn(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter BVN (10–20 digits)"
                    className="w-full h-[48px] rounded-[10px] border border-slate-200 bg-slate-50 px-4 text-[14px] outline-none focus:border-emerald-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddAccount}
                disabled={isAdding || !canAdd}
                className={[
                  "mt-6 h-[52px] w-full rounded-[12px] font-semibold text-[15px]",
                  "transition flex items-center justify-center gap-2",
                  canAdd && !isAdding
                    ? "bg-emerald-600 text-white hover:brightness-110 cursor-pointer"
                    : "bg-slate-200 text-slate-500 cursor-not-allowed",
                ].join(" ")}
              >
                {isAdding && <Loader2 className="h-4 w-4 animate-spin" />}
                {isAdding ? "Adding..." : "Add Account"}
              </button>
            </div>
          )}

          {/* ── Step 3: Account added successfully ──────────────────────── */}
          {step === "addSuccess" && (
            <SuccessScreen
              title="Account Added!"
              message="Your new bank account was added successfully."
              onOk={() => setStep("choose")}
            />
          )}

          {/* ── Step 4: Withdrawal submitted successfully ─────────────────── */}
          {step === "success" && (
            <SuccessScreen
              title="Thanks"
              message="Successful. Your money will be sent to you after verification of payment."
              onOk={closeAll}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-component: reusable success screen
// ─────────────────────────────────────────────────────────────────────────────

function SuccessScreen({
  title,
  message,
  onOk,
}: {
  title: string;
  message: string;
  onOk: () => void;
}) {
  return (
    <div className="px-8 py-12 text-center">
      <div className="mx-auto h-16 w-16 rounded-full bg-emerald-50 grid place-items-center">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8Z"
            stroke="#22c55e"
            strokeWidth="1.8"
          />
          <path
            d="M8.5 12.3l2.2 2.2 4.9-5"
            stroke="#22c55e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="mt-5 text-[22px] font-semibold text-emerald-600">
        {title}
      </h3>
      <p className="mt-2 text-[13px] text-slate-500 leading-6">{message}</p>
      <button
        type="button"
        onClick={onOk}
        className="mt-6 h-[40px] px-8 rounded-[12px] bg-emerald-600 text-white font-semibold text-[14px] hover:brightness-110 transition"
      >
        Ok
      </button>
    </div>
  );
}
