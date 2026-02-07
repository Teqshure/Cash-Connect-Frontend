"use client";

type CoinRow = {
  name: string;
  symbol: string;
  price: string;
  change: string;
  tone: "up" | "down";
  badge: "btc" | "eth" | "sol";
};

const coins: CoinRow[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: "₦42,850,000",
    change: "+2.5%",
    tone: "up",
    badge: "btc",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: "₦2,845,000",
    change: "+1.8%",
    tone: "up",
    badge: "eth",
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: "₦145,000",
    change: "-1.5%",
    tone: "down",
    badge: "sol",
  },
];

function Badge({ kind }: { kind: CoinRow["badge"] }) {
  const styles =
    kind === "btc"
      ? "bg-amber-500"
      : kind === "eth"
        ? "bg-emerald-600"
        : "bg-indigo-600";

  const text = kind === "btc" ? "₿" : kind === "eth" ? "Ξ" : "S";

  return (
    <div
      className={[
        "h-8 w-8 rounded-full text-white grid place-items-center text-sm font-bold",
        styles,
      ].join(" ")}
    >
      {text}
    </div>
  );
}

export default function CryptoMarketWidget() {
  return (
    <section className="rounded-[18px] bg-white border border-slate-100 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-semibold text-slate-700">
          Crypto Market
        </p>

        <button
          type="button"
          className="text-[11px] font-medium text-emerald-600 hover:text-emerald-700"
        >
          View All
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {coins.map((c) => (
          <div key={c.symbol} className="flex items-center gap-3">
            <Badge kind={c.badge} />

            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-medium text-slate-700 leading-tight">
                {c.name}
              </p>
              <p className="text-[10px] text-slate-400">{c.symbol}</p>
            </div>

            <div className="text-right">
              <p className="text-[11px] font-semibold text-slate-700">
                {c.price}
              </p>

              <p
                className={[
                  "text-[10px] font-medium",
                  c.tone === "up" ? "text-emerald-600" : "text-rose-500",
                ].join(" ")}
              >
                {c.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
