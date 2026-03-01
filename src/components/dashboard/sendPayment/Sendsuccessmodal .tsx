"use client";

type Props = {
  open: boolean;
  title?: string;
  message?: string;
  onOk: () => void;
};

function SendSuccessModal({
  open,
  title = "Thanks",
  message = "Your payment has been sent and is being verified.",
  onOk,
}: Props) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[90] grid place-items-center px-4"
      style={{ background: "rgba(0,0,0,0.3)" }}
    >
      <div className="w-full max-w-[360px] bg-white rounded-[24px] px-8 py-10 text-center shadow-xl">
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
        <h3 className="mt-5 text-[22px] font-semibold text-emerald-600">
          {title}
        </h3>
        <p className="mt-2 text-[13px] text-slate-500 leading-6">{message}</p>
        <button
          type="button"
          onClick={onOk}
          className="mt-6 h-[40px] px-8 rounded-[12px] bg-emerald-600 text-white font-semibold text-[14px] cursor-pointer"
        >
          Ok
        </button>
      </div>
    </div>
  );
}

export default SendSuccessModal;
