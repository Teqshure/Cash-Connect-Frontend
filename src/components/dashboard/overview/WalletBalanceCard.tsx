"use client";

import { useMemo, useState } from "react";
import { Eye, EyeOff, ArrowUpRight, Plus, Download } from "lucide-react";
import { formatMoney } from "./money";

type Props = {
  totalBalance: number;
  transactionLimit: number;
  currency?: string;
  changePercent?: number;
};

export default function WalletBalanceCard({
  totalBalance,
  transactionLimit,
  currency = "₦",
  changePercent = 5.2,
}: Props) {
  const [hide, setHide] = useState(false);

  const balanceText = useMemo(() => {
    if (hide) return `${currency}****`;
    return formatMoney(totalBalance, currency);
  }, [hide, totalBalance, currency]);

  return (
    <div
      className="
        w-full
        h-[228px]
        rounded-[24px]
        px-6 py-5
        text-white
        relative
        overflow-hidden
      "
      style={{
        background: "linear-gradient(135deg, #00BC7D 0%, #009966 100%)",
        boxShadow:
          "0px 10px 22px rgba(0, 153, 102, 0.25), 0px 6px 12px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px] leading-[18px] font-medium text-white/90">
            Total Balance
          </p>

          <div className="mt-4 flex items-center gap-3">
            {/* Reduced amount to match Figma */}
            <p className="text-[28px] leading-[30px] font-semibold tracking-tight">
              {balanceText}
            </p>

            {/* Smaller eye bubble */}
            <button
              type="button"
              onClick={() => setHide((v) => !v)}
              className="
                h-8 w-8
                rounded-full
                bg-emerald-300/20
                grid place-items-center
                hover:bg-emerald-300/30
                transition
                cursor-pointer
              "
              aria-label={hide ? "Show balance" : "Hide balance"}
            >
              {hide ? (
                <EyeOff className="h-4 w-4 text-white" />
              ) : (
                <Eye className="h-4 w-4 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Percent badge */}
        <div className="rounded-full bg-emerald-300/20 px-3 py-1.5 flex items-center gap-1.5">
          <ArrowUpRight className="h-4 w-4 text-white" />
          <span className="text-[13px] font-semibold text-white">
            +{changePercent}%
          </span>
        </div>
      </div>

      {/* Transaction Limit row (pulled up) */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-7 w-7 rounded-full bg-emerald-300/20 grid place-items-center text-[12px] font-semibold">
            i
          </span>
          <p className="text-[14px] font-medium text-white/90">
            Transaction Limit
          </p>
        </div>

        <p className="text-[14px] font-semibold text-white">
          {formatMoney(transactionLimit, currency)}
        </p>
      </div>

      {/* Buttons (tighter + shorter) */}
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          className="
            flex-1
            h-[44px]
            rounded-[16px]
            bg-white
            text-emerald-700
            font-semibold text-[14px]
            flex items-center justify-center gap-2
            transition
            cursor-pointer
          "
        >
          <Plus className="h-5 w-5" />
          Fund Wallet
        </button>

        <button
          type="button"
          className="
            flex-1
            h-[44px]
            rounded-[16px]
            bg-emerald-300/15
            text-white
            font-semibold text-[14px]
            flex items-center justify-center gap-2
            border border-white/15
            hover:bg-emerald-300/22
            transition
            cursor-pointer
          "
        >
          <Download className="h-5 w-5" />
          Withdraw
        </button>
      </div>
    </div>
  );
}
