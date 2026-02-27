"use client";

import { useRouter, useSearchParams } from "next/navigation";
import WalletBalanceCard from "@/components/dashboard/overview/WalletBalanceCard";
import FundWalletCard from "@/components/dashboard/wallet/FundWalletCard";
import WithdrawWalletCard from "@/components/dashboard/wallet/WithdrawWalletCard";
import MobileWalletDashboard from "./Mobilewalletdashboard";
import MobileWalletFundWithdraw from "./Mobilewalletfundwithdraw";

type Props = {
  totalBalance: number;
  transactionLimit: number;
  currency?: string;
  changePercent?: number;
};

export default function WalletPageSection({
  totalBalance,
  transactionLimit,
  currency = "₦",
  changePercent = 5.2,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  // null = default wallet view, "fund" or "withdraw" = show form
  const mode = tab === "withdraw" ? "withdraw" : tab === "fund" ? "fund" : null;

  const goFund = () => router.replace("/wallet?tab=fund");
  const goWithdraw = () => router.replace("/wallet?tab=withdraw");

  return (
    <>
      {/* ── DESKTOP ── */}
      <section className="hidden lg:block min-w-0 overflow-x-hidden pr-4 lg:pr-6 lg:pl-6 mb-10 xl:mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-[372px_minmax(0,1fr)] gap-8 items-start">
          <div className="min-w-0">
            <WalletBalanceCard
              totalBalance={totalBalance}
              transactionLimit={transactionLimit}
              currency={currency}
              changePercent={changePercent}
              onFundWallet={goFund}
              onWithdraw={goWithdraw}
              activeAction={mode ?? "fund"}
            />
          </div>
          <div className="min-w-0">
            {mode === "withdraw" ? (
              <WithdrawWalletCard currency={currency} />
            ) : (
              <FundWalletCard currency={currency} />
            )}
          </div>
        </div>
      </section>

      {/* ── MOBILE ── */}
      <div className="lg:hidden">
        {mode === null ? (
          // Default view — balance + shortcuts + transactions
          <MobileWalletDashboard
            totalBalance={totalBalance}
            transactionLimit={transactionLimit}
            currency={currency}
            changePercent={changePercent}
            onFundWallet={goFund}
            onWithdraw={goWithdraw}
          />
        ) : (
          // Fund or Withdraw view — balance + form
          <MobileWalletFundWithdraw
            mode={mode}
            totalBalance={totalBalance}
            transactionLimit={transactionLimit}
            currency={currency}
            changePercent={changePercent}
            onFundWallet={goFund}
            onWithdraw={goWithdraw}
          />
        )}
      </div>
    </>
  );
}
