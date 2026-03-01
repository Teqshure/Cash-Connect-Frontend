"use client";

import { useRouter } from "next/navigation";
import WalletBalanceCard from "./WalletBalanceCard";
import ExchangePromoCard from "./ExchangePromoCard";
import QuickActionsSection from "./QuickActionsSection";
import RecentTransactionsSection from "./RecentTransactionsSection";
import { useAuthStore } from "@/store/useAuthStore";

type Props = {
  totalBalance: number;
  transactionLimit: number;
  currency?: string;
  changePercent?: number;
};

function getFirstName(fullname?: string | null) {
  if (!fullname) return "User";
  return fullname.trim().split(" ")[0] || "User";
}

export default function DashboardOverviewSection({
  totalBalance,
  transactionLimit,
  currency = "₦",
  changePercent = 5.2,
}: Props) {
  const router = useRouter();
  const user = useAuthStore((s: any) => s.user);
  const name = getFirstName(user?.fullname);

  return (
    <section className="space-y-6 min-w-0 overflow-x-hidden pl-0 lg:pl-6 pr-4">
      {/* Hero row */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,372px)_minmax(0,440px)] gap-4 lg:gap-[25px] items-stretch min-w-0">
        <div className="min-w-0">
          <WalletBalanceCard
            totalBalance={totalBalance}
            transactionLimit={transactionLimit}
            currency={currency}
            changePercent={changePercent}
            onFundWallet={() => router.push("/wallet?tab=fund")}
            onWithdraw={() => router.push("/wallet?tab=withdraw")}
            activeAction="fund"
          />
        </div>

        <div className="min-w-0">
          <ExchangePromoCard />
        </div>
      </div>

      <QuickActionsSection />
      <RecentTransactionsSection />
    </section>
  );
}
