import DashboardOverviewSection from "@/components/dashboard/overview/DashboardOverviewSection";

export default function DashboardPage() {
  return (
    // Full width row, no overflow-x
    <div className="flex w-full min-w-0 gap-6 overflow-x-hidden">
      {/* Left column */}
      <div className="flex-1 min-w-0">
        <DashboardOverviewSection
          totalBalance={300000}
          transactionLimit={100000}
          currency="₦"
          changePercent={5.2}
        />
        {/* other main sections... */}
      </div>
    </div>
  );
}
