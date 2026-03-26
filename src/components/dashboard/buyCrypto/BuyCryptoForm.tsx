"use client";

import { useState } from "react";
import { ChevronDown, Copy, Check } from "lucide-react";
import {
  CryptoToken,
  CRYPTO_TOKENS,
  BUY_AMOUNT_PRESETS,
  RATE_PER_USDT,
} from "./buyCryptoData";

type Props = {
  onBack: () => void;
  onContinue: (
    token: CryptoToken,
    walletAddress: string,
    amount: number,
  ) => void;
};

export default function BuyCryptoForm({ onBack, onContinue }: Props) {
  const [tokenOpen, setTokenOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<CryptoToken | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [copied, setCopied] = useState(false);

  const amount = selectedPreset ?? (customAmount ? Number(customAmount) : 0);
  const youSend = amount > 0 ? amount * RATE_PER_USDT : 0;
  const isValid =
    !!selectedToken && walletAddress.trim().length > 0 && amount > 0;

  const handleSelectToken = (t: CryptoToken) => {
    setSelectedToken(t);
    setTokenOpen(false);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
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
        {/* ── Select Token ─────────────────────────────────────────────── */}
        <div>
          <label className="text-[13px] font-medium text-slate-700 mb-1.5 block">
            Select Token
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setTokenOpen((v) => !v)}
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
                  {CRYPTO_TOKENS.map((t) => (
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
                      {t.symbol}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Wallet Address ────────────────────────────────────────────── */}
        {selectedToken && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="text-[13px] font-medium text-slate-700 mb-1.5 block">
              Enter wallet address
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Enter your wallet address"
                className="w-full h-[52px] rounded-[14px] border border-slate-200 bg-white px-4 pr-12 text-[14px] outline-none focus:border-emerald-500 transition"
              />
              {walletAddress && (
                <button
                  type="button"
                  onClick={copyAddress}
                  className="absolute right-3 text-slate-400 hover:text-emerald-600 transition"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── Amount ───────────────────────────────────────────────────── */}
        {selectedToken && walletAddress.trim().length > 0 && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="text-[13px] font-bold text-slate-800 mb-3 block">
              How much are you buying
            </label>

            {/* Presets */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              {BUY_AMOUNT_PRESETS.map((v) => (
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

            {/* Custom amount */}
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

            {/* You send */}
            {amount > 0 && (
              <div className="mt-2 flex items-center justify-between rounded-[8px] bg-emerald-50 px-3 py-2">
                <span className="text-[12px] text-emerald-700 font-medium">
                  You send: ₦{youSend.toLocaleString()}.00
                </span>
                <span className="text-[11px] text-emerald-500">
                  {RATE_PER_USDT.toLocaleString()}.00 per USDT
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Buy button */}
      <button
        type="button"
        disabled={!isValid}
        onClick={() =>
          isValid && onContinue(selectedToken!, walletAddress, amount)
        }
        className={[
          "mt-6 h-[52px] w-full rounded-[12px] font-semibold text-[15px] transition",
          isValid
            ? "bg-emerald-600 text-white hover:brightness-110 cursor-pointer"
            : "bg-slate-200 text-slate-500 cursor-not-allowed",
        ].join(" ")}
      >
        Buy
      </button>
    </div>
  );
}
