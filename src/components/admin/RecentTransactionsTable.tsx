"use client";

import { Eye } from "lucide-react";

const transactions = [
  {
    user: "John Doe",
    activity: "Sold Bitcoin",
    type: "Crypto",
    amount: "₦ 75,000.00",
    status: "Successful",
    date: "25-10-2025",
    time: "09:15 AM",
  },
  {
    user: "Sarah Miller",
    activity: "iTunes Gift Card",
    type: "Giftcard",
    amount: "₦ 75,000.00",
    status: "Successful",
    date: "25-10-2025",
    time: "09:15 AM",
  },
  {
    user: "Michael Chen",
    activity: "Zelle Payout",
    type: "Payout",
    amount: "₦ 75,000.00",
    status: "Pending",
    date: "25-10-2025",
    time: "09:15 AM",
  },
  {
    user: "Emma Wilson",
    activity: "Bought USDT",
    type: "Crypto",
    amount: "₦ 75,000.00",
    status: "Processing",
    date: "25-10-2025",
    time: "09:15 AM",
  },
  {
    user: "David Brown",
    activity: "Wallet Deposit",
    type: "Wallet",
    amount: "₦ 75,000.00",
    status: "Successful",
    date: "25-10-2025",
    time: "09:15 AM",
  },
  {
    user: "John Doe",
    activity: "Sold Bitcoin",
    type: "Crypto",
    amount: "₦ 75,000.00",
    status: "Successful",
    date: "25-10-2025",
    time: "09:15 AM",
  },
];

const typeStyles: Record<string, string> = {
  Crypto: "bg-[#FFF9E7] text-[#D9A400] border border-[#FFECB3]",
  Giftcard: "bg-[#FFF2F0] text-[#FF5A4F] border border-[#FFD9D6]",
  Payout: "bg-[#E6F0FF] text-[#0066FF] border border-[#CCE0FF]",
  Wallet: "bg-[#F3E8FF] text-[#9333EA] border border-[#E9D5FF]",
};

const statusStyles: Record<string, string> = {
  Successful: "bg-emerald-50 text-emerald-500",
  Pending: "bg-orange-50  text-orange-400",
  Processing: "bg-blue-50    text-blue-400",
};

export default function RecentTransactionsTable() {
  return (
    <div className="overflow-x-auto no-scrollbar">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100">
            {[
              "User",
              "Activity",
              "Type",
              "Amount",
              "Status",
              "Date",
              "Actions",
            ].map((h, i) => (
              <th
                key={h}
                className={`pb-4 px-4 text-[13px] font-medium text-slate-400 ${
                  i === 6 ? "text-right" : ""
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {transactions.map((tx, index) => (
            <tr key={index} className="hover:bg-slate-50/70 transition-colors">
              {/* User */}
              <td className="py-4 px-4 whitespace-nowrap">
                <span className="text-[13px] font-medium text-slate-600">
                  {tx.user}
                </span>
              </td>

              {/* Activity */}
              <td className="py-4 px-4 whitespace-nowrap">
                <span className="text-[15px] font-semibold text-slate-800">
                  {tx.activity}
                </span>
              </td>

              {/* Type badge */}
              <td className="py-4 px-4">
                <span
                  className={`inline-block text-[12px] font-semibold px-3 py-1 rounded-full ${typeStyles[tx.type]}`}
                >
                  {tx.type}
                </span>
              </td>

              {/* Amount */}
              <td className="py-4 px-4 whitespace-nowrap">
                <span className="text-[15px] font-bold text-slate-800">
                  {tx.amount}
                </span>
              </td>

              {/* Status badge */}
              <td className="py-4 px-4">
                <span
                  className={`inline-block text-[12px] font-semibold px-3 py-1.5 rounded-full ${statusStyles[tx.status]}`}
                >
                  {tx.status}
                </span>
              </td>

              {/* Date + Time */}
              <td className="py-4 px-4 whitespace-nowrap">
                <p className="text-[13px] font-medium text-slate-600 leading-none">
                  {tx.date}
                </p>
                <p className="text-[12px] text-slate-400 mt-1 leading-none">
                  {tx.time}
                </p>
              </td>

              {/* Actions */}
              <td className="py-4 px-4">
                <div className="flex items-center justify-end gap-2">
                  <button className="text-emerald-500 hover:text-emerald-600 transition-colors">
                    <Eye className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                  <button className="bg-emerald-50 text-emerald-600 text-[12px] font-semibold px-3.5 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors active:scale-95">
                    View
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
