"use client";

import { TrendingUp, TrendingDown, Repeat } from "lucide-react";

type Stat = {
  label: string;
  value: string;
  change: string;
  tone: "up" | "down";
  icon: React.ElementType;
};

const stats: Stat[] = [
  {
    label: "Income",
    value: "₦450,000",
    change: "+12.5%",
    tone: "up",
    icon: TrendingUp,
  },
  {
    label: "Expenses",
    value: "₦150,000",
    change: "-8.2%",
    tone: "down",
    icon: TrendingDown,
  },
  {
    label: "Transactions",
    value: "127",
    change: "+23%",
    tone: "up",
    icon: Repeat,
  },
];

export default function AccountStatsWidget() {
  return (
    <section className="rounded-[18px] bg-white border border-slate-100 shadow-[0_18px_50px_rgba(15,23,42,0.06)] w-[227px] p-4 mb-4">
      <div className="space-y-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-1 rounded-lg transition-colors duration-150"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-[#EEF2F6] grid place-items-center">
                  <Icon
                    className={[
                      "h-4 w-4",
                      s.label === "Income"
                        ? "text-[#10B981]"
                        : s.label === "Expenses"
                          ? "text-[#EF4444]"
                          : "text-[#6B7280]",
                    ].join(" ")}
                  />
                </div>

                <div>
                  <p className="text-[11px] text-[#64748B]">{s.label}</p>
                  <p className="text-[13px] font-semibold text-[#1E293B]">
                    {s.value}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p
                  className={[
                    "text-[11px] font-semibold",
                    s.tone === "up" ? "text-[#10B981]" : "text-[#EF4444]",
                  ].join(" ")}
                >
                  {s.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
