"use client";

import WalletBalanceCard from "@/components/dashboard/overview/WalletBalanceCard";
import QuickActionTile from "@/components/dashboard/overview/QuickActionTile";
import { ArrowUpRight, Gift, Bitcoin, MoreHorizontal } from "lucide-react";
import MobileTradeBanner from "./MobileTradeBanner";
import MobileRecentTransactions from "./MobileRecentTransactions";
import MobileEarningOpportunities from "./MobileEarningOpportunities";
import { useAuthStore } from "@/store/useAuthStore";

function getFirstName(fullname?: string | null) {
  if (!fullname) return "User";
  return fullname.trim().split(" ")[0] || "User";
}

export default function MobileDashboard() {
  const user = useAuthStore((s) => s.user);
  const name = getFirstName(user?.fullname);

  return (
    <div className="px-4 pb-6">
      {/* Greeting */}
      <div className="pt-2">
        <p className="text-[14px] text-slate-500">
          Good Morning,{" "}
          <span className="font-semibold text-slate-800">{name}</span>! 👋
        </p>
      </div>

      {/* Wallet Balance Card */}
      <div className="mt-3">
        <WalletBalanceCard
          totalBalance={300000}
          transactionLimit={100000}
          changePercent={15.0}
        />
      </div>

      {/* Shortcuts Section */}
      <div className="mt-5">
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

      {/* Trade Crypto Banner */}
      <div className="mt-5">
        <MobileTradeBanner />
      </div>

      {/* Recent Transactions */}
      <div className="mt-5">
        <MobileRecentTransactions />
      </div>

      {/* Earning Opportunities */}
      <div className="mt-5">
        <MobileEarningOpportunities />
      </div>
    </div>
  );
}
