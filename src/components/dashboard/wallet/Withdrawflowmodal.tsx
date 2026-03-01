"use client";

/**
 * WithdrawFlowModal
 *
 * Multi-step modal that guides the user through the withdrawal process:
 *   1. choose   — select a saved bank account
 *   2. add      — add a new bank account (with BVN verification simulation)
 *   3. addSuccess — confirmation that the new account was saved
 *   4. success  — confirmation that the withdrawal request was submitted
 */

import { useCallback, useEffect, useState } from "react";
import { X, Check, Plus, Loader2 } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type Step = "choose" | "add" | "addSuccess" | "success";

type BankAccount = {
  id: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
  logoUrl: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  amount: number;
  currency?: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// Static data  (replace with API call in production)
// ─────────────────────────────────────────────────────────────────────────────

const SAVED_ACCOUNTS: BankAccount[] = [
  {
    id: "1",
    accountNumber: "2141536385",
    accountName: "Emmanuel Nwaezeoma Chijioke",
    bankName: "United Bank of Africa",
    logoUrl: "https://logo.clearbit.com/ubagroup.com",
  },
  {
    id: "2",
    accountNumber: "74024029",
    accountName: "Emmanuel Nwaezema Chijioke",
    bankName: "Opay Fintech",
    logoUrl: "https://logo.clearbit.com/opay.com",
  },
  {
    id: "3",
    accountNumber: "9021342311",
    accountName: "Emmanuel Nwaezema Chijioke",
    bankName: "Access Bank",
    logoUrl: "https://logo.clearbit.com/accessbankplc.com",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Returns true only when all three add-account fields are complete enough to verify. */
const canVerify = (acct: string, bank: string, bvn: string) =>
  acct.length === 10 && bank.trim().length > 0 && bvn.length === 11;

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function WithdrawFlowModal({
  open,
  onClose,
  amount,
  currency = "NGN",
}: Props) {
  // ── Step & account selection state ────────────────────────────────────────
  const [step, setStep] = useState<Step>("choose");
  const [selectedId, setSelectedId] = useState<string>("2");

  // ── Add-account form state ────────────────────────────────────────────────
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bvn, setBvn] = useState("");
  const [verifiedName, setVerifiedName] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [adding, setAdding] = useState(false);

  // ── Reset everything and close ────────────────────────────────────────────
  // Wrapped in useCallback so the Escape-key effect has a stable dependency.
  const closeAll = useCallback(() => {
    setStep("choose");
    setSelectedId("2");
    setAccountNumber("");
    setBankName("");
    setBvn("");
    setVerifiedName("");
    setVerifying(false);
    onClose();
  }, [onClose]);

  // ── Escape key listener ───────────────────────────────────────────────────
  // setState is only called inside the event callback, never in the effect body.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeAll]);

  // ── BVN verification simulation ───────────────────────────────────────────
  // We avoid calling setState synchronously inside the effect body by deferring
  // all state updates to setTimeout callbacks (runs after paint).
  useEffect(() => {
    if (!canVerify(accountNumber, bankName, bvn)) {
      const clearVerified = setTimeout(() => setVerifiedName(""), 0);
      return () => clearTimeout(clearVerified);
    }

    // Defer spinner start to a callback — never synchronous setState in body
    const startSpinner = setTimeout(() => setVerifying(true), 0);

    // Simulate an API call to verify BVN + account details
    const verify = setTimeout(() => {
      setVerifying(false);
      setVerifiedName("Nwaezeoma Emmanuel Chijioke");
    }, 1200);

    return () => {
      clearTimeout(startSpinner);
      clearTimeout(verify);
      setVerifying(false);
    };
  }, [accountNumber, bankName, bvn]);

  // ── Guard: render nothing when closed ────────────────────────────────────
  if (!open) return null;

  // ── Add-account submission ────────────────────────────────────────────────
  const handleAddAccount = async () => {
    setAdding(true);
    // TODO: replace with real API call to save the account
    await new Promise((r) => setTimeout(r, 1000));
    setAdding(false);
    setStep("addSuccess");
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-[80]">
      {/* Backdrop — clicking outside closes the modal */}
      <button
        aria-label="Close modal"
        onClick={closeAll}
        className="absolute inset-0 bg-black/30"
      />

      {/* Modal container */}
      <div className="absolute inset-0 grid place-items-center px-4">
        <div className="w-full max-w-[500px] rounded-[28px] bg-white shadow-[0_25px_80px_rgba(2,6,23,0.25)] overflow-hidden">
          {/* ── Step 1: Choose withdrawal account ───────────────────────── */}
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
                  aria-label="Close"
                >
                  <X className="h-4 w-4 text-slate-600" />
                </button>
              </div>

              {/* Saved accounts list */}
              <div className="mt-5 space-y-3">
                {SAVED_ACCOUNTS.map((acc) => {
                  const isSelected = selectedId === acc.id;
                  return (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => setSelectedId(acc.id)}
                      className={[
                        "w-full flex items-center gap-4 px-4 py-4 rounded-[14px] border transition text-left",
                        isSelected
                          ? "border-emerald-400 bg-emerald-50/40"
                          : "border-slate-200 bg-white hover:bg-slate-50",
                      ].join(" ")}
                    >
                      {/* Bank logo */}
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={acc.logoUrl}
                          alt={acc.bankName}
                          className="h-full w-full object-contain p-1"
                        />
                      </div>

                      {/* Account details */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-semibold text-slate-800 truncate">
                          {acc.accountNumber} — {acc.accountName}
                        </p>
                        <p className="text-[12px] text-slate-500 mt-0.5">
                          {acc.bankName}
                        </p>
                      </div>

                      {/* Selected checkmark */}
                      {isSelected && (
                        <div className="h-6 w-6 rounded-full bg-emerald-500 grid place-items-center flex-shrink-0">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Footer actions */}
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
                  onClick={() => setStep("success")}
                  className="h-[44px] px-8 rounded-[12px] bg-emerald-600 text-white text-[14px] font-semibold hover:brightness-110 transition"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* ── Step 2: Add new account ──────────────────────────────────── */}
          {step === "add" && (
            <div className="px-7 py-7">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[20px] font-semibold text-slate-900">
                  Add Account
                </h3>
                <button
                  onClick={closeAll}
                  className="h-8 w-8 rounded-full border border-slate-200 grid place-items-center hover:bg-slate-50 transition"
                  aria-label="Close"
                >
                  <X className="h-4 w-4 text-slate-600" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Account number */}
                <div>
                  <label className="text-[13px] font-medium text-slate-700 mb-1.5 block">
                    Enter account number
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={10}
                    value={accountNumber}
                    onChange={(e) =>
                      setAccountNumber(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="Enter account number"
                    className="w-full h-[48px] rounded-[10px] border border-slate-200 bg-slate-50 px-4 text-[14px] outline-none focus:border-emerald-500 focus:bg-white transition"
                  />
                </div>

                {/* Bank name */}
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

                {/* BVN with live verification feedback */}
                <div>
                  <label className="text-[13px] font-medium text-slate-700 mb-1.5 block">
                    BVN (Bank verification number)
                  </label>
                  <div
                    className={[
                      "relative rounded-[10px] border transition",
                      verifiedName ? "border-emerald-400" : "border-slate-200",
                    ].join(" ")}
                  >
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={11}
                      value={bvn}
                      onChange={(e) =>
                        setBvn(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="Enter BVN"
                      className="w-full h-[48px] bg-slate-50 px-4 text-[14px] outline-none rounded-[10px] focus:bg-white transition"
                    />
                    {/* Spinner shown while verifying */}
                    {verifying && (
                      <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500 animate-spin" />
                    )}
                  </div>
                  {/* Verified account holder name */}
                  {verifiedName && (
                    <p className="mt-1.5 text-[12px] text-emerald-600 font-medium text-right">
                      {verifiedName}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit — disabled until BVN is verified */}
              <button
                type="button"
                onClick={handleAddAccount}
                disabled={adding || !verifiedName}
                className={[
                  "mt-6 h-[52px] w-full rounded-[12px] font-semibold text-[15px]",
                  "transition flex items-center justify-center gap-2",
                  verifiedName && !adding
                    ? "bg-emerald-600 text-white hover:brightness-110 cursor-pointer"
                    : "bg-slate-200 text-slate-500 cursor-not-allowed",
                ].join(" ")}
              >
                {adding && <Loader2 className="h-4 w-4 animate-spin" />}
                {adding ? "Adding..." : "Add Account"}
              </button>
            </div>
          )}

          {/* ── Step 3: Account added successfully ──────────────────────── */}
          {step === "addSuccess" && (
            <SuccessScreen
              title="Thanks"
              message="Your new account was added successfully"
              onOk={() => setStep("choose")}
            />
          )}

          {/* ── Step 4: Withdrawal submitted successfully ────────────────── */}
          {step === "success" && (
            <SuccessScreen
              title="Thanks"
              message={`Successful. Your money will be sent to you after verification of payment`}
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
      {/* Green check circle */}
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
