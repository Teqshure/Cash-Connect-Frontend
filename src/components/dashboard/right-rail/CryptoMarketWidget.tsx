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
      ? "bg-[#F7931A]"
      : kind === "eth"
        ? "bg-[#627EEA]"
        : "bg-[#00FFA3]";

  const text = kind === "btc" ? "₿" : kind === "eth" ? "Ξ" : "S";

  return (
    <div
      className={[
        "h-7 w-7 rounded-full text-white grid place-items-center text-xs font-bold flex-shrink-0",
        styles,
      ].join(" ")}
    >
      {text}
    </div>
  );
}

export default function CryptoMarketWidget() {
  return (
    <section
      className="rounded-[18px] w-[227px] h-[313px] flex flex-col shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
      style={{ background: "#FFFFFF80" }}
    >
      {/* Header with border */}
      <div className="flex items-center justify-between pt-6 px-4 pb-3 border-t border-[#00000008]">
        <p className="text-[13px] font-semibold text-slate-800">
          Crypto Market
        </p>

        <button
          type="button"
          className="text-[11px] font-medium text-emerald-600 hover:text-emerald-700 flex-shrink-0 cursor-pointer"
          onClick={() => {
            // Navigate to full crypto market page
            window.location.href = "/crypto-market";
          }}
        >
          View All
        </button>
      </div>

      {/* Coin list with gap-15 */}
      <div className="flex-1 px-4 pb-4 flex flex-col gap-[15px]">
        {coins.map((c) => (
          <div
            key={c.symbol}
            className="flex items-center justify-between w-full h-16 pl-3 pr-0 cursor-pointer hover:bg-slate-50/50 transition-colors duration-150 rounded-lg"
            onClick={() => {
              // Navigate to specific coin detail page
              window.location.href = `/crypto/${c.symbol.toLowerCase()}`;
            }}
          >
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <Badge kind={c.badge} />

              <div>
                <p className="text-[13px] font-medium text-slate-800 leading-tight">
                  {c.name}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">{c.symbol}</p>
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <p className="text-[12px] font-semibold text-slate-800 whitespace-nowrap">
                {c.price}
              </p>
              <p
                className={[
                  "text-[10px] font-medium mt-0.5 text-right whitespace-nowrap",
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
