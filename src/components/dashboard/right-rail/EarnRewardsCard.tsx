"use client";

type RewardItem = {
  label: string;
  value: string;
};

const rewards: RewardItem[] = [
  { label: "Complete KYC Verification", value: "₦500" },
  { label: "Refer 3 Friends", value: "₦1,500" },
  { label: "Make 10 Transactions", value: "₦300" },
];

export default function EarnRewardsCard() {
  return (
    <section
      className="rounded-[18px] w-[227px] h-[297px] flex flex-col shadow-[0_18px_50px_rgba(15,23,42,0.05)]"
      style={{
        background: "linear-gradient(135deg, #FFFBEB 0%, #FFF7ED 100%)",
        borderTop: "0.67px solid #FEE685",
      }}
    >
      {/* Header with padding top 24px */}
      <div className="flex items-center justify-between pt-6 px-4">
        <p className="text-[13px] font-semibold text-slate-800 flex items-center gap-1.5">
          <span className="text-amber-500 text-base">✨</span> Earn Rewards
        </p>

        <button
          type="button"
          className="text-[11px] font-medium text-emerald-600 hover:text-emerald-700 cursor-pointer"
          onClick={() => {
            // Navigate to all rewards page
            window.location.href = "/rewards";
          }}
        >
          View All
        </button>
      </div>

      {/* Inner container - width 190px, height 188px, gap 8px */}
      <div className="flex flex-col w-[190px] mx-auto mt-4 gap-2">
        {rewards.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between w-[190px] h-16 px-3 bg-white rounded-[14px] cursor-pointer hover:shadow-md transition-shadow duration-150"
            style={{
              justifyContent: "space-between",
              background: "#FFFFFF",
            }}
            onClick={() => {
              // Navigate to specific reward detail
              window.location.href = `/rewards/${r.label.toLowerCase().replace(/\s+/g, "-")}`;
            }}
          >
            <p className="text-[12px] text-slate-600">{r.label}</p>
            <p className="text-[12px] font-semibold text-emerald-600">
              {r.value}
            </p>
          </div>
        ))}
      </div>

      {/* Spacer to fill remaining height */}
      <div className="flex-1"></div>
    </section>
  );
}
