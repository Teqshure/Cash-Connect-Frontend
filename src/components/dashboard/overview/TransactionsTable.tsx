"use client";

import TransactionRow from "./TransactionRow";
import { useTransactionStore } from "@/store/Transactionstore";

export type TransactionStatus = "successful" | "pending" | "failed";

export type TransactionIcon =
  | "crypto"
  | "gift"
  | "fund"
  | "card"
  | "exchange"
  | "send";

export type Transaction = {
  id: string;
  date: string;
  time?: string;
  type: string;
  amountPrimary: string;
  amountSecondary?: string;
  status: TransactionStatus;
  icon: TransactionIcon;
  isInternational?: boolean;
  intlId?: number;
  receipt?: string | null;
  foreignAmount?: string;    // e.g. "$500.00" — original requested currency
  foreignCurrency?: string;  // e.g. "USD"
  exchangeRate?: string;     // e.g. "₦1,600/$" — only populated after approval
  ngnAmount?: string;        // e.g. "₦800,000.00" — only populated after approval
  isGiftCard?: boolean;
  tradeType?: string;
  cardName?: string;
  cardAmount?: string;
  cardCurrency?: string;
  quantity?: number;
  cardCode?: string | null;
  cardPin?: string | null;
  cardImages?: string[];
  brandImage?: string | null;
  isCrypto?: boolean;
  tokenSymbol?: string;
  cryptoAmount?: string;
  walletAddress?: string;
  description?: string | null;
};

type Props = {
  items: Transaction[];
  onSelect?: (tx: Transaction) => void;
};

export default function TransactionsTable({ items, onSelect }: Props) {
  const searchQuery = useTransactionStore((s: any) => s.searchQuery);

  // 🔥 FILTER LOGIC
  const filteredItems = items.filter((tx) => {
    const q = searchQuery.toLowerCase();

    return (
      tx.type.toLowerCase().includes(q) ||
      tx.status.toLowerCase().includes(q) ||
      tx.amountPrimary.toLowerCase().includes(q) ||
      tx.date.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full">
      {/* Header + Result Count */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-[13px] text-slate-500">
          {filteredItems.length} transaction
          {filteredItems.length !== 1 && "s"}
        </p>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[120px_1fr_140px_90px_50px] gap-3 pb-3 border-b border-slate-100">
        <p className="text-[11px] text-slate-400 font-medium pl-3">Date</p>
        <p className="text-[11px] text-slate-400 font-medium">
          Transaction Type
        </p>
        <p className="text-[11px] text-slate-400 font-medium">Amount</p>
        <p className="text-[11px] text-slate-400 font-medium">Status</p>
        <p className="text-[11px] text-slate-400 font-medium text-center">Receipt</p>
      </div>

      {/* Rows */}
      <div className="mt-3">
        {filteredItems.length > 0 ? (
          filteredItems.map((tx) => (
            <TransactionRow key={tx.id} tx={tx} onSelect={onSelect} />
          ))
        ) : (
          <div className="py-10 text-center">
            <p className="text-sm text-slate-400">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
