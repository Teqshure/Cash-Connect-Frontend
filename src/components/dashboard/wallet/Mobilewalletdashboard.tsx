"use client";

import WalletBalanceCard from "@/components/dashboard/overview/WalletBalanceCard";
import FundWalletCard from "@/components/dashboard/wallet/FundWalletCard";
import QuickActionTile from "@/components/dashboard/overview/QuickActionTile";
import {
  ArrowUpRight,
  Gift,
  Bitcoin,
  MoreHorizontal,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

type Props = {
  totalBalance: number;
  transactionLimit: number;
  currency?: string;
  changePercent?: number;
  onFundWallet: () => void;
  onWithdraw: () => void;
};

function getFirstName(fullname?: string | null) {
  if (!fullname) return "User";
  return fullname.trim().split(" ")[0] || "User";
}

// Sample transactions for the default view
const sampleTxs = [
  { id: "1", label: "Crypto", txId: "#12548796", type: "Swap", credit: true },
  { id: "2", label: "Crypto", txId: "#12548796", type: "Swap", credit: false },
  { id: "3", label: "Crypto", txId: "#12548796", type: "Swap", credit: true },
];

export default function MobileWalletDashboard({
  totalBalance,
  transactionLimit,
  currency = "₦",
  changePercent = 5.2,
  onFundWallet,
  onWithdraw,
}: Props) {
  const user = useAuthStore((s) => s.user);
  const name = getFirstName(user?.fullname);

  return (
    <div className="px-4 pb-8">
      {/* Greeting */}
      <p
        className="mt-6 mb-4"
        style={{
          fontFamily: "Quicksand, sans-serif",
          fontWeight: 400,
          fontSize: "18px",
          lineHeight: "140%",
          color: "#030319",
        }}
      >
        Good Morning, {name}! 👋
      </p>

      {/* Balance Card */}
      <WalletBalanceCard
        totalBalance={totalBalance}
        transactionLimit={transactionLimit}
        currency={currency}
        changePercent={changePercent}
        onFundWallet={onFundWallet}
        onWithdraw={onWithdraw}
        // No activeAction — both buttons visible in default view
      />

      {/* Fund Wallet form — always visible in default view */}
      <div className="mt-4 bg-white rounded-[16px] border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] p-4">
        <FundWalletCard currency={currency} />
      </div>

      {/* Transaction History */}
      <div className="mt-6">
        {/* Tab headers */}
        <div className="flex items-center border-b border-slate-200 gap-6 mb-1">
          <button className="pb-2 text-[13px] font-semibold text-emerald-600 border-b-2 border-emerald-600">
            Description
          </button>
          <button className="pb-2 text-[13px] font-semibold text-emerald-600">
            Transaction ID
          </button>
          <button className="pb-2 text-[13px] font-semibold text-emerald-600">
            Type
          </button>
        </div>

        {/* Transaction rows */}
        <div className="bg-white rounded-[16px] border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden">
          {sampleTxs.map((tx) => (
            <div
              key={tx.id}
              className="grid grid-cols-[1fr_1fr_60px] px-4 py-3 border-b border-slate-50 items-center last:border-0"
            >
              <div className="flex items-center gap-2">
                {tx.credit ? (
                  <ArrowUpCircle className="h-7 w-7 text-emerald-500 flex-shrink-0" />
                ) : (
                  <ArrowDownCircle className="h-7 w-7 text-rose-400 flex-shrink-0" />
                )}
                <span className="text-[13px] font-medium text-slate-700">
                  {tx.label}
                </span>
              </div>
              <p className="text-[12px] text-slate-500">{tx.txId}</p>
              <p className="text-[12px] text-slate-600 font-medium">
                {tx.type}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Shortcuts */}
      <div className="mt-6">
        <h2 className="text-[16px] font-semibold text-slate-800 mb-3">
          Shortcuts
        </h2>
        <div className="grid grid-cols-4 gap-2">
          <QuickActionTile
            label="Send Payment"
            Icon={ArrowUpRight}
            iconBgClass="bg-[#DCEBFF]"
            iconColorClass="text-[#1D4ED8]"
          />
          <QuickActionTile
            label="Sell Giftcard"
            Icon={Gift}
            iconBgClass="bg-[#FFE8CC]"
            iconColorClass="text-[#EA580C]"
          />
          <QuickActionTile
            label="Sell Crypto"
            Icon={Bitcoin}
            iconBgClass="bg-[#FFF3CC]"
            iconColorClass="text-[#B45309]"
          />
          <QuickActionTile
            label="More"
            Icon={MoreHorizontal}
            iconBgClass="bg-[#EEF2F7]"
            iconColorClass="text-[#334155]"
          />
        </div>
      </div>
    </div>
  );
}
