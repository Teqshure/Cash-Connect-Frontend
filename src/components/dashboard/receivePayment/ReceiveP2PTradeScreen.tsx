"use client";

import { useEffect, useState } from "react";
import { 
  Clock, 
  Copy, 
  Check, 
  Upload, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Trash2
} from "lucide-react";
import { useGlobalPaymentStore } from "@/store/globalPayment";
import { useRouter } from "next/navigation";

// Countdown Timer inside P2P trade session
function P2PTimer({ expiresAt, onExpire }: { expiresAt: string; onExpire?: () => void }) {
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
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
      isExpired 
        ? "bg-rose-50 text-rose-600 border-rose-100" 
        : "bg-amber-50 text-amber-600 border-amber-100 animate-pulse"
    }`}>
      <Clock className="h-4 w-4 shrink-0" />
      <span className="font-mono font-bold text-sm">{timeLeft}</span>
    </div>
  );
}

type Props = {
  tx: {
    transaction_id: string | number;
    expected_amount: string;
    you_will_receive: string;
    expires_at: string;
    account: any;
  };
  onCancel: () => void;
  onComplete: () => void;
};

export default function ReceiveP2PTradeScreen({ tx, onCancel, onComplete }: Props) {
  const router = useRouter();
  const { uploadReceipt, cancelTransaction } = useGlobalPaymentStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    triggerToast("Copied successfully!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError("");
    }
  };

  const handleTransferred = async () => {
    if (!file) {
      setError("Please select/upload your payment receipt first.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      await uploadReceipt(tx.transaction_id, file);
      onComplete();
    } catch (err: any) {
      setError(err.message || "Failed to submit receipt. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handlePayLater = () => {
    setShowSavedModal(true);
  };

  const handleCancelTrade = () => {
    setShowCancelModal(true);
  };

  const performCancelTrade = async () => {
    setShowCancelModal(false);
    setUploading(true);
    setError("");
    try {
      await cancelTransaction(String(tx.transaction_id));
      triggerToast("Session cancelled successfully.");
      setTimeout(() => {
        onCancel();
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Failed to cancel transaction.");
    } finally {
      setUploading(false);
    }
  };

  const account = tx.account || {};
  const isVenmo = account.payment_method?.name?.toLowerCase().includes("venmo") || account.username?.includes("venmo");
  const isCashApp = account.payment_method?.name?.toLowerCase().includes("cash app") || account.username?.includes("cashapp");

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 space-y-6">
      {/* P2P Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
            <h2 className="text-[16px] font-bold text-slate-800">Active Trade Session</h2>
          </div>
          <P2PTimer expiresAt={tx.expires_at} onExpire={() => {
            alert("Session expired! Please start a new expected payment transaction.");
            onCancel();
          }} />
        </div>

        <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-800 rounded-2xl text-[12px] font-medium border border-emerald-100">
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>Your funds are protected. Make payment to the details below within 48 hours.</span>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-between px-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
        <span className="text-emerald-500 flex items-center gap-1">1. Created <Check className="h-3 w-3" /></span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-amber-500 flex items-center gap-1">2. Send Money <Clock className="h-3 w-3" /></span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-slate-400">3. Release Funds</span>
      </div>

      {/* Payout Amounts */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm grid grid-cols-2 gap-4">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Amount to Send</span>
          <p className="text-lg font-bold text-slate-800 mt-1">{tx.expected_amount}</p>
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Amount to Receive</span>
          <p className="text-lg font-bold text-emerald-600 mt-1">{tx.you_will_receive}</p>
        </div>
      </div>

      {/* Admin Payment Account Details */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800">Send Payment to Details Below:</h3>
        
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col gap-3">
          {account.account_name && (
            <div className="flex items-center justify-between text-xs gap-3">
              <span className="text-slate-500">Account Name:</span>
              <button 
                onClick={() => handleCopy(account.account_name, "name")}
                className="flex items-center gap-1 font-semibold text-slate-800 hover:text-emerald-600 transition"
              >
                <span>{account.account_name}</span>
                {copiedId === "name" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3 text-slate-400" />}
              </button>
            </div>
          )}

          {account.email && (
            <div className="flex items-center justify-between text-xs gap-3">
              <span className="text-slate-500">Email Address:</span>
              <button 
                onClick={() => handleCopy(account.email, "email")}
                className="flex items-center gap-1 font-semibold text-slate-800 hover:text-emerald-600 transition font-mono"
              >
                <span>{account.email}</span>
                {copiedId === "email" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3 text-slate-400" />}
              </button>
            </div>
          )}

          {account.account_number && (
            <div className="flex items-center justify-between text-xs gap-3">
              <span className="text-slate-500">Account / IBAN:</span>
              <button 
                onClick={() => handleCopy(account.account_number, "number")}
                className="flex items-center gap-1 font-semibold text-slate-800 hover:text-emerald-600 transition font-mono"
              >
                <span>{account.account_number}</span>
                {copiedId === "number" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3 text-slate-400" />}
              </button>
            </div>
          )}

          {account.bank_name && (
            <div className="flex items-center justify-between text-xs gap-3">
              <span className="text-slate-500">Bank Name:</span>
              <span className="font-semibold text-slate-800">{account.bank_name}</span>
            </div>
          )}

          {account.username && (
            <div className="flex items-center justify-between text-xs gap-3">
              <span className="text-slate-500">{isCashApp ? "Cashtag" : isVenmo ? "Venmo Username" : "Username"}:</span>
              <button 
                onClick={() => handleCopy(account.username, "tag")}
                className="flex items-center gap-1 font-semibold text-slate-800 hover:text-emerald-600 transition font-mono"
              >
                <span>{account.username}</span>
                {copiedId === "tag" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3 text-slate-400" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Uploader Box */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Step 3: Upload Proof of Transfer</span>

        <div className="flex flex-col gap-2">
          <input
            type="file"
            accept="image/*,application/pdf"
            id="p2p-file-upload"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
          <label 
            htmlFor="p2p-file-upload"
            className="w-full min-h-[100px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 p-4 text-center cursor-pointer hover:bg-slate-50/50 transition"
          >
            <Upload className="h-6 w-6 text-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-600">
              {file ? file.name : "Click to select Receipt / Screenshot"}
            </span>
            <span className="text-[10px] text-slate-400">JPG, PNG or PDF up to 5MB</span>
          </label>
        </div>

        {error && (
          <p className="text-xs font-semibold text-rose-500 flex items-center gap-1">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <button
          onClick={handleTransferred}
          disabled={!file || uploading}
          className="w-full h-12 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed shadow-md shadow-emerald-100"
        >
          {uploading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
          ) : (
            <CheckCircle2 className="h-4 w-4" />
          )}
          <span>Transferred, Notify Admin</span>
        </button>

        <button
          onClick={handlePayLater}
          disabled={uploading}
          className="w-full h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition"
        >
          I Will Pay Later (Save Session)
        </button>

        <button
          onClick={handleCancelTrade}
          disabled={uploading}
          className="w-full h-12 rounded-xl hover:bg-rose-50 text-rose-600 border border-rose-100 font-bold text-sm transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-75"
        >
          <Trash2 className="h-4 w-4" />
          <span>Cancel expected payment</span>
        </button>
      </div>

      {showSavedModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[24px] shadow-2xl p-8 max-w-sm w-full text-center flex flex-col items-center animate-in zoom-in-95 duration-200 border border-slate-100 max-h-[85vh] overflow-y-auto">
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mb-5 animate-pulse">
              <ShieldCheck className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-[17px] font-bold text-slate-800 mb-2">
              Session Bookmarked!
            </h3>
            <p className="text-[13px] text-slate-500 mb-6 px-3 leading-relaxed">
              Your expected payment session is active for 48 hours. You can resume this session and upload your receipt anytime under the <span className="font-bold text-slate-800">Payouts</span> tab.
            </p>
            <button
              onClick={() => {
                setShowSavedModal(false);
                router.push("/payouts");
              }}
              className="w-full py-3 bg-[#00B86B] hover:bg-[#009b5a] text-white font-bold rounded-xl text-sm transition cursor-pointer shadow-sm"
            >
              Go to Payouts
            </button>
          </div>
        </div>
      )}

      {showCancelModal && (
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
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
              >
                No, Keep
              </button>
              <button
                onClick={performCancelTrade}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition cursor-pointer"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-[110] bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
