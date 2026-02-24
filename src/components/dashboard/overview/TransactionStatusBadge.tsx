"use client";

import type { TransactionStatus } from "./TransactionsTable";

type Props = {
  status: TransactionStatus;
};

const styles: Record<TransactionStatus, string> = {
  successful: "bg-emerald-100 text-emerald-700 border-emerald-200",
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  failed: "bg-rose-100 text-rose-700 border-rose-200",
};

const labels: Record<TransactionStatus, string> = {
  successful: "Successful",
  pending: "Pending",
  failed: "Failed",
};

export default function TransactionStatusBadge({ status }: Props) {
  return (
    <span
      className={[
        "inline-flex items-center justify-center",
        "h-5 px-2.5 rounded-full border",
        "text-[10px] font-medium",
        styles[status],
      ].join(" ")}
    >
      {labels[status]}
    </span>
  );
}
