"use client";

import WalletBalanceCard from "@/components/dashboard/overview/WalletBalanceCard";
import FundWalletCard from "@/components/dashboard/wallet/FundWalletCard";
import WithdrawWalletCard from "@/components/dashboard/wallet/WithdrawWalletCard";
import { useAuthStore } from "@/store/useAuthStore";

type Mode = "fund" | "withdraw";

type Props = {
  mode: Mode;
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

export default function MobileWalletFundWithdraw({
  mode,
  totalBalance,
  transactionLimit,
  currency = "₦",
  changePercent = 5.2,
  onFundWallet,
  onWithdraw,
}: Props) {
  const user = useAuthStore((s: any) => s.user);
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
        {getGreeting()}, {name}! 👋
      </p>

      {/* Balance Card */}
      <WalletBalanceCard
        totalBalance={totalBalance}
        transactionLimit={transactionLimit}
        currency={currency}
        changePercent={changePercent}
        onFundWallet={onFundWallet}
        onWithdraw={onWithdraw}
        activeAction={mode}
      />

      {/* Fund / Withdraw form in bordered card */}
      <div className="mt-4 rounded-[16px] border-2 border-emerald-400 bg-white p-4">
        {mode === "fund" ? (
          <FundWalletCard currency={currency} />
        ) : (
          <WithdrawWalletCard currency={currency} />
        )}
      </div>
    </div>
  );
}
