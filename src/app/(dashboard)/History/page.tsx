import { Suspense } from "react";
import HistoryPageContent from "@/components/dashboard/History/HistoryPageContent";

export const metadata = {
  title: "Transaction History | CashConnect",
  description: "View all your past transactions",
};

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
      }>
        <HistoryPageContent />
      </Suspense>
    </div>
  );
}
