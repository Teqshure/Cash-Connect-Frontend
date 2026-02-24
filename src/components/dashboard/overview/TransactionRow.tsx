"use client";

import type { Transaction } from "./TransactionsTable";
import TransactionTypeIcon from "./TransactionTypeIcon";
import TransactionStatusBadge from "./TransactionStatusBadge";

type Props = {
  tx: Transaction;
};

export default function TransactionRow({ tx }: Props) {
  return (
    <div className="grid grid-cols-[120px_1fr_140px_90px] gap-3 items-start py-3 hover:bg-slate-50/60 transition">
      {/* Date */}
      <div className="pl-3">
        <p className="text-[11px] text-slate-700 font-medium whitespace-nowrap">
          {tx.date}
        </p>
        {tx.time && (
          <p className="text-[10px] text-slate-400 mt-0.5 whitespace-nowrap">
            {tx.time}
          </p>
        )}
      </div>

      {/* Type */}
      <div className="flex items-center gap-3">
        <TransactionTypeIcon kind={tx.icon} />
        <p className="text-[12px] text-slate-700 font-medium truncate">
          {tx.type}
        </p>
      </div>

      {/* Amount */}
      <div>
        <p className="text-[11px] text-slate-700 font-medium whitespace-nowrap">
          {tx.amountPrimary}
        </p>
        {tx.amountSecondary && (
          <p className="text-[11px] text-slate-700 mt-0.5 whitespace-nowrap">
            {tx.amountSecondary}
          </p>
        )}
      </div>

      {/* Status */}
      <div>
        <TransactionStatusBadge status={tx.status} />
      </div>
    </div>
  );
}
