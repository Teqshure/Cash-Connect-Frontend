"use client";

// ─────────────────────────────────────────────────────────────────────────────
// CancelTradeModal
// ─────────────────────────────────────────────────────────────────────────────

type CancelTradeProps = {
  open: boolean;
  onNo: () => void;
  onYesCancel: () => void;
  loading?: boolean;
};

export function CancelTradeModal({
  open,
  onNo,
  onYesCancel,
  loading = false,
}: CancelTradeProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center px-4 bg-black/30">
      <div className="w-full max-w-[360px] bg-white rounded-[24px] px-8 py-10 text-center shadow-xl">
        <div className="mx-auto h-14 w-14 rounded-full border-2 border-red-300 grid place-items-center mb-4">
          <span className="text-[22px] font-bold text-red-500">!</span>
        </div>
        <h3 className="text-[18px] font-semibold text-slate-900">
          Cancel Trade
        </h3>
        <p className="mt-2 text-[13px] text-slate-500 leading-6">
          This action cannot be reversed. Are you sure you want to cancel this
          trade?
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={onNo}
            className="flex-1 h-[44px] rounded-[12px] bg-emerald-600 text-white font-semibold text-[14px] hover:brightness-110 transition cursor-pointer disabled:opacity-50"
          >
            No
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={onYesCancel}
            className="flex-1 h-[44px] rounded-[12px] border border-slate-300 text-slate-700 font-semibold text-[14px] hover:bg-slate-50 transition cursor-pointer disabled:opacity-50"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TransferWarningModal - FIXED VERSION
// ─────────────────────────────────────────────────────────────────────────────

type TransferWarningProps = {
  open: boolean;
  amount: number;
  onBack: () => void;
  onContinue: () => void;
  loading?: boolean;
};

export function TransferWarningModal({
  open,
  amount,
  onBack,
  onContinue,
  loading = false,
}: TransferWarningProps) {
  if (!open) return null;

  // ✅ Safety check for NaN or invalid amount
  const isValidAmount = !isNaN(amount) && amount > 0;
  const displayAmount = isValidAmount ? amount.toLocaleString() : "0";

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center px-4 bg-black/30">
      <div className="w-full max-w-[360px] bg-white rounded-[24px] px-8 py-10 text-center shadow-xl">
        <div className="mx-auto h-14 w-14 rounded-[16px] bg-orange-50 grid place-items-center mb-4">
          <span className="text-[28px]">⚠️</span>
        </div>
        <h3 className="text-[18px] font-semibold text-slate-900">
          Transfer Warning!
        </h3>
        <p className="mt-2 text-[13px] text-slate-500 leading-6">
          ₦{displayAmount} will be deducted from your Cash Connect balance for
          this purchase.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={onBack}
            className="flex-1 h-[44px] rounded-[12px] border border-slate-300 text-slate-700 font-semibold text-[14px] hover:bg-slate-50 transition cursor-pointer disabled:opacity-50"
          >
            Back
          </button>

          <button
            type="button"
            disabled={loading || !isValidAmount}
            onClick={onContinue}
            className="flex-1 h-[44px] rounded-[12px] bg-emerald-600 text-white font-semibold text-[14px] hover:brightness-110 transition cursor-pointer disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
