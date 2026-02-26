import DashboardOverviewSection from "@/components/dashboard/overview/DashboardOverviewSection";
import MobileDashboard from "@/components/dashboard/mobileDashbord/MobileDashboard";

export default function DashboardPage() {
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:flex w-full min-w-0 gap-6 overflow-x-hidden">
        <div className="flex-1 min-w-0">
          <DashboardOverviewSection
            totalBalance={300000}
            transactionLimit={100000}
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
