"use client";

import { useMemo, useState, useEffect } from "react";
import { Eye, EyeOff, ArrowUpRight, Plus, Download } from "lucide-react";
import { formatMoney } from "./money";

type Props = {
  totalBalance: number;
  transactionLimit: number;
  currency?: string;
  changePercent?: number;
  onFundWallet?: () => void;
  onWithdraw?: () => void;
  activeAction?: "fund" | "withdraw" | "none";
};

export default function WalletBalanceCard({
  totalBalance,
  transactionLimit,
  currency = "₦",
  changePercent = 5.2,
  onFundWallet,
  onWithdraw,
  activeAction = "none",
}: Props) {
  const [hide, setHide] = useState(false);

  // ✅ LOAD FROM STORAGE
  useEffect(() => {
    const saved = localStorage.getItem("hideBalance");
    if (saved !== null) {
      setHide(saved === "true");
    }
  }, []);

  // ✅ BALANCE TEXT
  const balanceText = useMemo(() => {
    if (hide) return `${currency}****`;
    return formatMoney(totalBalance, currency);
  }, [hide, totalBalance, currency]);

  const fundActive = activeAction === "fund";
  const withdrawActive = activeAction === "withdraw";

  return (
    <div
      className="
        w-full
        h-full
        rounded-[24px]
        px-5 py-5
        text-white
        flex flex-col justify-between
      "
      style={{
        background: "linear-gradient(135deg, #00B86B 0%, #00A86B 100%)",
        boxShadow:
          "0px 10px 20px rgba(0,184,107,0.25), 0px 6px 10px rgba(0,0,0,0.06)",
      }}
    >
      {/* TOP */}
      <div className="flex justify-between items-start">
        <p className="text-[13px] text-white/90">Total Balance</p>

        <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full">
          <ArrowUpRight className="h-3 w-3" />
          <span className="text-[12px] font-semibold">+{changePercent}%</span>
        </div>
      </div>

      {/* BALANCE */}
      <div className="flex items-center gap-3 mt-2">
        <p className="text-[26px] font-semibold tracking-tight min-w-[120px]">
          {balanceText}
        </p>

        <button
          onClick={() => {
            setHide((prev) => {
              localStorage.setItem("hideBalance", String(!prev)); // ✅ SAVE
              return !prev;
            });
          }}
          className="
            h-8 w-8
            rounded-full
            bg-white/10
            flex items-center justify-center
            hover:bg-white/20
          "
        >
          {hide ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      {/* TRANSACTION LIMIT */}
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-[12px]">
            i
          </span>
          <p className="text-[13px] text-white/90">Transaction Limit</p>
        </div>

        <p className="text-[13px] font-semibold">
          {formatMoney(transactionLimit, currency)}
        </p>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={onFundWallet}
          className={`
            flex-1 h-[40px]
            rounded-[14px]
            cursor-pointer
            text-[13px] font-semibold
            flex items-center justify-center gap-2
            ${
              fundActive
                ? "bg-white text-emerald-700"
                : "bg-white text-emerald-700 hover:bg-white/90"
            }
          `}
        >
          <Plus className="h-4 w-4" />
          Fund Wallet
        </button>

        <button
          onClick={onWithdraw}
          className={`
            flex-1 h-[40px]
            rounded-[14px]
            cursor-pointer 
            text-[13px] font-semibold
            flex items-center justify-center gap-2
            border border-white/20
            ${withdrawActive ? "bg-white/20" : "bg-white/10 hover:bg-white/20"}
          `}
        >
          <Download className="h-4 w-4" />
          Withdraw
        </button>
      </div>
    </div>
  );
}
