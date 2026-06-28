"use client";

import { Download } from "lucide-react";
import type { Transaction } from "./TransactionsTable";
import TransactionTypeIcon from "./TransactionTypeIcon";
import TransactionStatusBadge from "./TransactionStatusBadge";

type Props = {
  tx: Transaction;
  onSelect?: (tx: Transaction) => void;
};

export default function TransactionRow({ tx, onSelect }: Props) {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const secondaryAmount = tx.amountSecondary ? " (" + tx.amountSecondary + ")" : "";
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
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onSelect) {
      onSelect(tx);
    } else {
      handleDownload(e);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="grid grid-cols-[120px_1fr_140px_90px_50px] gap-3 items-center py-3 hover:bg-slate-50/60 transition cursor-pointer"
    >
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

      {/* Action */}
      <div className="flex justify-center">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleClick(e);
          }}
          className="h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition cursor-pointer"
          title="View Details"
        >
          <Download className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
