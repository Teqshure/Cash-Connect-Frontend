"use client";

import { useState, useEffect } from "react";
import { X, Download, ArrowUpCircle, ArrowDownCircle, Upload, AlertCircle, CheckCircle2 } from "lucide-react";
import { Transaction } from "../overview/TransactionsTable";
import { jsPDF } from "jspdf";
import { useGlobalPaymentStore } from "@/store/globalPayment";
import { useTransactionStore } from "@/store/Transactionstore";

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
  const { uploadReceipt } = useGlobalPaymentStore();
  const uploadTransactionReceipt = useTransactionStore((s: any) => s.uploadTransactionReceipt);
  const fetchUserTransactions = useTransactionStore((s: any) => s.fetchTransactions);

  const [currentTx, setCurrentTx] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPin, setCopiedPin] = useState(false);

  useEffect(() => {
    setCurrentTx(tx);
    setSelectedFile(null);
    setUploadError(null);
    setUploadSuccess(false);
    setCopiedCode(false);
    setCopiedPin(false);
  }, [tx, isOpen]);

  if (!isOpen || !currentTx) return null;

  const isCredit = currentTx.icon === "fund" || currentTx.icon === "gift";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadError(null);
      setUploadSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      let response;
      if (currentTx.isInternational && currentTx.intlId) {
        response = await uploadReceipt(currentTx.intlId, selectedFile);
      } else {
        response = await uploadTransactionReceipt(currentTx.id, selectedFile);
      }
      
      setUploadSuccess(true);
      setSelectedFile(null);
      
      setCurrentTx((prev: any) => ({
        ...prev,
        receipt: response.data?.receipt || response.receipt || "uploaded",
        status: "pending"
      }));

      fetchUserTransactions(true);
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload receipt. Please try again.");
    } finally {
      setUploading(false);
    }
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
      doc.text("Transaction Receipt", 105, 38, { align: "center" });

      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(20, 45, 190, 45);

      doc.setFontSize(26);
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.text(currentTx.amountPrimary, 105, 62, { align: "center" });

      doc.setFontSize(11);
      const startY = 82;
      const rowHeight = 12;

      const fields = [
        { label: "Transaction ID", value: `#${currentTx.id.padStart(8, "0")}` },
        { label: "Transaction Type", value: currentTx.type },
        { label: "Date & Time", value: `${currentTx.date} ${currentTx.time || ""}` },
        { label: "Status", value: currentTx.status.toUpperCase() },
      ];

      if (currentTx.isGiftCard) {
        fields.push(
          { label: "Card Brand", value: currentTx.cardName },
          { label: "Card Value", value: currentTx.cardAmount }
        );
      }

      fields.forEach((field, i) => {
        const y = startY + i * rowHeight;
        doc.setFont("helvetica", "bold");
        doc.setTextColor(100, 116, 139);
        doc.text(field.label, 25, y);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(15, 23, 42);
        if (field.label === "Status") {
          if (currentTx.status === "successful") doc.setTextColor(16, 185, 129);
          else if (currentTx.status === "failed") doc.setTextColor(239, 68, 68);
          else doc.setTextColor(245, 158, 11);
        }
        doc.text(field.value, 185, y, { align: "right" });
        
        doc.setDrawColor(241, 245, 249);
        doc.setLineWidth(0.3);
        doc.line(20, y + 5, 190, y + 5);
      });

      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text("Thank you for choosing Cash Connect!", 105, 150, { align: "center" });

      doc.save(`Receipt_CashConnect_${currentTx.id}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    }
  };

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
  const receiptUrl = currentTx.receipt ? `${apiBaseUrl}/storage/${currentTx.receipt}` : null;
  const isPending = currentTx.status === "pending";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-[24px] w-full max-w-md p-8 shadow-xl animate-in fade-in zoom-in-95 duration-200 overflow-y-auto max-h-[85vh]">
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

        {/* Amount hero */}
        <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100">
          <div className="mb-3">
            {currentTx.isGiftCard && currentTx.brandImage ? (
              <div className="h-16 w-16 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center relative p-1">
                <img
                  src={getBrandImageUrl(currentTx.brandImage)}
                  alt={currentTx.cardName || "Gift Card"}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : isCredit ? (
              <ArrowUpCircle className="h-14 w-14 text-emerald-500" strokeWidth={1.5} />
            ) : (
              <ArrowDownCircle className="h-14 w-14 text-rose-500" strokeWidth={1.5} />
            )}
          </div>
          <p className="text-[14px] text-slate-500 font-medium">{currentTx.type}</p>
          <p className="text-[28px] font-bold text-slate-900 mt-1">{currentTx.amountPrimary}</p>
          {/* Pending international */}
          {currentTx.isInternational && !currentTx.ngnAmount && (
            <p className="mt-2 text-[11px] text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
              ⏳ NGN payout will be shown after payment is verified
            </p>
          )}
        </div>

        {/* Info rows */}
        <div className="py-5 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-[13px] text-slate-500 font-medium">Transaction ID</span>
            <span className="text-[13px] text-slate-800 font-semibold font-mono">
              #{currentTx.id.padStart(8, "0")}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[13px] text-slate-500 font-medium">Date & Time</span>
            <span className="text-[13px] text-slate-800 font-semibold">
              {currentTx.date} {currentTx.time || ""}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[13px] text-slate-500 font-medium">Status</span>
            <span
              className={`text-[12px] font-bold px-3 py-1 rounded-full uppercase ${
                currentTx.status === "successful"
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  : currentTx.status === "failed"
                    ? "bg-rose-50 text-rose-600 border border-rose-100"
                    : "bg-amber-50 text-amber-600 border border-amber-100"
              }`}
            >
              {currentTx.status}
            </span>
          </div>

          {/* International fields */}
          {currentTx.isInternational && currentTx.foreignAmount && (
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-slate-500 font-medium">Amount Sent</span>
              <span className="text-[13px] text-slate-800 font-semibold">{currentTx.foreignAmount}</span>
            </div>
          )}

          {currentTx.isInternational && currentTx.exchangeRate && (
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-slate-500 font-medium">Exchange Rate</span>
              <span className="text-[13px] text-emerald-700 font-bold">{currentTx.exchangeRate}</span>
            </div>
          )}

          {currentTx.isInternational && currentTx.ngnAmount && (
            <div className="flex justify-between items-center pt-2 border-t border-dashed border-emerald-100">
              <span className="text-[13px] text-slate-500 font-medium">NGN Credited to Wallet</span>
              <span className="text-[14px] text-emerald-600 font-extrabold">{currentTx.ngnAmount}</span>
            </div>
          )}

          {/* Gift Card specifics */}
          {currentTx.isGiftCard && (
            <div className="border-t border-slate-100 mt-2 pt-4 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-slate-500 font-medium">Card Brand</span>
                <span className="text-[13px] text-slate-800 font-semibold">{currentTx.cardName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-slate-500 font-medium">Card Value</span>
                <span className="text-[13px] text-slate-800 font-semibold">{currentTx.cardAmount}</span>
              </div>
              {currentTx.quantity && (
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-slate-500 font-medium">Quantity</span>
                  <span className="text-[13px] text-slate-800 font-semibold">{currentTx.quantity}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-slate-500 font-medium">Trade Type</span>
                <span className="text-[12px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100/50">{currentTx.tradeType}</span>
              </div>
              
              {/* Show code, pin and images if approved/successful */}
              {currentTx.status === "successful" && (
                <>
                  {currentTx.cardCode && (
                    <div className="flex flex-col gap-1.5 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Card Code / Number</span>
                      <div className="flex justify-between items-center">
                        <span className="text-[12px] font-mono font-semibold text-slate-800 select-all">{currentTx.cardCode}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(currentTx.cardCode);
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
                  {currentTx.cardPin && (
                    <div className="flex flex-col gap-1.5 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Card PIN</span>
                      <div className="flex justify-between items-center">
                        <span className="text-[12px] font-mono font-semibold text-slate-800 select-all">{currentTx.cardPin}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(currentTx.cardPin);
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
                  {currentTx.cardImages && currentTx.cardImages.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <span className="text-[11px] text-slate-500 font-medium">Uploaded Card Images:</span>
                      <div className="grid grid-cols-2 gap-2">
                        {currentTx.cardImages.map((img: string, idx: number) => (
                          <a
                            key={idx}
                            href={img}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-20 border border-slate-200 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center cursor-pointer hover:border-emerald-500 transition relative"
                          >
                            <img src={img} alt="Gift card" className="max-h-full max-w-full object-contain" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Proof of Payment upload area */}
          {(currentTx.isInternational || currentTx.isCrypto || (currentTx.isGiftCard && currentTx.tradeType === "sell")) && (
            <div className="mt-2 pt-4 border-t border-slate-100 flex flex-col gap-2">
              {receiptUrl ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <span className="text-[12px] font-bold text-emerald-800">Proof of payment uploaded</span>
                    </div>
                    <a
                      href={receiptUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12px] font-semibold text-emerald-600 hover:text-emerald-700 transition underline decoration-2 decoration-emerald-200"
                    >
                      View Receipt
                    </a>
                  </div>
                  {isPending && (
                    <div className="flex flex-col gap-2 mt-1">
                      <label className="text-[11px] font-semibold text-slate-500">Update proof of payment:</label>
                      <div className="flex gap-2">
                        <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} id="reupload-receipt-input" className="hidden" />
                        <label htmlFor="reupload-receipt-input" className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 font-semibold cursor-pointer truncate text-center hover:bg-slate-100 transition">
                          {selectedFile ? selectedFile.name : "Choose new receipt file"}
                        </label>
                        {selectedFile && (
                          <button onClick={handleUpload} disabled={uploading} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 disabled:opacity-75 transition shrink-0 cursor-pointer">
                            {uploading ? "Updating..." : "Update"}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : isPending ? (
                <div className="p-4 border border-dashed border-slate-200 bg-slate-50/50 rounded-xl flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-slate-800">
                    <Upload className="h-4 w-4 text-emerald-600" />
                    <p className="text-xs font-bold">Upload Proof of Payment (Receipt)</p>
                  </div>
                  <p className="text-[10px] text-slate-500">Please upload the transaction screenshot or receipt so we can verify the transaction and credit your wallet.</p>
                  <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} id="upload-receipt-input" className="hidden" />
                  <div className="flex gap-2">
                    <label htmlFor="upload-receipt-input" className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 font-semibold cursor-pointer truncate text-center hover:bg-slate-50 transition">
                      {selectedFile ? selectedFile.name : "Select JPG, PNG or PDF"}
                    </label>
                    {selectedFile && (
                      <button onClick={handleUpload} disabled={uploading} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 disabled:opacity-75 transition shrink-0 cursor-pointer">
                        {uploading ? "Uploading..." : "Upload"}
                      </button>
                    )}
                  </div>
                  {uploadError && <p className="text-[10px] font-semibold text-rose-500 flex items-center gap-1"><AlertCircle className="h-3 w-3 shrink-0" /> {uploadError}</p>}
                </div>
              ) : null}
            </div>
          )}
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
