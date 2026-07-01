"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import WalletBalanceCard from "@/components/dashboard/overview/WalletBalanceCard";
import QuickActionTile from "@/components/dashboard/overview/QuickActionTile";
import { ArrowDownLeft, Gift, Bitcoin, MoreHorizontal } from "lucide-react";
import MobileTradeBanner from "./MobileTradeBanner";
import MobileRecentTransactions from "./MobileRecentTransactions";
import MobileEarningOpportunities from "./MobileEarningOpportunities";
import { useAuthStore, User } from "@/store/useAuthStore";

function getFirstName(fullname?: string | null) {
  if (!fullname) return "User";
  return fullname.trim().split(" ")[0] || "User";
}

function getGreeting(): string {
  try {
    const lagosTimeStr = new Date().toLocaleString("en-US", {
      timeZone: "Africa/Lagos",
      hour: "numeric",
      hour12: false,
    });
    const hour = parseInt(lagosTimeStr, 10);
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    return "Good Evening";
  } catch (e) {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    return "Good Evening";
  }
}

export default function MobileDashboard() {
  const router = useRouter();
  const user = useAuthStore((s: { user: User | null }) => s.user);
  const refreshUser = useAuthStore(
    (s: { refreshUser: () => Promise<void> }) => s.refreshUser,
  );
  const name = getFirstName(user?.fullname);

  const balance = parseFloat(user?.wallet?.balance ?? "0");
  const transactionLimit = parseFloat(user?.wallet?.transaction_limit ?? "0");

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <div className="px-4 pb-6">
      {/* Greeting */}
      <div className="pt-2">
        <p
          style={{
            fontFamily: "Quicksand, sans-serif",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "140%",
            letterSpacing: "0%",
            color: "#030319",
          }}
        >
          {getGreeting()}, {name}! 👋
        </p>
      </div>

      {/* Wallet Balance Card */}
      <div className="mt-3">
        <WalletBalanceCard
          totalBalance={balance}
          transactionLimit={transactionLimit}
          changePercent={15.0}
          onFundWallet={() => router.push("/wallet?tab=fund")}
          onWithdraw={() => router.push("/wallet?tab=withdraw")}
        />
      </div>

      {/* Shortcuts Section */}
      <div className="mt-5">
        <h2 className="text-[16px] font-semibold text-slate-800 mb-3">
          Shortcuts
        </h2>
        <div className="grid grid-cols-4 gap-2">
          <QuickActionTile
            label="Receive Payout"
            Icon={ArrowDownLeft}
            iconBgClass="bg-[#E3F7EC]"
            iconColorClass="text-[#0B7B4A]"
            onClick={() => router.push("/receive-payment")}
          />
          <QuickActionTile
            label="Sell Giftcard"
            Icon={Gift}
            iconBgClass="bg-[#FFE8CC]"
            iconColorClass="text-[#EA580C]"
            onClick={() => router.push("/buy-giftcard")}
          />
          <QuickActionTile
            label="Sell Crypto"
            Icon={Bitcoin}
            iconBgClass="bg-[#FFF3CC]"
            iconColorClass="text-[#B45309]"
            onClick={() => router.push("/sell-crypto")}
          />
          <QuickActionTile
            label="More"
            Icon={MoreHorizontal}
            iconBgClass="bg-[#EEF2F7]"
            iconColorClass="text-[#334155]"
            onClick={() => router.push("/more")}
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
