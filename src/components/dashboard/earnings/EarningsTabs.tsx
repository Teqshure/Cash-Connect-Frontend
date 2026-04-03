"use client";

type Props = {
  active: "spots" | "history";
  setActive: (v: "spots" | "history") => void;
};

export default function EarningsTabs({ active, setActive }: Props) {
  return (
    <div className="w-full max-w-[830px] mx-auto mb-4">
      <div className="flex bg-[#F4EEDC] border border-[#E7D9A8] rounded-[20px] p-1">
        <button
          onClick={() => setActive("spots")}
          className={`
            flex-1 py-2 rounded-[14px] cursor-pointer text-sm font-medium transition
            ${
              active === "spots"
                ? "bg-white shadow-sm text-slate-800"
                : "text-slate-500"
            }
          `}
        >
          Earning Spots
        </button>

        <button
          onClick={() => setActive("history")}
          className={`
            flex-1 py-2 rounded-[14px] cursor-pointer text-sm font-medium transition
            ${
              active === "history"
                ? "bg-white shadow-sm text-slate-800"
                : "text-slate-500"
            }
          `}
        >
          Earning History
        </button>
      </div>
    </div>
  );
}
