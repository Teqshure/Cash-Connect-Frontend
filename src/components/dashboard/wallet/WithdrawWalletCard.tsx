"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/components/dashboard/overview/money";
import WithdrawFlowModal from "./Withdrawflowmodal";

type Props = {
  currency?: string;
};

const presets = [5000, 25000, 50000, 100000, 200000, 500000];

export default function WithdrawWalletCard({ currency = "₦" }: Props) {
  const [amount, setAmount] = useState<number | "">("");
  const [openFlow, setOpenFlow] = useState(false);

  const display = useMemo(() => {
    if (amount === "") return "";
    return String(amount);
  }, [amount]);

  const minAmount = 100;
  const maxAmount = 500000;

  const numericAmount = amount === "" ? 0 : Number(amount);

  const isValid =
    amount !== "" && numericAmount >= minAmount && numericAmount <= maxAmount;

  return (
    <div className="w-full max-w-[494px]">
      <h3 className="text-[24px] font-semibold text-slate-900">
        Withdraw from Wallet
      </h3>

      <p className="mt-1 text-[14px] text-slate-500">
        Enter amount you want to withdraw
      </p>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {presets.map((v, idx) => {
          const active = amount === v;
          return (
            <button
              key={`${v}-${idx}`}
              type="button"
              onClick={() => setAmount(v)}
              className={[
                "h-[44px] rounded-[10px] border text-[14px] font-medium transition cursor-pointer",
                "flex items-center justify-center",
                active
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
              ].join(" ")}
            >
              {formatMoney(v, currency)}
            </button>
          );
        })}
      </div>

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
          className="
            w-full h-[48px] rounded-[12px]
            border border-slate-200 bg-white
            px-4 text-[14px] outline-none
            focus:border-emerald-500
          "
        />
      </div>

      <div className="mt-4 rounded-[10px] bg-emerald-50 px-4 py-3">
        <p className="text-[13px] font-medium text-emerald-900">
          Transaction charges will be applied
        </p>
        <p className="mt-1 text-[12px] text-emerald-800">
          Minimum Amount: {formatMoney(minAmount, currency)} | Maximum Amount:{" "}
          {formatMoney(maxAmount, currency)}
        </p>
      </div>

      <button
        type="button"
        disabled={!isValid}
        onClick={() => setOpenFlow(true)}
        className={[
          "mt-4 h-[48px] w-full rounded-[12px] font-semibold text-[14px] transition",
          isValid
            ? "bg-emerald-600 text-white hover:brightness-110 cursor-pointer"
            : "bg-slate-200 text-slate-500 cursor-not-allowed",
        ].join(" ")}
      >
        Continue
      </button>

      <WithdrawFlowModal
        open={openFlow}
        onClose={() => setOpenFlow(false)}
        amount={numericAmount}
        currency="NGN"
      />
    </div>
  );
}
