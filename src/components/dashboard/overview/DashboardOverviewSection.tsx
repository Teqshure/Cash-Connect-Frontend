"use client";

import { useRouter } from "next/navigation";
import WalletBalanceCard from "./WalletBalanceCard";
import ExchangePromoCard from "./ExchangePromoCard";
import QuickActionsSection from "./QuickActionsSection";
import RecentTransactionsSection from "./RecentTransactionsSection";

type Props = {
  totalBalance: number;
  transactionLimit: number;
  currency?: string;
  changePercent?: number;
};

export default function DashboardOverviewSection({
  totalBalance,
  transactionLimit,
  currency = "₦",
  changePercent = 5.2,
}: Props) {
  const router = useRouter();

  return (
    <section className="space-y-6 w-full">
      {/* Hero row */}
      <div
        className="
    grid
    grid-cols-1
    lg:grid-cols-[305px_minmax(0,1fr)]
    xl:grid-cols-[320px_minmax(0,1fr)]
    gap-4 lg:gap-6
    items-stretch
    w-full
  "
      >
        {/* Balance */}
        <div className="w-full h-full">
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

        {/* Promo */}
        <div className="w-full h-full">
          <ExchangePromoCard />
        </div>
      </div>

      <QuickActionsSection />
      <RecentTransactionsSection />
    </section>
  );
}
