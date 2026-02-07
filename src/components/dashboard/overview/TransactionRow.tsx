"use client";

import type { Transaction } from "./TransactionsTable";
import TransactionTypeIcon from "./TransactionTypeIcon";
import TransactionStatusBadge from "./TransactionStatusBadge";

type Props = {
  tx: Transaction;
};

export default function TransactionRow({ tx }: Props) {
  return (
    <div className="grid grid-cols-[160px_1fr_180px_140px] gap-4 items-center rounded-[14px] px-3 py-3 hover:bg-slate-50/60 transition">
      {/* Date */}
      <div>
        <p className="text-[12px] text-slate-700 font-medium">{tx.date}</p>
        {tx.time ? (
          <p className="text-[11px] text-slate-400 mt-0.5">{tx.time}</p>
        ) : null}
      </div>

      {/* Type */}
      <div className="flex items-center gap-3">
        <TransactionTypeIcon kind={tx.icon} />
        <p className="text-[13px] text-slate-700 font-medium">{tx.type}</p>
      </div>

      {/* Amount */}
      <div>
        <p className="text-[12px] text-slate-700 font-medium">
          {tx.amountPrimary}
        </p>
        {tx.amountSecondary ? (
          <p className="text-[12px] text-slate-700 mt-0.5">
            {tx.amountSecondary}
          </p>
        ) : null}
      </div>

      {/* Status */}
      <div className="flex justify-start">
        <TransactionStatusBadge status={tx.status} />
      </div>
    </div>
  );
}
