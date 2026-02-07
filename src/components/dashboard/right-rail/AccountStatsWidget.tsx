"use client";

type Stat = {
  label: string;
  value: string;
  change: string;
  tone: "up" | "down";
  icon: string;
};

const stats: Stat[] = [
  {
    label: "Income",
    value: "₦450,000",
    change: "+12.5%",
    tone: "up",
    icon: "↗",
  },
  {
    label: "Expenses",
    value: "₦150,000",
    change: "-8.2%",
    tone: "down",
    icon: "↘",
  },
  {
    label: "Transactions",
    value: "127",
    change: "+23%",
    tone: "up",
    icon: "↺",
  },
];

export default function AccountStatsWidget() {
  return (
    <section className="rounded-[18px] bg-white border border-slate-100 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <div className="space-y-3">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-slate-100 grid place-items-center text-slate-600 text-[12px]">
                {s.icon}
              </div>

              <div>
                <p className="text-[11px] text-slate-500">{s.label}</p>
                <p className="text-[12px] font-semibold text-slate-800">
                  {s.value}
                </p>
              </div>
            </div>

            <p
              className={[
                "text-[10px] font-semibold",
                s.tone === "up" ? "text-emerald-600" : "text-rose-500",
              ].join(" ")}
            >
              {s.change}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
