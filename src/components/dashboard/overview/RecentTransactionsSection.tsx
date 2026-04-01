"use client";

import { useEffect } from "react";
import Link from "next/link";
import TransactionsTable, { Transaction } from "./TransactionsTable";
import { useTransactionStore, ApiTransaction } from "@/store/Transactionstore";

// ----------------------------------------------------------------
// Mapping helpers (same logic as History page)
// ----------------------------------------------------------------

function getIcon(tx: ApiTransaction): Transaction["icon"] {
  const type = tx.type?.toLowerCase();

  if (type === "deposit") return "fund";
  if (type === "withdrawal") return "send";
  if (type === "gift" || type === "giftcard") return "gift";
  if (type === "crypto") return "crypto";
  if (type === "international") return "exchange";

  return "fund";
}

function getLabel(tx: ApiTransaction): string {
  const type = tx.type?.toLowerCase();

  if (type === "deposit") return "Fund Deposit";
  if (type === "withdrawal") return "Send Payment";
  if (type === "gift" || type === "giftcard") return "Giftcard Sale";
  if (type === "crypto") return "Crypto Transaction";
  if (type === "international") return "Crypto Exchange";

  return type ?? "Transaction";
}

function getStatus(status: ApiTransaction["status"]): Transaction["status"] {
  const normalized = status?.toString().toLowerCase();

  if (normalized === "approved" || normalized === "success")
    return "successful";

  if (["rejected", "failed", "declined", "error"].includes(normalized))
    return "failed";

  return "pending";
}

function formatDate(dateStr: string): { date: string; time: string } {
  const d = new Date(dateStr);

  const date = d
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  const time = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { date, time };
}

function mapTransaction(tx: ApiTransaction): Transaction {
  const { date, time } = formatDate(tx.created_at);

  const amount = parseFloat(tx.amount).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return {
    id: String(tx.id),
    date,
    time,
    type: getLabel(tx),
    amountPrimary: `${tx.currency === "NGN" ? "₦" : tx.currency} ${amount}`,
    status: getStatus(tx.status),
    icon: getIcon(tx),
  };
}

// ----------------------------------------------------------------
// Component
// ----------------------------------------------------------------

export default function RecentTransactionsSection() {
  const { transactions, isLoading, error, fetchTransactions } =
    useTransactionStore();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const rows = transactions.map(mapTransaction).slice(0, 6);

  return (
    <section className="w-full">
      <div className="rounded-[18px] bg-white border border-slate-100 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
        <div className="flex items-center justify-between px-6 pt-5">
          <h3 className="text-[13px] font-medium text-slate-700">
            Recent Transactions
          </h3>

          <Link
            href="/History"
            className="text-[11px] font-medium text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-2"
          >
            View All <span aria-hidden>→</span>
          </Link>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <svg
              className="animate-spin h-6 w-6 text-emerald-500"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-25"
              />
              <path
                fill="currentColor"
                className="opacity-75"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
          </div>
        )}

        {!isLoading && error && (
          <div className="px-6 py-8 text-center">
            <p className="text-[13px] text-red-500">{error}</p>

            <button
              onClick={() => fetchTransactions()}
              className="mt-3 text-[12px] text-emerald-600 font-medium hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !error && rows.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-[13px] text-slate-400">No transactions yet</p>
          </div>
        )}

        {!isLoading && !error && rows.length > 0 && (
          <div className="px-6 pb-6 pt-4">
            <TransactionsTable items={rows} />
          </div>
        )}
      </div>
    </section>
  );
}
