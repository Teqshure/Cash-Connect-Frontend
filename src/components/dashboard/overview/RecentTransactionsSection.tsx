"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TransactionsTable, { Transaction } from "./TransactionsTable";
import { useTransactionStore, ApiTransaction } from "@/store/Transactionstore";
import TransactionDetailModal from "../History/TransactionDetailModal";

// ----------------------------------------------------------------
// Robust mapping helpers (production-safe)
// ----------------------------------------------------------------

function normalizeType(type?: string): string {
  return (type ?? "").toLowerCase();
}

function getIcon(tx: ApiTransaction): Transaction["icon"] {
  const type = normalizeType(tx.type);

  if (type.includes("deposit") || type.includes("fund")) return "fund";

  if (
    type.includes("withdraw") ||
    type.includes("send") ||
    type.includes("transfer")
  )
    return "send";

  if (type.includes("gift")) return "gift";

  if (type.includes("crypto")) return "crypto";

  if (type.includes("international") || type.includes("exchange"))
    return "exchange";

  return "fund";
}

function getLabel(tx: ApiTransaction): string {
  const type = normalizeType(tx.type);

  if (type.includes("deposit") || type.includes("fund")) return "Fund Deposit";

  if (
    type.includes("withdraw") ||
    type.includes("send") ||
    type.includes("transfer")
  )
    return "Send Payment";

  if (type.includes("gift")) return "Giftcard Sale";

  if (type.includes("crypto")) return "Crypto Transaction";

  if (type.includes("international") || type.includes("exchange"))
    return "International Transfer";

  return tx.type ?? "Transaction";
}

function getStatus(status: ApiTransaction["status"]): Transaction["status"] {
  const normalized = status?.toString().toLowerCase() ?? "";

  if (
    normalized === "approved" ||
    normalized === "success" ||
    normalized === "successful" ||
    normalized === "completed"
  )
    return "successful";

  if (
    ["rejected", "failed", "declined", "error", "cancelled"].includes(
      normalized,
    )
  )
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
  const icon = getIcon(tx);
  const status = getStatus(tx.status);

  // ── International transaction: special display logic ──────────────────
  if (tx.type === "international" && tx.international) {
    const intl = tx.international as any;
    const currency = intl.account?.currency ?? "USD";
    const expectedAmt = parseFloat(intl.expected_amount ?? "0");
    const fiatAmt     = parseFloat(intl.fiat_equivalent ?? "0");
    const rate        = parseFloat(intl.rate ?? "0");

    const foreignFormatted = expectedAmt.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const ngnFormatted = fiatAmt.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const isApproved = status === "successful";

    return {
      id: String(tx.id),
      date,
      time,
      type: getLabel(tx),
      amountPrimary: isApproved
        ? `₦${ngnFormatted}`
        : `${currency} ${foreignFormatted}`,
      status,
      icon,
      isInternational: true,
      intlId: intl.id,
      receipt: intl.receipt,
      foreignAmount: `${currency} ${foreignFormatted}`,
      foreignCurrency: currency,
      exchangeRate: isApproved && rate > 0 ? `₦${rate.toLocaleString("en-NG", { minimumFractionDigits: 2 })}/${currency}` : undefined,
      ngnAmount:    isApproved ? `₦${ngnFormatted}` : undefined,
    };
  }

  // ── All other transaction types ────────────────────────────────────────
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
    status,
    icon,
  };
}

// ----------------------------------------------------------------
// Component
// ----------------------------------------------------------------

export default function RecentTransactionsSection() {
  const { transactions, isLoading, error, fetchTransactions } =
    useTransactionStore();
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  useEffect(() => {
    fetchTransactions(true);
  }, [fetchTransactions]);

  const rows = transactions
    .filter((tx: any) => {
      // Exclude expected payouts with no receipt
      if (tx.type === "international" && !tx.receipt && (!tx.international || !tx.international.receipt)) {
        return false;
      }
      return true;
    })
    .map(mapTransaction)
    .slice(0, 6);

  return (
    <section className="w-full">
      <div className="rounded-[18px] bg-white border border-slate-100 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
        <div className="flex items-center justify-between px-6 pt-5">
          <h3 className="text-[13px] font-medium text-slate-700">
            Recent Activity
          </h3>
          <Link
            href="/history"
            className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 transition"
          >
            See all
          </Link>
        </div>

        {/* loader */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <svg
              className="animate-spin h-5 w-5 text-slate-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
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
            <TransactionsTable items={rows} onSelect={setSelectedTx} />
          </div>
        )}
      </div>

      <TransactionDetailModal
        isOpen={!!selectedTx}
        onClose={() => setSelectedTx(null)}
        tx={selectedTx}
      />
    </section>
  );
}
