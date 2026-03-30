"use client";

import { useEffect, useMemo, useState } from "react";
import { useTransactionStore } from "@/store/Transactionstore";

type Step = "warning" | "pay" | "success";

type Props = {
  open: boolean;
  onClose: () => void;

  amount: number;
  currency?: string;

  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  transactionRef?: string;
};

function formatNGN(amount: number) {
  return amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function TransferFlowModal({
  open,
  onClose,
  amount,
  currency = "NGN",
  bankName = "Access Bank",
  accountNumber = "2141536385",
  accountName = "Emmanuel Nwaezeoma",
  transactionRef,
}: Props) {
  const [step, setStep] = useState<Step>("warning");
  const [copied, setCopied] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { fetchTransactions } = useTransactionStore();

  const titleAmount = useMemo(
    () => `${currency} ${formatNGN(amount)}`,
    [amount, currency],
  );

  function resetState() {
    setStep("warning");
    setCopied(false);
    setCopiedRef(false);
    setIsRefreshing(false);
  }

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        resetState();
        onClose();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const closeAll = () => {
    resetState();
    onClose();
  };

  /* ------------------------------------------ */
  /* Refresh transactions then show success */
  /* ------------------------------------------ */

  const handlePaid = async () => {
    try {
      setIsRefreshing(true);

      // force refresh transactions
      await fetchTransactions(true);

      setStep("success");
    } catch (error) {
      console.error("Transaction refresh failed:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  const copyRef = async () => {
    try {
      await navigator.clipboard.writeText(transactionRef ?? "");
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 1200);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        aria-label="Close overlay"
        onClick={closeAll}
        className="absolute inset-0 bg-black/30"
      />

      <div className="absolute inset-0 grid place-items-center px-4">
        <div className="w-full max-w-[620px] rounded-[36px] bg-white shadow-[0_25px_80px_rgba(2,6,23,0.25)] overflow-hidden">
          {/* STEP 1: WARNING */}

          {step === "warning" && (
            <div className="px-8 py-10 text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-rose-50 grid place-items-center">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2.5L22 20.5H2L12 2.5Z"
                    stroke="#f43f5e"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 9V13"
                    stroke="#f43f5e"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 16.5H12.01"
                    stroke="#f43f5e"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h3 className="mt-6 text-[22px] font-semibold text-slate-900">
                Transfer Warning!
              </h3>

              <p className="mt-3 text-[14px] leading-6 text-slate-600">
                Transfer Only the exact amount <br />
                Do not transfer an incorrect amount
              </p>

              <div className="mt-7 flex items-center justify-center gap-4">
                <button
                  onClick={closeAll}
                  className="h-[44px] w-[150px] rounded-[12px] border border-emerald-500 bg-white text-emerald-700 font-medium hover:bg-emerald-50 transition"
                >
                  Back
                </button>

                <button
                  onClick={() => setStep("pay")}
                  className="h-[44px] w-[150px] rounded-[12px] bg-emerald-600 text-white font-medium hover:brightness-110 transition"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PAY */}

          {step === "pay" && (
            <div className="px-8 py-9">
              <div className="flex justify-end">
                <button
                  onClick={closeAll}
                  className="h-10 w-10 rounded-full border border-slate-200 grid place-items-center hover:bg-slate-50"
                >
                  ×
                </button>
              </div>

              <div className="text-center">
                <h3 className="text-[28px] font-semibold text-slate-600">
                  Pay {titleAmount}
                </h3>

                <p className="mt-2 text-[14px] text-slate-500">
                  Transfer exactly this amount to this account
                </p>
              </div>

              <div className="mt-6 rounded-[14px] border border-slate-200 px-6 py-6 text-center">
                <p className="text-[20px] font-medium text-slate-700">
                  {bankName}
                </p>

                <p className="mt-3 text-[36px] font-semibold tracking-wide text-slate-700">
                  {accountNumber}
                </p>

                <p className="mt-2 text-[14px] text-slate-600">
                  Account Name:{" "}
                  <span className="font-medium">{accountName}</span>
                </p>

                <button
                  onClick={copyAccount}
                  className="mt-4 text-sm text-emerald-600"
                >
                  {copied ? "Copied!" : "Copy account number"}
                </button>
              </div>

              {transactionRef && (
                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-400 uppercase">
                    Transaction Reference
                  </p>

                  <p className="font-semibold">{transactionRef}</p>

                  <button
                    onClick={copyRef}
                    className="text-sm text-emerald-600"
                  >
                    {copiedRef ? "Copied!" : "Copy reference"}
                  </button>
                </div>
              )}

              <button
                onClick={handlePaid}
                disabled={isRefreshing}
                className="mt-7 h-[56px] w-full rounded-[14px] bg-emerald-600 text-white font-semibold hover:brightness-110 disabled:opacity-50"
              >
                {isRefreshing ? "Checking Payment..." : "I have Paid"}
              </button>
            </div>
          )}

          {/* STEP 3: SUCCESS */}

          {step === "success" && (
            <div className="px-8 py-12 text-center">
              <h3 className="text-[24px] font-semibold text-emerald-700">
                Thanks
              </h3>

              <p className="mt-2 text-[13px] text-slate-500">
                Successful. Your money will be sent after verification of
                payment
              </p>

              <button
                onClick={closeAll}
                className="mt-7 h-[40px] w-[92px] rounded-[12px] bg-emerald-600 text-white font-semibold hover:brightness-110"
              >
                Ok
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
