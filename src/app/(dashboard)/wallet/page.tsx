import { Suspense } from "react";
import WalletPageSection from "@/components/dashboard/wallet/WalletPageSection";

export default function WalletPage() {
  const totalBalance = 300000;
  const transactionLimit = 100000;

  return (
    <Suspense
      fallback={<div className="p-6 text-slate-400 text-sm">Loading...</div>}
    >
      <WalletPageSection
        totalBalance={totalBalance}
        transactionLimit={transactionLimit}
        currency="₦"
        changePercent={5.2}
      />
    </Suspense>
  );
}
