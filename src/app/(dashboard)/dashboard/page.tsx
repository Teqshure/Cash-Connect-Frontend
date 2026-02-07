import DashboardOverviewSection from "@/components/dashboard/overview/DashboardOverviewSection";
import RecentTransactionsSection from "@/components/dashboard/overview/RecentTransactionsSection";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
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
