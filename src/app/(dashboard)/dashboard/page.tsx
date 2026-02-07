"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

import DashboardOverviewSection from "@/components/dashboard/overview/DashboardOverviewSection";
import RecentTransactionsSection from "@/components/dashboard/overview/RecentTransactionsSection";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) router.replace("/login");
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      router.replace("/login");
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600"
        >
          Log out
        </button>
      </div>

      <DashboardOverviewSection
        totalBalance={300000}
        transactionLimit={100000}
        currency="₦"
        changePercent={5.2}
      />
      <RecentTransactionsSection />
    </div>
  );
}
