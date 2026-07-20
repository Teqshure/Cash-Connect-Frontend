"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ArrowUpCircle,
  ArrowDownCircle,
  Download,
} from "lucide-react";
import { Transaction } from "../overview/TransactionsTable";
import TransactionsTable from "../overview/TransactionsTable";
import { useAuthStore, User } from "@/store/useAuthStore";
import { useTransactionStore, ApiTransaction } from "@/store/Transactionstore";
import { useSearchParams } from "next/navigation";

// ----------------------------------------------------------------
// Mapping helpers
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
  if (type === "international") return "International Transfer";

  return type;
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
  const icon = getIcon(tx);
  const status = getStatus(tx.status);

  let result: any = null;

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

    result = {
      id: String(tx.id),
      date,
      time,
      type: getLabel(tx),
      // Pending → foreign amount; Approved → NGN credited
      amountPrimary: isApproved
        ? `₦${ngnFormatted}`
        : `${currency} ${foreignFormatted}`,
      status,
      icon,
      isInternational: true,
      intlId: intl.id,
      receipt: tx.receipt || intl.receipt || null,
      foreignAmount: `${currency} ${foreignFormatted}`,
      foreignCurrency: currency,
      // Only expose rate & NGN once approved
      exchangeRate: isApproved && rate > 0 ? `₦${rate.toLocaleString("en-NG", { minimumFractionDigits: 2 })}/${currency}` : undefined,
      ngnAmount:    isApproved ? `₦${ngnFormatted}` : undefined,
    };
  }

  // ── Gift Card Transaction Mapping ──────────────────────────────────────
  else if ((tx.type as any) === "gift" || (tx.type as any) === "giftcard") {
    const isDebit = tx.direction === "debit"; // Buy
    const amount = parseFloat(tx.amount).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    if (isDebit) {
      // Buy Order
      const gco = (tx as any).gift_card_order;
      const product = gco?.product;
      const brand = product?.gift_card?.name ?? "Giftcard";
      const cardQty = gco?.quantity ?? 1;
      const faceVal = product?.amount ? `$${product.amount}` : "";

      result = {
        id: String(tx.id),
        date,
        time,
        type: "Giftcard Purchase",
        amountPrimary: `₦${amount}`,
        status,
        icon: "gift",
        isGiftCard: true,
        tradeType: "buy",
        receipt: tx.receipt || null,
        cardName: brand,
        cardAmount: faceVal,
        cardCurrency: product?.currency ?? "USD",
        quantity: cardQty,
        cardCode: product?.card_code,
        cardPin: product?.card_pin,
        cardImages: product?.card_images,
        brandImage: product?.gift_card?.image || null,
      };
    } else {
      // Sell Order (GiftCardTransaction)
      const stx = (tx as any).giftcard;
      const brand = stx?.card_brand ?? "Giftcard";
      const faceVal = stx?.card_value ? `$${stx.card_value}` : "";

      result = {
        id: String(tx.id),
        date,
        time,
        type: "Giftcard Sale",
        amountPrimary: `₦${amount}`,
        status,
        icon: "gift",
        isGiftCard: true,
        tradeType: "sell",
        receipt: tx.receipt || null,
        cardName: brand,
        cardAmount: faceVal,
        cardCurrency: stx?.currency ?? "USD",
        cardCode: stx?.card_code,
        cardPin: stx?.card_pin,
        cardImages: stx?.card_images,
        brandImage: stx?.giftcard_brand_image || stx?.image || null,
      };
    }
  }

  // ── Crypto Transaction Mapping ────────────────────────────────────────
  else if (tx.type === "crypto") {
    const isDebit = tx.direction === "debit"; // Buy
    const amount = parseFloat(tx.amount).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const ctx = (tx as any).crypto;
    const tokenSymbol = ctx?.crypto_type ?? tx.currency ?? "USDT";
    const cryptoAmt = ctx?.crypto_amount ? parseFloat(ctx.crypto_amount).toFixed(6) : "0.00";

    result = {
      id: String(tx.id),
      date,
      time,
      type: isDebit ? `Buy ${tokenSymbol}` : `Sell ${tokenSymbol}`,
      amountPrimary: `₦${amount}`,
      status,
      icon: "crypto",
      isCrypto: true,
      tradeType: isDebit ? "buy" : "sell",
      receipt: tx.receipt || null,
      tokenSymbol,
      cryptoAmount: cryptoAmt,
      walletAddress: ctx?.wallet_address,
      description: tx.description,
    };
  }

  // ── All other transaction types ────────────────────────────────────────
  else {
    const amount = parseFloat(tx.amount).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    result = {
      id: String(tx.id),
      date,
      time,
      type: getLabel(tx),
      amountPrimary: `${tx.currency === "NGN" ? "₦" : tx.currency} ${amount}`,
      status,
      icon,
      receipt: tx.receipt || null,
      isCrypto: (tx.type as any) === "crypto",
    };
  }

  result.reference = tx.reference || "#INT-" + String(tx.id).padStart(6, "0");
  return result;
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
  if (type.toLowerCase().includes("fund")) return "Deposit";
  if (type.toLowerCase().includes("withdrawal")) return "Withdrawal";
  if (type.toLowerCase().includes("crypto")) return "Crypto";
  if (type.toLowerCase().includes("gift")) return "Gift Card";
  return type;
}

function downloadReceipt(tx: Transaction) {
  const secondaryAmount = (tx as any).amountSecondary ? " (" + (tx as any).amountSecondary + ")" : "";
  const receiptContent = [
    "CASH CONNECT RECEIPT",
    "-----------------------------",
    "Transaction ID: " + tx.id,
    "Date: " + tx.date + " " + (tx.time || ""),
    "Type: " + tx.type,
    "Amount: " + tx.amountPrimary + secondaryAmount,
    "Status: " + tx.status.toUpperCase(),
    "-----------------------------",
    "Thank you for using Cash Connect!"
  ].join("\n");

  const blob = new Blob([receiptContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Receipt_" + tx.id + ".txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

import TransactionDetailModal from "./TransactionDetailModal";

function getGreeting(): string {
  try {
    const lagosTimeStr = new Date().toLocaleString("en-US", {
      timeZone: "Africa/Lagos",
      hour: "numeric",
      hour12: false,
    });
    const hour = parseInt(lagosTimeStr, 10);
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    return "Good Evening";
  } catch (e) {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    return "Good Evening";
  }
}

// ----------------------------------------------------------------
// Component
// ----------------------------------------------------------------

export default function HistoryPageContent() {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const user = useAuthStore((s: { user: User | null }) => s.user);
  const name = getFirstName(user?.fullname);

  const { transactions, isLoading, error, fetchTransactions } =
    useTransactionStore();

  const searchParams = useSearchParams();
  const txId = searchParams.get("txId");

  useEffect(() => {
    fetchTransactions(true); // Force load newest list
  }, [fetchTransactions]);

  useEffect(() => {
    if (txId && transactions.length > 0) {
      const rawTx = transactions.find((t: any) => String(t.id) === String(txId));
      if (rawTx) {
        setSelectedTx(mapTransaction(rawTx));
      }
    }
  }, [txId, transactions]);

  const allItems = transactions
    .filter((tx: any) => {
      // Exclude expected payouts with no receipt
      if (tx.type === "international" && !tx.receipt && (!tx.international || !tx.international.receipt)) {
        return false;
      }
      return true;
    })
    .map(mapTransaction);

  const filteredItems = allItems.filter((item: Transaction) => {
    const matchesStatus = filter === "all" || item.status === filter;

    const matchesSearch =
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.amountPrimary.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const filterControls = (
    <div className="flex justify-end mb-6">
      <div className="flex items-center gap-[11px] w-full lg:w-[435px] h-[49px]">
        {/* Filter */}
        <div className="relative h-full">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="cursor-pointer h-full px-4 rounded-full border border-slate-200 flex items-center gap-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            <Filter className="h-4 w-4" />
            <span className="capitalize">{filter === "all" ? "Filter" : filter}</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                showFilterDropdown ? "rotate-180" : ""
              }`}
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
                    className={`cursor-pointer w-full text-left px-4 py-2.5 rounded-lg text-[13px] font-medium transition capitalize ${
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
  );

  return (
    <>
      {/* DESKTOP */}
      <div className="hidden lg:block w-full max-w-7xl mx-auto px-4 py-6">
        {filterControls}

        <div className="rounded-[18px] bg-white border border-slate-100 shadow-[0_18px_50px_rgba(15,23,42,0.06)] p-6">
          {!isLoading && !error && filteredItems.length > 0 ? (
            <TransactionsTable items={filteredItems} onSelect={setSelectedTx} />
          ) : !isLoading && !error && filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-[14px] text-slate-400 text-center">
                {searchQuery || filter !== "all"
                  ? "No transactions found matching your criteria"
                  : "No transactions available"}
              </p>
              {(searchQuery || filter !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilter("all");
                  }}
                  className="mt-3 text-[13px] text-emerald-600 font-medium hover:underline cursor-pointer"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden px-0 pb-8">
        <p className="mt-6 mb-4 text-[18px] text-[#030319] px-4">
          {getGreeting()}, {name}! 👋
        </p>

        <div className="px-4">{filterControls}</div>

        <div className="bg-white rounded-[18px] border border-slate-100 shadow-sm overflow-hidden mx-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((tx: Transaction, idx: number) => (
              <div
                key={tx.id}
                onClick={() => setSelectedTx(tx)}
                className={`cursor-pointer flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50/60 transition ${idx < filteredItems.length - 1 ? "border-b border-slate-100" : ""}`}
              >
                {/* Icon */}
                <div className="shrink-0">
                  {isCredit(tx.icon) ? (
                    <div className="h-9 w-9 rounded-full bg-emerald-50 flex items-center justify-center">
                      <ArrowUpCircle className="h-5 w-5 text-emerald-500" />
                    </div>
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-rose-50 flex items-center justify-center">
                      <ArrowDownCircle className="h-5 w-5 text-rose-400" />
                    </div>
                  )}
                </div>

                {/* Type + ID */}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-slate-800 truncate">{shortType(tx.type)}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">{tx.reference}</p>
                </div>

                {/* Status badge */}
                <span className={[
                  "text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize shrink-0",
                  tx.status === "successful" ? "bg-emerald-50 text-emerald-600" :
                  tx.status === "pending" ? "bg-amber-50 text-amber-600" :
                  "bg-rose-50 text-rose-500"
                ].join(" ")}>
                  {tx.status}
                </span>

                {/* View button */}
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedTx(tx); }}
                  className="h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition cursor-pointer shrink-0"
                  title="View Details"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-[14px] text-slate-400 text-center">
                {searchQuery || filter !== "all"
                  ? "No transactions found matching your criteria"
                  : "No transactions available"}
              </p>
              {(searchQuery || filter !== "all") && (
                <button
                  onClick={() => { setSearchQuery(""); setFilter("all"); }}
                  className="mt-3 text-[13px] text-emerald-600 font-medium hover:underline cursor-pointer"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <TransactionDetailModal
        isOpen={selectedTx !== null}
        onClose={() => {
          setSelectedTx(null);
          if (typeof window !== "undefined") {
            const url = new URL(window.location.href);
            url.searchParams.delete("txId");
            window.history.replaceState({}, "", url.toString());
          }
        }}
        tx={selectedTx}
      />
    </>
  );
}
