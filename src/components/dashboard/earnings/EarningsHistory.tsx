"use client";

import { earningHistory } from "./earnings.data";
import EarningsHistoryRow from "./EarningsHistoryRow";

export default function EarningsHistory() {
  return (
    <div className="bg-[#F4EEDC] border border-[#E7D9A8] rounded-[20px] p-5">
      {/* MOBILE SCROLL WRAPPER */}
      <div className="w-full overflow-x-auto lg:overflow-visible">
        <div className="min-w-[700px] lg:min-w-0">
          {/* HEADER */}
          <div
            className="
              grid
              grid-cols-[1.5fr_1fr_1fr_1.4fr_0.8fr]
              text-[11px] lg:text-[12px]
              text-slate-500
              mb-3
              px-2
            "
          >
            <p>Activity Type</p>
            <p>Earnings</p>
            <p>Date Earned</p>
            <p>Expiry Date/Time</p>
            <p>Status</p>
          </div>

          {/* ROWS */}
          <div className="flex flex-col gap-3">
            {earningHistory.map((item, i) => (
              <EarningsHistoryRow key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
