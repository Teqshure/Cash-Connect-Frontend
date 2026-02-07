"use client";

import WalletBalanceCard from "./WalletBalanceCard";
import ExchangePromoCard from "./ExchangePromoCard";
import QuickActionsSection from "./QuickActionsSection";

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
  return (
    <section className="w-full space-y-6">
      {/* Hero row:
         - keeps your Figma max width (837px)
         - switches to stacked layout on smaller screens so it won't push the right rail behind
      */}
      <div className="w-full max-w-[837px] flex flex-col lg:flex-row gap-[25px]">
        <WalletBalanceCard
          totalBalance={totalBalance}
          transactionLimit={transactionLimit}
          currency={currency}
          changePercent={changePercent}
        />

        <ExchangePromoCard />
      </div>

      {/* Quick actions:
         - inside, tiles should wrap (flex-wrap) so they don't overflow into the right rail
      */}
      <QuickActionsSection />
    </section>
  );
}
