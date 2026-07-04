"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTransactionStore } from "@/store/Transactionstore";
import { ArrowDownLeft, ArrowUpRight, Bitcoin, CreditCard, Globe } from "lucide-react";

function getTransactionIcon(type: string) {
  switch (type) {
    case "deposit": return { icon: ArrowDownLeft, bg: "bg-emerald-50", color: "text-emerald-600" };
    case "withdrawal": return { icon: ArrowUpRight, bg: "bg-rose-50", color: "text-rose-500" };
    case "crypto": return { icon: Bitcoin, bg: "bg-amber-50", color: "text-amber-600" };
    case "gift": return { icon: CreditCard, bg: "bg-purple-50", color: "text-purple-600" };
    case "international": return { icon: Globe, bg: "bg-blue-50", color: "text-blue-600" };
    default: return { icon: ArrowDownLeft, bg: "bg-slate-50", color: "text-slate-500" };
  }
}

function getTypeLabel(type: string): string {
  switch (type) {
    case "deposit": return "Deposit";
    case "withdrawal": return "Withdrawal";
    case "crypto": return "Crypto";
    case "gift": return "Giftcard";
    case "international": return "Global Pay";
    default: return "Transaction";
  }
}

export default function MobileRecentTransactions() {
  const router = useRouter();
  const transactions = useTransactionStore((s: any) => s.transactions);
  const fetchTransactions = useTransactionStore((s: any) => s.fetchTransactions);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const recent = transactions.slice(0, 5);

  return (
    <div className="mt-6 mb-2">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[16px] font-semibold text-slate-800">Recent Transactions</h2>
        <button
          onClick={() => router.push("/history")}
          className="text-[12px] font-semibold text-emerald-600 hover:text-emerald-700 transition"
        >
          View All →
        </button>
      </div>

      <div className="bg-white rounded-[20px] border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden">
        {recent.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-[13px] text-slate-400">No transactions yet</p>
            <p className="text-[11px] text-slate-300 mt-1">Your activity will appear here</p>
          </div>
        ) : (
          recent.map((tx: any, index: number) => {
            const { icon: Icon, bg, color } = getTransactionIcon(tx.type);
            const isCredit = tx.direction === "credit";
            const amountStr = `${isCredit ? "+" : "-"}₦${parseFloat(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            const amountColor = isCredit ? "text-emerald-600" : "text-slate-800";
            const statusColor = tx.status === "approved" ? "text-emerald-500" : tx.status === "rejected" || tx.status === "expired" ? "text-rose-500" : "text-amber-500";

            return (
              <div
                key={tx.id}
                onClick={() => router.push("/history")}
                className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-slate-50/60 transition ${
                  index < recent.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${bg}`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-slate-800 truncate">{getTypeLabel(tx.type)}</p>
                  <p className={`text-[11px] font-medium capitalize ${statusColor}`}>{tx.status}</p>
                </div>
                <p className={`text-[13px] font-bold shrink-0 ${amountColor}`}>{amountStr}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
