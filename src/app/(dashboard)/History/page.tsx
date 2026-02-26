import HistoryPageContent from "@/components/dashboard/History/HistoryPageContent";

export const metadata = {
  title: "Transaction History | CashConnect",
  description: "View all your past transactions",
};

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <HistoryPageContent />
    </div>
  );
}
