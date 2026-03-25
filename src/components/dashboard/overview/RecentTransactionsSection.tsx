"use client";

import { useEffect } from "react";
import Link from "next/link";
import TransactionsTable, { Transaction } from "./TransactionsTable";
import { useTransactionStore, ApiTransaction } from "@/store/Transactionstore";

// ----------------------------------------------------------------
// Map API transaction → UI Transaction shape
// ----------------------------------------------------------------

function getIcon(tx: ApiTransaction): Transaction["icon"] {
  if (tx.deposit) return "fund";
  if (tx.withdrawal) return "send";
  if (tx.gift_card) return "gift";
  if (tx.crypto) return "crypto";
  return "fund";
}

function getType(tx: ApiTransaction): string {
  if (tx.deposit) return "Fund Deposit";
  if (tx.withdrawal) return "Withdrawal";
  if (tx.gift_card) return "Giftcard Sale";
  if (tx.crypto) return "Crypto Transaction";
  return tx.type;
}

function getStatus(status: ApiTransaction["status"]): Transaction["status"] {
  if (status === "approved") return "successful";
  if (status === "rejected" || status === "failed") return "failed";
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
    type: getType(tx),
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
  }, []);

  const rows = transactions.slice(0, 6).map(mapTransaction);

  return (
    <section className="w-full">
      <div className="rounded-[18px] bg-white border border-slate-100 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
        {/* Header */}
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

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <svg
              className="animate-spin h-6 w-6 text-emerald-500"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="px-6 py-8 text-center">
            <p className="text-[13px] text-red-500">{error}</p>
            <button
              onClick={fetchTransactions}
              className="mt-3 text-[12px] text-emerald-600 font-medium hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && rows.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-[13px] text-slate-400">No transactions yet</p>
          </div>
        )}

        {/* Table */}
        {!isLoading && !error && rows.length > 0 && (
          <div className="px-6 pb-6 pt-4">
            <TransactionsTable items={rows} />
          </div>
        )}
      </div>
    </section>
  );
}
