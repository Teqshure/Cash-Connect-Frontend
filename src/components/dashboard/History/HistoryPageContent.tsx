"use client";

import { useState } from "react";
import TransactionsTable from "../overview/TransactionsTable";
import { Search, Filter, ChevronDown } from "lucide-react";
import { historyData } from "./historyData";
import { Transaction } from "../overview/TransactionsTable";

type Props = {
  initialItems?: Transaction[];
};

export default function HistoryPageContent({ initialItems }: Props) {
  const [items] = useState<Transaction[]>(initialItems || historyData);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Filter transactions based on status and search
  const filteredItems = items.filter((item) => {
    const matchesStatus = filter === "all" || item.status === filter;
    const matchesSearch =
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.amountPrimary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Filter and Search Row - aligned to the right */}
      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-[11px] w-[435px] h-[49px]">
          {/* Filter Button - relative container for dropdown */}
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

            {/* Filter Dropdown - appears directly below the button */}
            {showFilterDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowFilterDropdown(false)}
                />
                <div className="absolute top-[52px] left-0 bg-white rounded-xl border border-slate-200 shadow-lg p-2 z-50 min-w-[180px]">
                  <div className="flex flex-col">
                    <button
                      onClick={() => {
                        setFilter("all");
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-[13px] font-medium transition ${
                        filter === "all"
                          ? "bg-emerald-600 text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => {
                        setFilter("successful");
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-[13px] font-medium transition ${
                        filter === "successful"
                          ? "bg-emerald-600 text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      Successful
                    </button>
                    <button
                      onClick={() => {
                        setFilter("pending");
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-[13px] font-medium transition ${
                        filter === "pending"
                          ? "bg-amber-600 text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => {
                        setFilter("failed");
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-[13px] font-medium transition ${
                        filter === "failed"
                          ? "bg-rose-600 text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      Failed
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Search Input */}
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

      {/* Transactions Table */}
      <div className="rounded-[18px] bg-white border border-slate-100 shadow-[0_18px_50px_rgba(15,23,42,0.06)] p-6">
        <TransactionsTable items={filteredItems} />
      </div>
    </div>
  );
}
