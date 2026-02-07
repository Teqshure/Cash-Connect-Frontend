"use client";

import Link from "next/link";
import TransactionsTable, { Transaction } from "./TransactionsTable";

type Props = {
  items?: Transaction[];
};

const demoData: Transaction[] = [
  {
    id: "1",
    date: "25-10-2025",
    time: "10:42 AM",
    type: "Crypto Transaction",
    amountPrimary: "USDT",
    amountSecondary: "500.00",
    status: "successful",
    icon: "crypto",
  },
  {
    id: "2",
    date: "25-10-2025",
    time: "09:15 AM",
    type: "Giftcard Sale",
    amountPrimary: "₦ 75,000.00",
    status: "pending",
    icon: "gift",
  },
  {
    id: "3",
    date: "24-10-2025",
    time: "06:30 PM",
    type: "Fund Deposit",
    amountPrimary: "₦ 50,000.00",
    status: "successful",
    icon: "fund",
  },
  {
    id: "4",
    date: "24-10-2025",
    time: "02:45 PM",
    type: "Card Purchase",
    amountPrimary: "₦ 25,500.00",
    status: "failed",
    icon: "card",
  },
  {
    id: "5",
    date: "23-10-2025",
    time: "11:20 AM",
    type: "Crypto Exchange",
    amountPrimary: "USDT 1,200.50",
    status: "successful",
    icon: "exchange",
  },
  {
    id: "6",
    date: "23-10-2025",
    time: "08:00 AM",
    type: "Send Payment",
    amountPrimary: "₦ 15,000.00",
    status: "pending",
    icon: "send",
  },
];

export default function RecentTransactionsSection({ items }: Props) {
  const rows = items?.length ? items : demoData;

  return (
    <section className="w-full">
      {/* Card container */}
      <div className="rounded-[18px] bg-white border border-slate-100 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
        {/* Header row */}
        <div className="flex items-center justify-between px-6 pt-5">
          <h3 className="text-[14px] font-medium text-slate-700">
            Recent Transactions
          </h3>

          <Link
            href="/dashboard/transactions"
            className="text-[12px] font-medium text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-2"
          >
            View All <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Table */}
        <div className="px-6 pb-6 pt-4">
          <TransactionsTable items={rows} />
        </div>
      </div>
    </section>
  );
}
