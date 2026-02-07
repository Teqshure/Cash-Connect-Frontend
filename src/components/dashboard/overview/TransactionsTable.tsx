"use client";

import TransactionRow from "./TransactionRow";

export type TransactionStatus = "successful" | "pending" | "failed";

export type TransactionIcon =
  | "crypto"
  | "gift"
  | "fund"
  | "card"
  | "exchange"
  | "send";

export type Transaction = {
  id: string;
  date: string;
  time?: string;
  type: string;
  amountPrimary: string; // e.g. "₦ 75,000.00" OR "USDT"
  amountSecondary?: string; // e.g. "500.00"
  status: TransactionStatus;
  icon: TransactionIcon;
};

type Props = {
  items: Transaction[];
};

export default function TransactionsTable({ items }: Props) {
  return (
    <div className="w-full">
      {/* Table header */}
      <div className="grid grid-cols-[160px_1fr_180px_140px] gap-4 pb-3 border-b border-slate-100">
        <p className="text-[12px] text-slate-400 font-medium">Date</p>
        <p className="text-[12px] text-slate-400 font-medium">
          Transaction Type
        </p>
        <p className="text-[12px] text-slate-400 font-medium">Amount</p>
        <p className="text-[12px] text-slate-400 font-medium">Status</p>
      </div>

      {/* Rows */}
      <div className="mt-3 space-y-3">
        {items.map((tx) => (
          <TransactionRow key={tx.id} tx={tx} />
        ))}
      </div>
    </div>
  );
}
