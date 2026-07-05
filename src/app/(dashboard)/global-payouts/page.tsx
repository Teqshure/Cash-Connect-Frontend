"use client";

import { useEffect, useState } from "react";
import { useGlobalPaymentStore } from "@/store/globalPayment";
import { 
  Globe, 
  Copy, 
  Check, 
  Upload, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  ExternalLink
} from "lucide-react";
import { useRouter } from "next/navigation";

// Countdown timer helper with requested format: 2159h : 47m : 22s
function CountdownTimer({ expiresAt, onExpire }: { expiresAt: string; onExpire?: () => void }) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const target = new Date(expiresAt).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        setIsExpired(true);
        onExpire?.();
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h : ${minutes}m : ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shrink-0 whitespace-nowrap ${
      isExpired 
        ? "bg-rose-50 text-rose-600 border border-rose-100" 
        : "bg-amber-50 text-amber-600 border border-amber-100"
    }`}>
      <Clock className="h-3.5 w-3.5 shrink-0 text-amber-500" />
      <span className="font-mono font-bold text-xs">{timeLeft}</span>
    </div>
  );
}

// Sub-component for individual Global Payout Card
function GlobalPayoutCard({ 
  tx, 
  copiedId, 
  uploadingId, 
  onCopy, 
  onUpload, 
  onCancelClick,
  onDeleteClick
}: {
  tx: any;
  copiedId: string | null;
  uploadingId: string | number | null;
  onCopy: (text: string, id: string) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>, id: string | number) => void;
  onCancelClick: (id: string | number) => void;
  onDeleteClick: (id: string | number) => void;
}) {
  const [isReplacing, setIsReplacing] = useState(false);
  const hasReceipt = !!tx.receipt;
  const isPending = tx.status === "pending";
  const isProcessing = tx.status === "processing";
  const isExpired = tx.status === "expired";
  const isRejected = tx.status === "rejected";
  
  const method = tx.payment_method?.name || "Global Payout";
  const account = tx.account || {};
  const currency = account.currency || "USD";
  const expectedAmountStr = `${currency} ${parseFloat(tx.expected_amount).toFixed(2)}`;
  const nairaStr = `₦${parseFloat(tx.fiat_equivalent).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Build dynamic display label
  let statusLabel = "WAITING FOR RECEIPT";
  let statusStyle = "bg-amber-50 text-amber-600 border border-amber-100";
  if (isProcessing) {
    statusLabel = "VERIFYING DEPOSIT";
    statusStyle = "bg-blue-50 text-blue-600 border border-blue-100";
  } else if (isExpired) {
    statusLabel = "EXPIRED";
    statusStyle = "bg-rose-50 text-rose-500 border border-rose-100";
  } else if (isRejected) {
    statusLabel = "CANCELLED";
    statusStyle = "bg-slate-100 text-slate-500 border border-slate-200";
  }

  const isCashApp = method.toLowerCase().includes("cash app");

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col gap-4 relative overflow-hidden transition hover:shadow-md">
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100/60 pb-3">
        <div className="flex items-center gap-2 min-w-0">
          {/* Small Payment Icon */}
          <div className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-[9px] shrink-0">
            {method.charAt(0)}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-slate-800 text-xs truncate">{method}</span>
            <span className="text-[9px] text-slate-400 font-mono truncate">Ref: {tx.transaction?.reference || tx.id}</span>
          </div>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wider shrink-0 whitespace-nowrap ${statusStyle}`}>
          {statusLabel}
        </span>
      </div>

      {/* Countdown Timer Row (for Pending sessions) - Stacked with row display for maximum width */}
      {isPending && !hasReceipt && tx.expires_at && (
        <div className="flex items-center justify-between bg-amber-50/30 rounded-2xl p-3 border border-amber-100/40 text-xs gap-3">
          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider whitespace-nowrap">Expires In:</span>
          <CountdownTimer expiresAt={tx.expires_at} />
        </div>
      )}

      {/* Row-by-Row amounts to prevent side-by-side layout squeezing */}
      <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 space-y-2.5">
        <div className="flex justify-between items-center text-xs">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">EXPECTED TRANSFER</span>
          <span className="font-extrabold text-slate-800 text-sm whitespace-nowrap">{expectedAmountStr}</span>
        </div>
        <div className="flex justify-between items-center text-xs border-t border-slate-100 pt-2.5">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">WALLET PAYOUT</span>
          <span className="font-extrabold text-emerald-600 text-sm whitespace-nowrap">{nairaStr}</span>
        </div>
      </div>

      {/* Always Visible, Stacked Funding Account Details to prevent clipping */}
      <div className="bg-slate-50/30 border border-slate-100 rounded-2xl p-4 space-y-3.5">
        <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider block">Funding Details</span>
        
        {account.account_name && (
          <div className="space-y-0.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Account Name</span>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-800 break-all">{account.account_name}</span>
              <button 
                onClick={() => onCopy(account.account_name, `${tx.id}-name`)} 
                className="shrink-0 p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition"
              >
                {copiedId === `${tx.id}-name` ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        )}
        
        {account.email && (
          <div className="space-y-0.5 border-t border-slate-100 pt-2">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Email Address</span>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-850 font-mono break-all">{account.email}</span>
              <button 
                onClick={() => onCopy(account.email, `${tx.id}-email`)} 
                className="shrink-0 p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition"
              >
                {copiedId === `${tx.id}-email` ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        )}

        {account.account_number && (
          <div className="space-y-0.5 border-t border-slate-100 pt-2">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Account Number / IBAN</span>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-850 font-mono break-all">{account.account_number}</span>
              <button 
                onClick={() => onCopy(account.account_number, `${tx.id}-num`)} 
                className="shrink-0 p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition"
              >
                {copiedId === `${tx.id}-num` ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        )}

        {account.bank_name && (
          <div className="space-y-0.5 border-t border-slate-100 pt-2">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Bank Name</span>
            <span className="text-xs font-bold text-slate-800 block break-all">{account.bank_name}</span>
          </div>
        )}

        {account.username && (
          <div className="space-y-0.5 border-t border-slate-100 pt-2">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">{isCashApp ? "Cashtag" : "Username"}</span>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-855 font-mono break-all">{account.username}</span>
              <button 
                onClick={() => onCopy(account.username, `${tx.id}-tag`)} 
                className="shrink-0 p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition"
              >
                {copiedId === `${tx.id}-tag` ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Upload/Receipt Action Section */}
      <div className="mt-auto border-t border-slate-100 pt-3.5 flex flex-col gap-3.5">
        {hasReceipt && !isReplacing ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100/60">
              <div className="flex items-center gap-1.5 min-w-0">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span className="text-[10px] font-bold text-emerald-800 truncate">Receipt submitted</span>
              </div>
              <a 
                href={`${window.location.hostname.includes("localhost") || window.location.hostname.includes("127.0.0.1") ? "http://localhost:8000" : "https://api.cashconnectworld.com"}/storage/${tx.receipt}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 transition flex items-center gap-1 shrink-0"
              >
                <span>View Receipt</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            
            {/* Replace Button */}
            {isProcessing && (
              <button
                onClick={() => setIsReplacing(true)}
                className="w-full h-[40px] border border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-slate-500 hover:bg-slate-50 transition cursor-pointer"
              >
                <Upload className="h-4 w-4 text-emerald-600" />
                <span>Change / Replace Receipt</span>
              </button>
            )}
          </div>
        ) : isExpired ? (
          <div className="p-3 bg-rose-50/40 rounded-2xl border border-rose-100 text-center">
            <p className="text-[10px] font-bold text-rose-700">Payment window expired.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                {isReplacing ? "Select New Proof of Payment:" : "Proof of payment (JPG, PNG or PDF):"}
              </span>
              {isReplacing && (
                <button
                  onClick={() => setIsReplacing(false)}
                  className="text-[9px] font-bold text-rose-500 hover:underline cursor-pointer"
                >
                  Cancel Change
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*,application/pdf"
                id={`file-${tx.id}`}
                className="hidden"
                onChange={async (e) => {
                  await onUpload(e, tx.id);
                  setIsReplacing(false);
                }}
                disabled={uploadingId === tx.id}
              />
              <label 
                htmlFor={`file-${tx.id}`}
                className="flex-1 h-[40px] border border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-slate-500 hover:bg-slate-50 transition cursor-pointer"
              >
                <Upload className="h-4 w-4 text-emerald-600" />
                <span>Upload {isReplacing ? "New Receipt" : "Receipt"}</span>
              </label>
              {uploadingId === tx.id && (
                <div className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center shrink-0">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Controls for Cancellation and Deletion */}
        <div className="flex flex-col gap-2">
          {/* Cancel Button (Visible for pending expected sessions) */}
          {isPending && !hasReceipt && (
            <button
              onClick={() => onCancelClick(tx.id)}
              className="w-full h-10 rounded-xl hover:bg-rose-50/50 text-rose-600 text-xs font-bold flex items-center justify-center gap-1.5 transition border border-rose-100 cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5 shrink-0" />
              <span>Cancel expected payment</span>
            </button>
          )}

          {/* Delete Button (Visible for cancelled or expired sessions to avoid cluttering) */}
          {(isExpired || isRejected) && (
            <button
              onClick={() => onDeleteClick(tx.id)}
              className="w-full h-10 rounded-xl hover:bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center gap-1.5 transition border border-slate-200 cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5 shrink-0" />
              <span>Delete Session</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GlobalPayoutsPage() {
  const router = useRouter();
  const { transactions, fetchTransactions, uploadReceipt, cancelTransaction, deleteTransaction, loading } = useGlobalPaymentStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | number | null>(null);
  
  // Custom states for visual Modals (No native alerts/confirms!)
  const [cancellingTxId, setCancellingTxId] = useState<string | number | null>(null);
  const [deletingTxId, setDeletingTxId] = useState<string | number | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(fieldId);
    triggerToast("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, txId: string | number) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadingId(txId);

      try {
        await uploadReceipt(txId, file);
        triggerToast("Proof uploaded successfully!");
        fetchTransactions(); // reload lists
      } catch (err: any) {
        triggerToast("Upload failed: " + (err.message || "Failed"));
      } finally {
        setUploadingId(null);
      }
    }
  };

  const performCancel = async (txId: string | number) => {
    try {
      await cancelTransaction(String(txId));
      triggerToast("Payout session cancelled.");
      fetchTransactions();
    } catch (err: any) {
      triggerToast("Failed to cancel: " + err.message);
    }
  };

  const performDelete = async (txId: string | number) => {
    try {
      await deleteTransaction(String(txId));
      triggerToast("Payout session deleted.");
      fetchTransactions();
    } catch (err: any) {
      triggerToast("Failed to delete: " + err.message);
    }
  };

  // Filter expected payment sessions
  const sessions = transactions.filter((tx: any) => 
    tx.status === "pending" || tx.status === "processing" || tx.status === "expired" || tx.status === "rejected"
  );

  return (
    <div className="w-full min-h-[80vh] px-4 py-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-emerald-600">
          <Globe className="h-6 w-6" />
          <h1 className="text-xl lg:text-2xl font-bold text-slate-800">Global Payout Tracker</h1>
        </div>
        <p className="text-xs md:text-sm text-slate-500 max-w-2xl leading-relaxed">
          Manage expected payout sessions. Copy details to pay, and upload the receipt when completed.
        </p>
      </div>

      {loading && sessions.length === 0 ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500" />
          <p className="text-xs text-slate-500 font-medium animate-pulse">Loading expected payments...</p>
        </div>
      ) : sessions.length === 0 ? (
        <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 md:p-12 text-center max-w-md mx-auto mt-6">
          <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="h-8 w-8 text-slate-400" />
          </div>
          <h2 className="text-base md:text-lg font-bold text-slate-800 mb-1">No Active Payout Sessions</h2>
          <p className="text-xs md:text-sm text-slate-500 mb-6">
            You don't have any active expected payment sessions. Go to the dashboard to start a new transaction.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="inline-flex h-[44px] items-center justify-center px-6 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition cursor-pointer"
          >
            Start New Payout
          </button>
        </div>
      ) : (
        // Generous spacing, max 2 columns on desktop to allow wide cards
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {sessions.map((tx: any) => (
            <GlobalPayoutCard
              key={tx.id}
              tx={tx}
              copiedId={copiedId}
              uploadingId={uploadingId}
              onCopy={handleCopy}
              onUpload={handleFileUpload}
              onCancelClick={setCancellingTxId}
              onDeleteClick={setDeletingTxId}
            />
          ))}
        </div>
      )}

      {/* Cancellation Confirmation Modal */}
      {cancellingTxId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] shadow-2xl p-6 max-w-sm w-full text-center flex flex-col items-center border border-slate-100 max-h-[85vh] overflow-y-auto">
            <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-rose-500" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-2">
              Cancel Expected Payout?
            </h3>
            <p className="text-xs text-slate-500 mb-6 px-2 leading-relaxed">
              Are you sure you want to cancel this expected payout session? This action cannot be undone.
            </p>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setCancellingTxId(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
              >
                No, Keep
              </button>
              <button
                onClick={async () => {
                  const id = cancellingTxId;
                  setCancellingTxId(null);
                  await performCancel(id);
                }}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition cursor-pointer"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deletion Confirmation Modal */}
      {deletingTxId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] shadow-2xl p-6 max-w-sm w-full text-center flex flex-col items-center border border-slate-100 max-h-[85vh] overflow-y-auto">
            <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-rose-500" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-2">
              Delete Payout Session?
            </h3>
            <p className="text-xs text-slate-500 mb-6 px-2 leading-relaxed">
              Are you sure you want to delete this expected payout session? This will remove it from your history. This action cannot be undone.
            </p>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setDeletingTxId(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const id = deletingTxId;
                  setDeletingTxId(null);
                  await performDelete(id);
                }}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Premium Self-Dismissing Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-[110] bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
