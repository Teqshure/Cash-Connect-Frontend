"use client";

import { X, Download, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { Transaction } from "../overview/TransactionsTable";
import { jsPDF } from "jspdf";

type TransactionDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tx: Transaction | null;
};

export default function TransactionDetailModal({
  isOpen,
  onClose,
  tx,
}: TransactionDetailModalProps) {
  if (!isOpen || !tx) return null;

  const isCredit = tx.icon === "fund" || tx.icon === "gift";

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(0, 122, 77); // Emerald green (#007A4D)
      doc.text("CASH CONNECT", 105, 30, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139); // Slate 500
      doc.text("Transaction Receipt", 105, 38, { align: "center" });

      // Divider line
      doc.setDrawColor(226, 232, 240); // Slate 200
      doc.setLineWidth(0.5);
      doc.line(20, 45, 190, 45);

      // Transaction Amount
      doc.setFontSize(26);
      doc.setTextColor(15, 23, 42); // Slate 900
      doc.setFont("helvetica", "bold");
      doc.text(tx.amountPrimary, 105, 62, { align: "center" });

      // Details block
      doc.setFontSize(11);
      const startY = 82;
      const rowHeight = 12;

      const fields = [
        { label: "Transaction ID", value: `#${tx.id.padStart(8, "0")}` },
        { label: "Transaction Type", value: tx.type },
        { label: "Date & Time", value: `${tx.date} ${tx.time || ""}` },
        { label: "Status", value: tx.status.toUpperCase() },
      ];

      fields.forEach((field, i) => {
        const y = startY + i * rowHeight;
        
        // Label
        doc.setFont("helvetica", "bold");
        doc.setTextColor(100, 116, 139); // Slate 500
        doc.text(field.label, 25, y);

        // Value
        doc.setFont("helvetica", "normal");
        doc.setTextColor(15, 23, 42); // Slate 900
        if (field.label === "Status") {
          if (tx.status === "successful") doc.setTextColor(16, 185, 129); // Emerald 500
          else if (tx.status === "failed") doc.setTextColor(239, 68, 68); // Red 500
          else doc.setTextColor(245, 158, 11); // Amber 500
        }
        doc.text(field.value, 185, y, { align: "right" });
        
        // Underline row divider
        doc.setDrawColor(241, 245, 249); // Slate 100
        doc.setLineWidth(0.3);
        doc.line(20, y + 5, 190, y + 5);
      });

      // Footer
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184); // Slate 400
      doc.text("Thank you for choosing Cash Connect!", 105, 150, { align: "center" });

      doc.save(`Receipt_CashConnect_${tx.id}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-[24px] w-full max-w-md p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[17px] font-semibold text-slate-800">Transaction Details</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100">
          <div className="mb-3">
            {isCredit ? (
              <ArrowUpCircle className="h-14 w-14 text-emerald-500" strokeWidth={1.5} />
            ) : (
              <ArrowDownCircle className="h-14 w-14 text-rose-500" strokeWidth={1.5} />
            )}
          </div>
          <p className="text-[14px] text-slate-500 font-medium">{tx.type}</p>
          <p className="text-[28px] font-bold text-slate-900 mt-1">{tx.amountPrimary}</p>
        </div>

        {/* Info rows */}
        <div className="py-5 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-[13px] text-slate-500 font-medium">Transaction ID</span>
            <span className="text-[13px] text-slate-800 font-semibold font-mono">
              #{tx.id.padStart(8, "0")}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[13px] text-slate-500 font-medium">Date & Time</span>
            <span className="text-[13px] text-slate-800 font-semibold">
              {tx.date} {tx.time || ""}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[13px] text-slate-500 font-medium">Status</span>
            <span
              className={`text-[12px] font-bold px-3 py-1 rounded-full uppercase ${
                tx.status === "successful"
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  : tx.status === "failed"
                    ? "bg-rose-50 text-rose-600 border border-rose-100"
                    : "bg-amber-50 text-amber-600 border border-amber-100"
              }`}
            >
              {tx.status}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={handleDownloadPDF}
            className="flex-1 h-[48px] rounded-xl bg-emerald-600 text-white font-medium text-[14px] hover:bg-emerald-700 transition flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-emerald-500/10"
          >
            <Download className="h-4 w-4" />
            Download PDF Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
