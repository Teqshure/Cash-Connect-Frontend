"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";
import { historyData } from "./historyData";
import { Transaction } from "../overview/TransactionsTable";
import TransactionsTable from "../overview/TransactionsTable";
import { useAuthStore } from "@/store/useAuthStore";

type Props = {
  initialItems?: Transaction[];
};

function getFirstName(fullname?: string | null) {
  if (!fullname) return "User";
  return fullname.trim().split(" ")[0] || "User";
}

// Map icon type to up/down direction for mobile view
function isCredit(icon: Transaction["icon"]) {
  return icon === "fund" || icon === "gift";
}

// Shorten type for mobile "Description" column
function shortType(type: string) {
  if (type.toLowerCase().includes("crypto")) return "Crypto";
  if (type.toLowerCase().includes("gift")) return "Giftcard";
  if (type.toLowerCase().includes("fund")) return "Fund";
  if (type.toLowerCase().includes("card")) return "Card";
  if (type.toLowerCase().includes("exchange")) return "Exchange";
  if (type.toLowerCase().includes("send")) return "Send";
  return type;
}

export default function HistoryPageContent({ initialItems }: Props) {
  const [items] = useState<Transaction[]>(initialItems || historyData);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const user = useAuthStore((s) => s.user);
  const name = getFirstName(user?.fullname);

  const filteredItems = items.filter((item) => {
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
          <TransactionsTable items={filteredItems} />
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="lg:hidden px-4 pb-8">
        {/* Greeting */}
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
          {/* Filter button */}
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

          {/* Search */}
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
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_1fr_80px] px-4 py-3 border-b border-slate-100">
            <p className="text-[12px] font-semibold text-emerald-600">
              Description
            </p>
            <p className="text-[12px] font-semibold text-emerald-600">
              Transaction ID
            </p>
            <p className="text-[12px] font-semibold text-emerald-600">Type</p>
          </div>

          {/* Rows */}
          {filteredItems.length === 0 ? (
            <div className="py-10 text-center text-[13px] text-slate-400">
              No transactions found
            </div>
          ) : (
            filteredItems.map((tx) => (
              <div
                key={tx.id}
                className="grid grid-cols-[1fr_1fr_80px] px-4 py-3 border-b border-slate-50 items-center"
              >
                {/* Description: icon + name */}
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

                {/* Transaction ID */}
                <p className="text-[12px] text-slate-500">
                  #{tx.id.padStart(8, "1254879")}
                </p>

                {/* Type */}
                <p className="text-[12px] text-slate-600 font-medium">Swap</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
