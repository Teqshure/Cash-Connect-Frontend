"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowUpRight, Plus, Download } from "lucide-react";
import { formatMoney } from "./money";

type Props = {
  totalBalance: number;
  transactionLimit: number;
  currency?: string;
  changePercent?: number;
  onFundWallet?: () => void;
  onWithdraw?: () => void;
};

export default function WalletBalanceCard({
  totalBalance,
  transactionLimit,
  currency = "₦",
  changePercent = 5.2,
  onFundWallet,
  onWithdraw,
}: Props) {
  const [isHidden, setIsHidden] = useState(false);
  const sign = changePercent >= 0 ? "+" : "";

  return (
    <div
      className="w-[372px] h-[228px] rounded-[24px] p-6 text-white"
      style={{
        background: "linear-gradient(135deg, #00BC7D 0%, #009966 100%)",
        boxShadow:
          "0px 8px 10px -6px rgba(0,188,125,0.20), 0px 20px 25px -5px rgba(0,188,125,0.20)",
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-white/85 text-xs font-medium">Total Balance</p>

          <div className="flex items-center gap-3">
            <p className="text-[32px] leading-[36px] font-semibold">
              {isHidden ? "****" : formatMoney(totalBalance, currency)}
            </p>

            <button
              type="button"
              onClick={() => setIsHidden((v) => !v)}
              className="h-8 w-8 rounded-full grid place-items-center hover:bg-white/15 transition"
              aria-label={isHidden ? "Show balance" : "Hide balance"}
            >
              {isHidden ? (
                <EyeOff className="h-4 w-4 text-white/90" />
              ) : (
                <Eye className="h-4 w-4 text-white/90" />
              )}
            </button>
          </div>
        </div>

        {/* +% pill */}
        <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2">
          <ArrowUpRight className="h-4 w-4 text-white/90" />
          <span className="text-xs font-semibold text-white">
            {sign}
            {changePercent.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Transaction limit */}
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white/85">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
            <span className="text-[10px]">i</span>
          </span>
          <span className="text-[11px] font-medium">Transaction Limit</span>
        </div>

        <p className="text-[12px] font-semibold text-white">
          {formatMoney(transactionLimit, currency)}
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onFundWallet}
          className="flex-1 h-12 rounded-[14px] bg-white text-emerald-700 font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition"
        >
          <Plus className="h-4 w-4" />
          Fund Wallet
        </button>

        <button
          type="button"
          onClick={onWithdraw}
          className="flex-1 h-12 rounded-[14px] bg-white/15 text-white font-semibold text-sm flex items-center justify-center gap-2 border border-white/20 hover:bg-white/20 transition"
        >
          <Download className="h-4 w-4" />
          Withdraw
        </button>
      </div>
    </div>
  );
}
