"use client";

type Props = {
  open: boolean;
  message?: string;
  onClose: () => void;
};

export default function GiftCardFailedModal({
  open,
  message = "Transaction failed. Please try again.",
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-4 bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-[380px] bg-white rounded-[26px] px-8 py-10 text-center shadow-xl">
        {/* ERROR ICON */}
        <div className="mx-auto h-16 w-16 rounded-full bg-red-50 flex items-center justify-center">
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#ef4444" strokeWidth="2" />
            <path
              d="M12 8v5"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16" r="1" fill="#ef4444" />
          </svg>
        </div>

        {/* TITLE */}
        <h3 className="mt-5 text-[22px] font-semibold text-red-600">
          Transaction Failed
        </h3>

        {/* MESSAGE */}
        <p className="mt-2 text-[13px] text-slate-500 leading-6 max-w-[260px] mx-auto">
          {message}
        </p>

        {/* BUTTON */}
        <button
          onClick={onClose}
          className="mt-7 h-[44px] px-10 rounded-[12px] bg-red-500 text-white font-semibold text-[14px] cursor-pointer hover:brightness-110 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
