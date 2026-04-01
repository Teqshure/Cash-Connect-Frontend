"use client";

type Props = {
  open: boolean;
  mode: "buy" | "sell";
  onOk: () => void;
  message?: string;
};

export default function GiftCardSuccessModal({
  open,
  mode,
  onOk,
  message,
}: Props) {
  if (!open) return null;

  const defaultMessages = {
    buy: "🛍 Purchase Successful\nYour gift card will be delivered shortly.",
    sell: "🎁 Gift Card Sold\nYour payment is being processed to your wallet.",
  };

  const displayMessage = message ?? defaultMessages[mode];

  return (
    <div
      className="fixed inset-0 z-[90] grid place-items-center px-4"
      style={{ background: "rgba(0,0,0,0.3)" }}
    >
      <div className="w-full max-w-[360px] bg-white rounded-[24px] px-8 py-10 text-center shadow-xl">
        {/* ICON */}
        <div className="mx-auto h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8Z"
              stroke="#22c55e"
              strokeWidth="1.8"
            />
            <path
              d="M8.5 12.3l2.2 2.2 4.9-5"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* TITLE */}
        <h3 className="mt-5 text-[22px] font-semibold text-emerald-600">
          {mode === "buy" ? "Thanks!" : "Submitted!"}
        </h3>

        {/* MESSAGE */}
        <p className="mt-2 text-[13px] text-slate-500 leading-6 whitespace-pre-line">
          {displayMessage}
        </p>

        {mode === "sell" && (
          <p className="mt-2 text-[11px] text-slate-400">
            You can track the status in your Orders section
          </p>
        )}

        {/* BUTTON */}
        <button
          type="button"
          onClick={onOk}
          className="mt-6 h-[40px] px-8 rounded-[12px] bg-emerald-600 text-white font-semibold text-[14px] hover:brightness-110 transition"
        >
          {mode === "sell" ? "View Orders" : "Ok"}
        </button>
      </div>
    </div>
  );
}
