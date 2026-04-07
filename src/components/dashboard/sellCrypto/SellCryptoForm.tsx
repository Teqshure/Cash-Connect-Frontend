"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import {
  CryptoToken,
  CryptoNetwork,
  SELL_AMOUNT_PRESETS,
} from "./sellCryptoData";
import { useCryptoStore, useCryptoRate } from "@/store/cryptoStore";
import { useLoadRates } from "@/store/rateStore";

type Props = {
  onBack: () => void;
  onContinue: (
    token: CryptoToken,
    network: CryptoNetwork,
    amount: number,
  ) => void;
};

export default function SellCryptoForm({ onBack, onContinue }: Props) {
  const [tokenOpen, setTokenOpen] = useState(false);
  const [networkOpen, setNetworkOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<CryptoToken | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<CryptoNetwork | null>(
    null,
  );
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  // API Integration
  const { cryptos, fetchCryptos } = useCryptoStore();
  useLoadRates(); // Load rates from API

  // Get rate for selected crypto
  const tokenId = selectedToken ? parseInt(selectedToken.id) : 0;
  const { sellRate, minAmount, maxAmount, currency } = useCryptoRate(tokenId);

  // Load cryptos from API on mount
  useEffect(() => {
    fetchCryptos();
  }, [fetchCryptos]);

  // Map API cryptos to UI tokens (only active ones)
  const availableTokens: CryptoToken[] = cryptos
    .filter((c: any) => c.is_active)
    .map((c: any) => ({
      id: String(c.id),
      name: c.name,
      symbol: c.symbol,
      color: "bg-emerald-500",
      textColor: "text-white",
    }));

  // Get unique networks from API cryptos
  const availableNetworks: CryptoNetwork[] = selectedToken
    ? cryptos
        .filter((c: any) => c.symbol === selectedToken.symbol && c.is_active)
        .map((c: any) => ({
          id: c.network.toLowerCase(),
          label: c.network,
        }))
    : [];

  const amount = selectedPreset ?? (customAmount ? Number(customAmount) : 0);
  const currentRate = sellRate || 0;
  const youGet = amount > 0 && currentRate > 0 ? amount * currentRate : 0;

  const isValid =
    !!selectedToken &&
    !!selectedNetwork &&
    amount > 0 &&
    amount >= minAmount &&
    amount <= maxAmount;

  const handleSelectToken = (t: CryptoToken) => {
    setSelectedToken(t);
    setSelectedNetwork(null);
    setSelectedPreset(null);
    setCustomAmount("");
    setTokenOpen(false);
  };

  const handleSelectNetwork = (n: CryptoNetwork) => {
    setSelectedNetwork(n);
    setSelectedPreset(null);
    setCustomAmount("");
    setNetworkOpen(false);
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-[13px] text-slate-500 hover:text-slate-800 mb-6 cursor-pointer transition"
      >
        ← Back
      </button>

      <div className="space-y-5">
        {/* Select Token - from API */}
        <div>
          <label className="text-[13px] font-medium text-slate-700 mb-1.5 block">
            Select Token
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setTokenOpen((v) => !v);
                setNetworkOpen(false);
              }}
              className="w-full h-[52px] rounded-[14px] border border-slate-200 bg-white px-4 flex items-center justify-between text-[14px] cursor-pointer hover:border-emerald-400 transition"
            >
              {selectedToken ? (
                <span className="flex items-center gap-3">
                  <span
                    className={`h-7 w-7 rounded-full ${selectedToken.color} flex items-center justify-center text-[11px] font-bold text-white`}
                  >
                    {selectedToken.symbol[0]}
                  </span>
                  <span className="font-medium text-slate-800">
                    {selectedToken.symbol}
                  </span>
                </span>
              ) : (
                <span className="text-slate-400">Select Token</span>
              )}
              <ChevronDown
                className={`h-4 w-4 text-slate-400 transition-transform ${tokenOpen ? "rotate-180" : ""}`}
              />
            </button>

            {tokenOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setTokenOpen(false)}
                />
                <div className="absolute top-[56px] left-0 right-0 bg-white border border-slate-200 rounded-[14px] shadow-lg z-20 overflow-hidden">
                  {availableTokens.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleSelectToken(t)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-[14px] text-slate-700 transition"
                    >
                      <span
                        className={`h-7 w-7 rounded-full ${t.color} flex items-center justify-center text-[11px] font-bold text-white`}
                      >
                        {t.symbol[0]}
                      </span>
                      <div className="flex-1 text-left">
                        <div className="font-medium">{t.symbol}</div>
                        <div className="text-[11px] text-slate-400">
                          {t.name}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Select Network - from API */}
        {selectedToken && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="text-[13px] font-medium text-slate-700 mb-1.5 block">
              Select Network
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNetworkOpen((v) => !v);
                  setTokenOpen(false);
                }}
                className="w-full h-[52px] rounded-[14px] border border-slate-200 bg-white px-4 flex items-center justify-between text-[14px] cursor-pointer hover:border-emerald-400 transition"
              >
                <span
                  className={
                    selectedNetwork
                      ? "text-slate-800 font-medium"
                      : "text-slate-400"
                  }
                >
                  {selectedNetwork?.label ?? "Select Network"}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${networkOpen ? "rotate-180" : ""}`}
                />
              </button>

              {networkOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setNetworkOpen(false)}
                  />
                  <div className="absolute top-[56px] left-0 right-0 bg-white border border-slate-200 rounded-[14px] shadow-lg z-20 overflow-hidden">
                    {availableNetworks.map((n) => (
                      <button
                        key={n.id}
                        type="button"
                        onClick={() => handleSelectNetwork(n)}
                        className="w-full px-4 py-3 hover:bg-slate-50 text-[14px] text-slate-700 text-left transition"
                      >
                        {n.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Amount Section */}
        {selectedToken && selectedNetwork && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="text-[13px] font-bold text-slate-800 mb-3 block">
              How much are you selling
            </label>

            <div className="grid grid-cols-4 gap-2 mb-3">
              {SELL_AMOUNT_PRESETS.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => {
                    setSelectedPreset(v);
                    setCustomAmount("");
                  }}
                  className={[
                    "h-[44px] rounded-[10px] border text-[13px] font-medium transition cursor-pointer",
                    selectedPreset === v
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300",
                  ].join(" ")}
                >
                  {v.toLocaleString()}
                </button>
              ))}
            </div>

            <input
              type="text"
              inputMode="numeric"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value.replace(/\D/g, ""));
                setSelectedPreset(null);
              }}
              placeholder="Enter other amount"
              className="w-full h-[48px] rounded-[10px] border border-slate-200 bg-white px-4 text-[14px] outline-none focus:border-emerald-500 transition"
            />

            {/* Amount Validation */}
            {amount > 0 && (amount < minAmount || amount > maxAmount) && (
              <p className="text-[11px] text-amber-600 mt-1.5">
                ⚠️{" "}
                {amount < minAmount
                  ? `Minimum is ${minAmount.toLocaleString()}`
                  : `Maximum is ${maxAmount.toLocaleString()}`}{" "}
                {selectedToken.symbol}
              </p>
            )}

            {/* Rate Display - from API */}
            {amount > 0 &&
              amount >= minAmount &&
              amount <= maxAmount &&
              currentRate > 0 && (
                <div className="mt-3 flex items-center justify-between rounded-[12px] bg-emerald-50 px-4 py-3">
                  <span className="text-[13px] text-emerald-700 font-medium">
                    You get: {currency} {youGet.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-emerald-600">
                    {currentRate.toLocaleString()}.00 per {selectedToken.symbol}
                  </span>
                </div>
              )}
          </div>
        )}
      </div>

      <button
        type="button"
        disabled={!isValid}
        onClick={() =>
          isValid && onContinue(selectedToken!, selectedNetwork!, amount)
        }
        className={[
          "mt-6 h-[52px] w-full rounded-[12px] font-semibold text-[15px] transition",
          isValid
            ? "bg-emerald-600 text-white hover:brightness-110 cursor-pointer"
            : "bg-slate-200 text-slate-500 cursor-not-allowed",
        ].join(" ")}
      >
        Sell
      </button>
    </div>
  );
}
