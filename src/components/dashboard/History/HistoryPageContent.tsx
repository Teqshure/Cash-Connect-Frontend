"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";
import { Transaction } from "../overview/TransactionsTable";
import TransactionsTable from "../overview/TransactionsTable";
import { useAuthStore } from "@/store/useAuthStore";
import { useTransactionStore, ApiTransaction } from "@/store/Transactionstore";

// ----------------------------------------------------------------
// Mappers (same as RecentTransactionsSection)
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
// Helpers
// ----------------------------------------------------------------

function getFirstName(fullname?: string | null) {
  if (!fullname) return "User";
  return fullname.trim().split(" ")[0] || "User";
}

function isCredit(icon: Transaction["icon"]) {
  return icon === "fund" || icon === "gift";
}

function shortType(type: string) {
  if (type.toLowerCase().includes("crypto")) return "Crypto";
  if (type.toLowerCase().includes("gift")) return "Giftcard";
  if (type.toLowerCase().includes("fund")) return "Fund";
  if (type.toLowerCase().includes("card")) return "Card";
  if (type.toLowerCase().includes("exchange")) return "Exchange";
  if (type.toLowerCase().includes("send")) return "Send";
  return type;
}

// ----------------------------------------------------------------
// Component
// ----------------------------------------------------------------

export default function HistoryPageContent() {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const user = useAuthStore((s: any) => s.user);
  const name = getFirstName(user?.fullname);

  const { transactions, isLoading, error, fetchTransactions } =
    useTransactionStore();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const allItems = transactions.map(mapTransaction);

  const filteredItems = allItems.filter((item: Transaction) => {
    const matchesStatus = filter === "all" || item.status === filter;
    const matchesSearch =
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.amountPrimary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <>
      {/* ── DESKTOP ── */}
      <div className="hidden lg:block w-full max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-end mb-6">
          <div className="flex items-center gap-[11px] w-[435px] h-[49px]">
            {/* Filter Button */}
            <div className="relative h-full">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="h-full px-4 rounded-full border border-slate-200 flex items-center gap-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${showFilterDropdown ? "rotate-180" : ""}`}
                />
              </button>
              {showFilterDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowFilterDropdown(false)}
                  />
                  <div className="absolute top-[52px] left-0 bg-white rounded-xl border border-slate-200 shadow-lg p-2 z-50 min-w-[180px]">
                    {["all", "successful", "pending", "failed"].map((f) => (
                      <button
                        key={f}
                        onClick={() => {
                          setFilter(f);
                          setShowFilterDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-[13px] font-medium transition capitalize ${
                          filter === f
                            ? f === "pending"
                              ? "bg-amber-600 text-white"
                              : f === "failed"
                                ? "bg-rose-600 text-white"
                                : "bg-emerald-600 text-white"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {f === "all"
                          ? "All"
                          : f.charAt(0).toUpperCase() + f.slice(1)}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Search */}
            <div className="flex-1 h-full">
              <div className="relative h-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-full pl-10 pr-4 rounded-full border border-slate-200 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[18px] bg-white border border-slate-100 shadow-[0_18px_50px_rgba(15,23,42,0.06)] p-6">
          {/* Loading */}
          {isLoading && (
            <div className="flex justify-center items-center py-16">
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
            <div className="py-10 text-center">
              <p className="text-[13px] text-red-500">{error}</p>
              <button
                onClick={fetchTransactions}
                className="mt-3 text-[12px] text-emerald-600 font-medium hover:underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Empty */}
          {!isLoading && !error && filteredItems.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-[13px] text-slate-400">
                No transactions found
              </p>
            </div>
          )}

          {/* Table */}
          {!isLoading && !error && filteredItems.length > 0 && (
            <TransactionsTable items={filteredItems} />
          )}
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="lg:hidden px-4 pb-8">
        <p
          className="mt-6 mb-4"
          style={{
            fontFamily: "Quicksand, sans-serif",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "140%",
            color: "#030319",
          }}
        >
          Good Morning, {name}! 👋
        </p>

        {/* Filter + Search row */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="h-[36px] px-3 rounded-full border border-slate-200 flex items-center gap-1.5 text-[12px] font-medium text-slate-700 bg-white"
            >
              <Filter className="h-3.5 w-3.5" />
              <span>Filter</span>
            </button>
            {showFilterDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowFilterDropdown(false)}
                />
                <div className="absolute top-[42px] left-0 bg-white rounded-xl border border-slate-200 shadow-lg p-2 z-50 min-w-[160px]">
                  {["all", "successful", "pending", "failed"].map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setFilter(f);
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-[13px] font-medium transition capitalize ${
                        filter === f
                          ? f === "pending"
                            ? "bg-amber-600 text-white"
                            : f === "failed"
                              ? "bg-rose-600 text-white"
                              : "bg-emerald-600 text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {f === "all"
                        ? "All"
                        : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search Reference"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[36px] pl-9 pr-4 rounded-full border border-slate-200 text-[12px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
            />
          </div>
        </div>

        {/* Transactions card */}
        <div className="bg-white rounded-[18px] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_80px] px-4 py-3 border-b border-slate-100">
            <p className="text-[12px] font-semibold text-emerald-600">
              Description
            </p>
            <p className="text-[12px] font-semibold text-emerald-600">
              Transaction ID
            </p>
            <p className="text-[12px] font-semibold text-emerald-600">Type</p>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center py-10">
              <svg
                className="animate-spin h-5 w-5 text-emerald-500"
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

          {!isLoading && filteredItems.length === 0 && (
            <div className="py-10 text-center text-[13px] text-slate-400">
              No transactions found
            </div>
          )}

          {!isLoading &&
            // FIX: Add type annotation for tx parameter
            filteredItems.map((tx: Transaction) => (
              <div
                key={tx.id}
                className="grid grid-cols-[1fr_1fr_80px] px-4 py-3 border-b border-slate-50 items-center"
              >
                <div className="flex items-center gap-2">
                  {isCredit(tx.icon) ? (
                    <ArrowUpCircle className="h-7 w-7 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <ArrowDownCircle className="h-7 w-7 text-rose-400 flex-shrink-0" />
                  )}
                  <span className="text-[13px] font-medium text-slate-700">
                    {shortType(tx.type)}
                  </span>
                </div>
                <p className="text-[12px] text-slate-500">
                  #{tx.id.padStart(8, "0")}
                </p>
                <p className="text-[12px] text-slate-600 font-medium">
                  {tx.status}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
