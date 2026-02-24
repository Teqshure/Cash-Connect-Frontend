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
  amountPrimary: string;
  amountSecondary?: string;
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
      <div className="grid grid-cols-[120px_1fr_140px_90px] gap-3 pb-3 border-b border-slate-100">
        <p className="text-[11px] text-slate-400 font-medium pl-3">Date</p>
        <p className="text-[11px] text-slate-400 font-medium">
          Transaction Type
        </p>
        <p className="text-[11px] text-slate-400 font-medium">Amount</p>
        <p className="text-[11px] text-slate-400 font-medium">Status</p>
      </div>

      {/* Rows */}
      <div className="mt-3">
        {items.map((tx) => (
          <TransactionRow key={tx.id} tx={tx} />
        ))}
      </div>
    </div>
  );
}
