"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/components/dashboard/overview/money";
import TransferFlowModal from "@/components/dashboard/wallet/TransferFlowModal";
import { useDepositStore } from "@/store/depositStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

type Props = { currency?: string };

const presets = [5000, 25000, 50000, 100000, 200000, 500000];

export default function FundWalletCard({ currency = "₦" }: Props) {
  const [amount, setAmount] = useState<number | "">("");
  const [openFlow, setOpenFlow] = useState(false);

  const {
    createDeposit,
    depositAccount,
    transactionRef,
    isLoading,
    error,
    reset,
  } = useDepositStore();

  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const minAmount = 100;
  const maxAmount = 500000;
  const numericAmount = amount === "" ? 0 : Number(amount);
  const isValid =
    amount !== "" && numericAmount >= minAmount && numericAmount <= maxAmount;
  const display = useMemo(
    () => (amount === "" ? "" : String(amount)),
    [amount],
  );

  async function handleContinue() {
    if (!isValid) return;
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    try {
      await createDeposit(numericAmount);
      setOpenFlow(true);
    } catch {
      // error is already set in the store
    }
  }

  function handleClose() {
    setOpenFlow(false);
    reset();
  }

  return (
    <div className="w-full max-w-[494px]">
      <h3 className="text-[24px] font-semibold text-slate-900">Fund Wallet</h3>
      <p className="mt-1 text-[14px] text-slate-500">
        Enter amount you want to fund
      </p>

      {/* Preset amounts */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {presets.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setAmount(v)}
            className={[
              "h-[44px] rounded-[10px] border text-[14px] font-medium transition cursor-pointer flex items-center justify-center",
              amount === v
                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
            ].join(" ")}
          >
            {formatMoney(v, currency)}
          </button>
        ))}
      </div>

      {/* Custom amount input */}
      <div className="mt-4">
        <input
          inputMode="numeric"
          value={display}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^\d]/g, "");
            if (!raw) return setAmount("");
            setAmount(Number(raw));
          }}
          placeholder="Enter other amount"
          className="w-full h-[48px] rounded-[12px] border border-slate-200 bg-white px-4 text-[14px] outline-none focus:border-emerald-500"
        />
      </div>

      {/* Info box */}
      <div className="mt-4 rounded-[10px] bg-emerald-50 px-4 py-3">
        <p className="text-[13px] font-medium text-emerald-900">
          Transaction charges will be applied
        </p>
        <p className="mt-1 text-[12px] text-emerald-800">
          Minimum Amount: {formatMoney(minAmount, currency)} | Maximum Amount:{" "}
          {formatMoney(maxAmount, currency)}
        </p>
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-3 text-[13px] text-red-500 text-center">{error}</p>
      )}

      {/* Continue button */}
      <button
        type="button"
        disabled={!isValid || isLoading}
        onClick={handleContinue}
        className={[
          "mt-4 h-[48px] w-full rounded-[12px] font-semibold text-[14px] transition flex items-center justify-center gap-2",
          isValid && !isLoading
            ? "bg-emerald-600 text-white hover:brightness-110 cursor-pointer"
            : "bg-slate-200 text-slate-500 cursor-not-allowed",
        ].join(" ")}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            Processing...
          </>
        ) : (
          "Continue"
        )}
      </button>

      {/* Modal — only renders when we have real API data */}
      {depositAccount && (
        <TransferFlowModal
          open={openFlow}
          onClose={handleClose}
          amount={numericAmount}
          currency="NGN"
          bankName={depositAccount.bank_name}
          accountNumber={depositAccount.account_number}
          accountName={depositAccount.account_name}
          transactionRef={transactionRef}
        />
      )}
    </div>
  );
}
