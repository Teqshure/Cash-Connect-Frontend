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
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full pb-10">
        {/* Greeting with name - matching desktop style */}
        <div className="px-4 pt-4">
          <div className="min-w-0 flex items-center">
            <p className="text-[20px] leading-[28px] font-medium text-slate-900 whitespace-nowrap">
              Good Morning, {name}! <span className="ml-1">👋</span>
            </p>
          </div>
        </div>

        {/* Wallet Balance Card */}
        <div className="px-4 mt-3">
          <WalletBalanceCard
            totalBalance={300000}
            transactionLimit={100000}
            changePercent={15.0}
          />
        </div>

        {/* Shortcuts Section */}
        <div className="px-4 mt-6">
          <h2 className="text-[16px] font-semibold text-slate-800 mb-3">
            Shortcuts
          </h2>
          <div className="grid grid-cols-4 gap-3">
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
        <MobileTradeBanner />

        {/* Recent Transactions */}
        <MobileRecentTransactions />

        {/* Earning Opportunities */}
        <MobileEarningOpportunities />
      </div>
    </div>
  );
}
