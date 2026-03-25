"use client";

import { useEffect } from "react";
import { Suspense } from "react";
import WalletPageSection from "@/components/dashboard/wallet/WalletPageSection";
import { useAuthStore, User } from "@/store/useAuthStore";

export default function WalletPage() {
  const user = useAuthStore((s: { user: User | null }) => s.user);
  const refreshUser = useAuthStore(
    (s: { refreshUser: () => Promise<void> }) => s.refreshUser,
  );

  const balance = parseFloat(user?.wallet?.balance ?? "0");
  const transactionLimit = parseFloat(user?.wallet?.transaction_limit ?? "0");

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <Suspense
      fallback={<div className="p-6 text-slate-400 text-sm">Loading...</div>}
    >
      <WalletPageSection
        totalBalance={balance}
        transactionLimit={transactionLimit}
        currency="₦"
        changePercent={5.2}
      />
    </Suspense>
  );
}
