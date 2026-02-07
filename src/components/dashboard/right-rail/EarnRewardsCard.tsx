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
    <section className="rounded-[18px] bg-[#FFF6E8] p-4 border border-amber-100 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-semibold text-slate-700 flex items-center gap-2">
          <span className="text-amber-500">↗</span> Earn Rewards
        </p>

        <button
          type="button"
          className="text-[11px] font-medium text-emerald-600 hover:text-emerald-700"
        >
          View All
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {rewards.map((r) => (
          <div key={r.label} className="flex items-center justify-between">
            <p className="text-[11px] text-slate-600">{r.label}</p>
            <p className="text-[11px] font-semibold text-emerald-700">
              {r.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
