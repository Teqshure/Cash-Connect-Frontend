"use client";

import { useEffect } from "react";
import DashboardOverviewSection from "@/components/dashboard/overview/DashboardOverviewSection";
import MobileDashboard from "@/components/dashboard/mobileDashbord/MobileDashboard";
import { useAuthStore, User } from "@/store/useAuthStore";
import OnboardingChecklist from "@/components/dashboard/OnboardingChecklist";

export default function DashboardPage() {
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
    <>
      {/* Desktop */}
      <div className="hidden lg:flex w-full min-w-0 gap-6 overflow-x-hidden">
        <div className="flex-1 min-w-0">
          <OnboardingChecklist />
          <DashboardOverviewSection
            totalBalance={balance}
            transactionLimit={transactionLimit}
            currency="₦"
            changePercent={5.2}
          />
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <MobileDashboard />
      </div>
    </>
  );
}
