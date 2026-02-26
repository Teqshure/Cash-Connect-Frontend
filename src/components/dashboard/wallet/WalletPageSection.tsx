"use client";

import { useRouter, useSearchParams } from "next/navigation";
import WalletBalanceCard from "@/components/dashboard/overview/WalletBalanceCard";
import FundWalletCard from "@/components/dashboard/wallet/FundWalletCard";
import WithdrawWalletCard from "@/components/dashboard/wallet/WithdrawWalletCard";

type Props = {
  totalBalance: number;
  transactionLimit: number;
  currency?: string;
  changePercent?: number;
};

type WalletMode = "fund" | "withdraw";

export default function WalletPageSection({
  totalBalance,
  transactionLimit,
  currency = "₦",
  changePercent = 5.2,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  // ✅ Derive mode directly from URL (no state, no effect)
  const mode: WalletMode = tab === "withdraw" ? "withdraw" : "fund";

  const goFund = () => router.replace("/wallet?tab=fund");
  const goWithdraw = () => router.replace("/wallet?tab=withdraw");

  return (
    <section className="min-w-0 overflow-x-hidden pr-4 lg:pr-6 lg:pl-6 mb-10 xl:mb-14">
      <div className="grid grid-cols-1 lg:grid-cols-[372px_minmax(0,1fr)] gap-8 items-start">
        <div className="min-w-0">
          <WalletBalanceCard
            totalBalance={totalBalance}
            transactionLimit={transactionLimit}
            currency={currency}
            changePercent={changePercent}
            onFundWallet={goFund}
            onWithdraw={goWithdraw}
            activeAction={mode}
          />
        </div>

        <div className="min-w-0">
          {mode === "fund" ? (
            <FundWalletCard currency={currency} />
          ) : (
            <WithdrawWalletCard currency={currency} />
          )}
        </div>
      </div>
    </section>
  );
}
