"use client";

import { useState } from "react";
import { X, Download, AlertCircle, CheckCircle2 } from "lucide-react";
import { Order } from "./orders.types";
import { jsPDF } from "jspdf";

type OrderDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
};

export default function OrderDetailModal({
  isOpen,
  onClose,
  order,
}: OrderDetailModalProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPin, setCopiedPin] = useState(false);

  if (!isOpen || !order) return null;

  const getBaseUrl = () => {
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      if (host.includes("localhost") || host.includes("127.0.0.1")) {
        return "http://localhost:8000";
      }
    }
    return "https://api.cashconnectworld.com";
  };
  const apiBaseUrl = getBaseUrl();

  const getBrandImageUrl = (imagePath: string | null | undefined) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    return `${apiBaseUrl}/storage/${imagePath}`;
  };

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(0, 122, 77);
      doc.text("CASH CONNECT", 105, 30, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text("Gift Card Order Receipt", 105, 38, { align: "center" });

      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(20, 45, 190, 45);

      doc.setFontSize(26);
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.text(order.amount, 105, 62, { align: "center" });

      doc.setFontSize(11);
      const startY = 82;
      const rowHeight = 12;

      const fields = [
        { label: "Order ID", value: order.id },
        { label: "Date & Time", value: order.date },
        { label: "Card Type", value: order.type },
        { label: "Denomination", value: order.card },
        { label: "Quantity", value: String(order.quantity ?? 1) },
        { label: "Status", value: (order.status ?? "successful").toUpperCase() },
      ];

      if (order.cardCode) {
        fields.push({ label: "Card Code", value: order.cardCode });
      }
      if (order.cardPin) {
        fields.push({ label: "Card PIN", value: order.cardPin });
      }

      fields.forEach((field, i) => {
        const y = startY + i * rowHeight;
        doc.setFont("helvetica", "bold");
        doc.setTextColor(100, 116, 139);
        doc.text(field.label, 25, y);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(15, 23, 42);
        if (field.label === "Status") {
          const statusLower = (order.status ?? "successful").toLowerCase();
          if (statusLower === "successful" || statusLower === "completed" || statusLower === "approved") {
            doc.setTextColor(16, 185, 129);
          } else if (statusLower === "failed" || statusLower === "rejected") {
            doc.setTextColor(239, 68, 68);
          } else {
            doc.setTextColor(245, 158, 11);
          }
        }
        doc.text(field.value, 185, y, { align: "right" });

        doc.setDrawColor(241, 245, 249);
        doc.setLineWidth(0.3);
        doc.line(20, y + 5, 190, y + 5);
      });

      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text("Thank you for choosing Cash Connect!", 105, startY + fields.length * rowHeight + 15, { align: "center" });

      doc.save(`Receipt_CashConnect_${order.id}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    }
  };

  const isApproved =
    order.status === "completed" ||
    order.status === "approved" ||
    order.status === "successful";

  const isFailed = order.status === "failed" || order.status === "rejected";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-[24px] w-full max-w-md p-8 shadow-xl animate-in fade-in zoom-in-95 duration-200 overflow-y-auto max-h-[85vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[17px] font-semibold text-slate-800">Order Details</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Brand logo / Amount hero */}
        <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100">
          <div className="mb-4">
            {order.brandImage ? (
              <div className="h-16 w-16 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center relative p-1">
                <img
                  src={getBrandImageUrl(order.brandImage)}
                  alt={order.type}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : (
              <div className="h-16 w-16 rounded-2xl bg-emerald-50 border border-emerald-100 overflow-hidden flex items-center justify-center relative text-emerald-600 font-bold text-xl">
                {order.type.charAt(4) || "G"}
              </div>
            )}
          </div>
          <p className="text-[14px] text-slate-500 font-medium">{order.type}</p>
          <p className="text-[28px] font-bold text-slate-900 mt-1">{order.amount}</p>
        </div>

        {/* Info Rows */}
        <div className="py-5 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-[13px] text-slate-500 font-medium">Order ID</span>
            <span className="text-[13px] text-slate-800 font-semibold font-mono">{order.id}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[13px] text-slate-500 font-medium">Date & Time</span>
            <span className="text-[13px] text-slate-800 font-semibold">{order.date}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[13px] text-slate-500 font-medium">Card Value</span>
            <span className="text-[13px] text-slate-800 font-semibold">{order.card}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[13px] text-slate-500 font-medium">Quantity</span>
            <span className="text-[13px] text-slate-800 font-semibold">{order.quantity ?? 1}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[13px] text-slate-500 font-medium">Status</span>
            <span
              className={[
                "text-[11px] font-bold px-2.5 py-0.75 rounded-full capitalize",
                isApproved
                  ? "bg-emerald-50 text-emerald-600"
                  : isFailed
                  ? "bg-rose-50 text-rose-500"
                  : "bg-amber-50 text-amber-600",
              ].join(" ")}
            >
              {order.status ?? "pending"}
            </span>
          </div>

          {/* Show Code and PIN if approved */}
          {isApproved && (
            <div className="mt-2 space-y-3">
              {order.cardCode && (
                <div className="flex flex-col gap-1.5 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Card Code / Number</span>
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-mono font-semibold text-slate-800 select-all">{order.cardCode}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(order.cardCode!);
                        setCopiedCode(true);
                        setTimeout(() => setCopiedCode(false), 2000);
                      }}
                      className="text-[11px] text-emerald-600 font-bold hover:text-emerald-700 cursor-pointer"
                    >
                      {copiedCode ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              )}
              {order.cardPin && (
                <div className="flex flex-col gap-1.5 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Card PIN</span>
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-mono font-semibold text-slate-800 select-all">{order.cardPin}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(order.cardPin!);
                        setCopiedPin(true);
                        setTimeout(() => setCopiedPin(false), 2000);
                      }}
                      className="text-[11px] text-emerald-600 font-bold hover:text-emerald-700 cursor-pointer"
                    >
                      {copiedPin ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
          <button
            onClick={handleDownloadPDF}
            className="w-full h-12 rounded-xl bg-emerald-600 text-white font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-emerald-700 transition cursor-pointer"
          >
            <Download className="h-4 w-4" />
            Download PDF Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
