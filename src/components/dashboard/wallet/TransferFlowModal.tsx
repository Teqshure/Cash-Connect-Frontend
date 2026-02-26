"use client";

import { useEffect, useMemo, useState } from "react";

type Step = "warning" | "pay" | "success";

type Props = {
  open: boolean;
  onClose: () => void;

  amount: number;
  currency?: string;

  bankName?: string;
  accountNumber?: string;
  accountName?: string;
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
}: Props) {
  const [step, setStep] = useState<Step>("warning");
  const [copied, setCopied] = useState(false);

  const titleAmount = useMemo(
    () => `${currency} ${formatNGN(amount)}`,
    [amount, currency],
  );

  // Keyboard listener only — no setState calls inside the effect body.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setStep("warning");
        setCopied(false);
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  // Resets both local state pieces and delegates close to the parent.
  // State is always clean the next time `open` flips to true because
  // closeAll() runs before the parent sets open=false.
  const closeAll = () => {
    setStep("warning");
    setCopied(false);
    onClose();
  };

  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-[80]">
      {/* overlay */}
      <button
        aria-label="Close overlay"
        onClick={closeAll}
        className="absolute inset-0 bg-black/30"
      />

      {/* modal */}
      <div className="absolute inset-0 grid place-items-center px-4">
        <div className="w-full max-w-[620px] rounded-[36px] bg-white shadow-[0_25px_80px_rgba(2,6,23,0.25)] overflow-hidden">
          {/* STEP 1: WARNING */}
          {step === "warning" && (
            <div className="px-8 py-10 text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-rose-50 grid place-items-center">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-rose-500"
                >
                  <path
                    d="M12 2.5L22 20.5H2L12 2.5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 9V13"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 16.5H12.01"
                    stroke="currentColor"
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
                  type="button"
                  onClick={closeAll}
                  className="
                    h-[44px] w-[150px]
                    rounded-[12px]
                    border border-emerald-500
                    bg-white
                    text-emerald-700
                    font-medium
                    cursor-pointer
                    hover:bg-emerald-50
                    transition
                  "
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => setStep("pay")}
                  className="
                    h-[44px] w-[150px]
                    rounded-[12px]
                    bg-emerald-600
                    text-white
                    font-medium
                    cursor-pointer
                    hover:brightness-110
                    transition
                  "
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
                  type="button"
                  onClick={closeAll}
                  aria-label="Close"
                  className="
                    h-10 w-10
                    rounded-full
                    border border-slate-200
                    grid place-items-center
                    cursor-pointer
                    hover:bg-slate-50
                    transition
                  "
                >
                  <span className="text-[18px] leading-none text-slate-700">
                    ×
                  </span>
                </button>
              </div>

              <div className="text-center">
                <h3 className="text-[28px] font-semibold text-slate-600">
                  Pay&nbsp; {titleAmount}
                </h3>
                <p className="mt-2 text-[14px] text-slate-500">
                  Transfer exactly this amount to this account
                </p>
              </div>

              {/* bank card */}
              <div className="mt-6 rounded-[14px] border border-slate-200 bg-white px-6 py-6 text-center">
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

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={copyAccount}
                    className="
                      h-9 w-9
                      rounded-[10px]
                      border border-slate-200
                      grid place-items-center
                      cursor-pointer
                      hover:bg-slate-50
                      transition
                    "
                    aria-label="Copy account number"
                    title="Copy"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M8 8V6.8C8 5.80589 8.80589 5 9.8 5H17.2C18.1941 5 19 5.80589 19 6.8V14.2C19 15.1941 18.1941 16 17.2 16H16"
                        stroke="#64748b"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <path
                        d="M7.8 9H14.2C15.1941 9 16 9.80589 16 10.8V17.2C16 18.1941 15.1941 19 14.2 19H7.8C6.80589 19 6 18.1941 6 17.2V10.8C6 9.80589 6.80589 9 7.8 9Z"
                        stroke="#64748b"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                {copied && (
                  <p className="mt-2 text-[12px] text-emerald-600 text-right">
                    Copied!
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setStep("success")}
                className="
                  mt-7
                  h-[56px] w-full
                  rounded-[14px]
                  bg-emerald-600
                  text-white
                  font-semibold
                  cursor-pointer
                  hover:brightness-110
                  transition
                "
              >
                I have Paid
              </button>
            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === "success" && (
            <div className="px-8 py-12 text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-emerald-50 grid place-items-center">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
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

              <h3 className="mt-5 text-[24px] font-semibold text-emerald-700">
                Thanks
              </h3>

              <p className="mt-2 text-[13px] leading-6 text-slate-500">
                Successful. Your money will be sent to you <br />
                after verification of payment
              </p>

              <button
                type="button"
                onClick={closeAll}
                className="
                  mt-7
                  h-[40px] w-[92px]
                  rounded-[12px]
                  bg-emerald-600
                  text-white
                  font-semibold
                  cursor-pointer
                  hover:brightness-110
                  transition
                "
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
