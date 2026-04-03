"use client";

import { earningSpots } from "./earnings.data";
import EarningsCard from "./EarningsCard";

export default function EarningsSpots() {
  return (
    <div className="bg-[#F4EEDC] border border-[#E7D9A8] rounded-[20px] p-5">
      <p className="text-[14px] font-medium mb-4 text-slate-700">
        📈 Earn Rewards
      </p>

      <div className="flex flex-col gap-3">
        {earningSpots.map((item, i) => (
          <EarningsCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
