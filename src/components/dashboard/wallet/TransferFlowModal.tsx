"use client";

import { useEffect, useMemo, useState } from "react";
import { useTransactionStore } from "@/store/Transactionstore";
import { useDepositStore } from "@/store/depositStore";
import { Upload, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

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
  transactionId?: number | null;
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
  accountName = "Cash Connect",
  transactionRef,
  transactionId,
}: Props) {
  const [step, setStep] = useState<Step>("warning");
  const [copied, setCopied] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const { fetchTransactions } = useTransactionStore();
  const { uploadReceipt } = useDepositStore();

  const titleAmount = useMemo(
    () => `${currency} ${formatNGN(amount)}`,
    [amount, currency],
  );

  function resetState() {
    setStep("warning");
    setCopied(false);
    setCopiedRef(false);
    setIsUploading(false);
    setReceiptFile(null);
    setFileError(null);
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
  /* Upload receipt and trigger admin notification */
  /* ------------------------------------------ */

  const handlePaid = async () => {
    if (!receiptFile) {
      setFileError("Please upload your payment receipt / proof of payment to proceed.");
      return;
    }

    if (!transactionId) {
      setFileError("Invalid transaction session. Please try again.");
      return;
    }

    try {
      setIsUploading(true);
      setFileError(null);

      // Upload receipt to backend
      await uploadReceipt(transactionId, receiptFile);

      // Refresh transaction list
      await fetchTransactions(true);

      setStep("success");
    } catch (error: any) {
      console.error("Receipt upload failed:", error);
      setFileError(error.message || "Failed to upload receipt. Please try again.");
    } finally {
      setIsUploading(false);
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
                  className="h-[44px] w-[150px] rounded-[12px] border border-emerald-500 bg-white text-emerald-700 font-medium hover:bg-emerald-50 transition cursor-pointer"
                >
                  Back
                </button>

                <button
                  onClick={() => setStep("pay")}
                  className="h-[44px] w-[150px] rounded-[12px] bg-emerald-600 text-white font-medium hover:brightness-110 transition cursor-pointer"
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
                  className="h-10 w-10 rounded-full border border-slate-200 grid place-items-center hover:bg-slate-50 cursor-pointer"
                >
                  ×
                </button>
              </div>

              <div className="text-center">
                <h3 className="text-[28px] font-semibold text-slate-600">
                  Pay {titleAmount}
                </h3>

                <p className="mt-2 text-[14px] text-slate-500">
                  Transfer exactly this amount to this bank account
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
                  className="mt-4 text-sm text-emerald-600 font-medium hover:underline cursor-pointer"
                >
                  {copied ? "Copied!" : "Copy account number"}
                </button>
              </div>

              {transactionRef && (
                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-400 uppercase">
                    Transaction Reference
                  </p>

                  <p className="font-semibold text-slate-700">{transactionRef}</p>

                  <button
                    onClick={copyRef}
                    className="text-sm text-emerald-600 font-medium hover:underline cursor-pointer"
                  >
                    {copiedRef ? "Copied!" : "Copy reference"}
                  </button>
                </div>
              )}

              {/* Upload Proof of Payment Section */}
              <div className="mt-6 rounded-[14px] bg-slate-50 border border-slate-200 p-4">
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Proof of Payment / Transfer Receipt:
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    id="transfer-receipt-file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setReceiptFile(e.target.files[0]);
                        setFileError(null);
                      }
                    }}
                  />
                  <label
                    htmlFor="transfer-receipt-file"
                    className="flex-1 h-12 border border-dashed border-slate-300 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-slate-600 bg-white hover:bg-slate-100 transition cursor-pointer px-4"
                  >
                    <Upload className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="truncate">
                      {receiptFile ? receiptFile.name : "Select Receipt Image / PDF (Max 10MB)"}
                    </span>
                  </label>
                </div>
                {fileError && (
                  <p className="text-xs text-rose-600 font-medium mt-2 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{fileError}</span>
                  </p>
                )}
              </div>

              <button
                onClick={handlePaid}
                disabled={isUploading}
                className="mt-6 h-[56px] w-full rounded-[14px] bg-emerald-600 text-white font-semibold hover:brightness-110 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Uploading Receipt & Notifying Admin...</span>
                  </>
                ) : (
                  "I Have Paid & Uploaded Receipt"
                )}
              </button>
            </div>
          )}

          {/* STEP 3: SUCCESS */}

          {step === "success" && (
            <div className="px-8 py-12 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </div>

              <h3 className="text-[24px] font-bold text-slate-800">
                Payment Proof Submitted!
              </h3>

              <p className="mt-3 text-[14px] leading-6 text-slate-600 max-w-[420px] mx-auto">
                Your transfer receipt has been uploaded successfully. Admin has been notified for verification, and your wallet will be credited once verified.
              </p>

              <button
                onClick={closeAll}
                className="mt-8 h-[44px] px-8 rounded-[12px] bg-emerald-600 text-white font-semibold hover:brightness-110 cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
