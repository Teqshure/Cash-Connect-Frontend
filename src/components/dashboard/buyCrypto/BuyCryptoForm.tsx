"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { ChevronDown, Copy, Check, Loader2 } from "lucide-react";
import { BUY_AMOUNT_PRESETS } from "./buyCryptoData";
import { useCryptoStore } from "@/store/cryptoStore";
import { useLoadRates, useRateForItem } from "@/store/rateStore";

type CryptoToken = {
  id: string;
  name: string;
  symbol: string;
  color: string;
  network: string;
};

type Props = {
  onBack: () => void;
  onContinue: (
    token: CryptoToken,
    walletAddress: string,
    amount: number,
  ) => void;
};

export default function BuyCryptoForm({ onBack, onContinue }: Props) {
  const [isTokenOpen, setIsTokenOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<CryptoToken | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [isCopied, setIsCopied] = useState(false);

  const { cryptos, fetchCryptos, cryptoWithRate, fetchCryptoByTokenNetwork } =
    useCryptoStore();
  const { isLoading: ratesLoading } = useLoadRates();

  const tokenId = selectedToken ? parseInt(selectedToken.id) : 0;
  const { sellRate, minAmount, maxAmount, currency } = useRateForItem(
    tokenId,
    "crypto",
  );

  // Load cryptos on mount
  useEffect(() => {
    fetchCryptos();
  }, [fetchCryptos]);

  // Fetch rate when token changes
  useEffect(() => {
    if (selectedToken?.symbol && selectedToken?.network) {
      fetchCryptoByTokenNetwork(selectedToken.symbol, selectedToken.network);
    }
  }, [selectedToken, fetchCryptoByTokenNetwork]);

  // Auto-fill wallet from API
  useEffect(() => {
    if (cryptoWithRate?.crypto?.wallet_address) {
      setWalletAddress(cryptoWithRate.crypto.wallet_address);
    }
  }, [cryptoWithRate]);

  // Memoized tokens list
  const tokens = useMemo(
    () =>
      cryptos.map((c: any) => ({
        id: String(c.id),
        name: c.name,
        symbol: c.symbol,
        color: "bg-emerald-500",
        network: c.network,
      })),
    [cryptos],
  );

  // Calculate the amount to send (amount * rate)
  const currentRate = sellRate || 1470;
  const youSend = amount * currentRate;

  // Validate form
  const isValid = useMemo(() => {
    return !!(
      selectedToken &&
      walletAddress?.trim() &&
      amount > 0 &&
      amount >= minAmount &&
      amount <= maxAmount
    );
  }, [selectedToken, walletAddress, amount, minAmount, maxAmount]);

  // Handlers
  const handleTokenSelect = useCallback((token: CryptoToken) => {
    setSelectedToken(token);
    setIsTokenOpen(false);
    setAmount(0);
    setWalletAddress("");
  }, []);

  const handlePresetAmount = useCallback((value: number) => {
    setAmount(value);
  }, []);

  const handleCustomAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value.replace(/\D/g, ""));
      setAmount(isNaN(value) ? 0 : value);
    },
    [],
  );

  const copyAddress = useCallback(() => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  }, [walletAddress]);

  const handleSubmit = useCallback(() => {
    if (isValid && selectedToken) {
      onContinue(selectedToken, walletAddress, amount);
    }
  }, [isValid, selectedToken, walletAddress, amount, onContinue]);

  // Loading state
  if (!tokens.length && cryptos.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mb-6 transition"
      >
        ← Back
      </button>

      <div className="space-y-5">
        {/* Token Selector */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">
            Select Token
          </label>
          <div className="relative">
            <button
              onClick={() => setIsTokenOpen((prev) => !prev)}
              className="w-full h-[52px] rounded-xl border border-slate-200 bg-white px-4 flex items-center justify-between text-sm hover:border-emerald-400 transition"
            >
              {selectedToken ? (
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">
                    {selectedToken.symbol[0]}
                  </div>
                  <span className="font-medium">{selectedToken.symbol}</span>
                  <span className="text-xs text-slate-400">
                    ({selectedToken.network})
                  </span>
                </div>
              ) : (
                <span className="text-slate-400">Select Token</span>
              )}
              <ChevronDown
                className={`h-4 w-4 text-slate-400 transition-transform ${isTokenOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isTokenOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsTokenOpen(false)}
                />
                <div className="absolute top-[56px] left-0 right-0 bg-white border rounded-xl shadow-lg z-20 max-h-60 overflow-auto">
                  {tokens.map((token: any) => (
                    <button
                      key={token.id}
                      onClick={() => handleTokenSelect(token)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-sm transition"
                    >
                      <div className="h-7 w-7 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">
                        {token.symbol[0]}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium">{token.symbol}</div>
                        <div className="text-xs text-slate-400">
                          {token.network}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Wallet Address */}
        {selectedToken && (
          <div className="animate-in fade-in duration-300">
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">
              Wallet Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder={`Enter ${selectedToken.symbol} wallet address`}
                className="w-full h-[52px] rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm outline-none focus:border-emerald-500 transition"
              />
              {walletAddress && (
                <button
                  onClick={copyAddress}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition"
                >
                  {isCopied ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Amount Input */}
        {selectedToken && walletAddress && (
          <div className="animate-in fade-in duration-300">
            <label className="text-sm font-bold text-slate-800 mb-3 block">
              How much are you buying?
            </label>

            {/* Preset Amounts */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              {BUY_AMOUNT_PRESETS.map((value) => (
                <button
                  key={value}
                  onClick={() => handlePresetAmount(value)}
                  className={`h-11 rounded-lg border text-sm font-medium transition ${
                    amount === value
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
                  }`}
                >
                  {value.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <input
              type="text"
              inputMode="numeric"
              value={amount || ""}
              onChange={handleCustomAmount}
              placeholder="Enter other amount"
              className="w-full h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm outline-none focus:border-emerald-500 transition"
            />

            {/* Amount Validation Error */}
            {amount > 0 && (amount < minAmount || amount > maxAmount) && (
              <p className="text-xs text-amber-600 mt-1.5">
                ⚠️{" "}
                {amount < minAmount
                  ? `Minimum is ${minAmount.toLocaleString()}`
                  : `Maximum is ${maxAmount.toLocaleString()}`}{" "}
                {selectedToken.symbol}
              </p>
            )}

            {/* Rate Display - Only show when amount is valid */}
            {amount > 0 && amount >= minAmount && amount <= maxAmount && (
              <div className="mt-3 space-y-2">
                {/* You Send Amount */}
                <div className="flex justify-between items-center rounded-xl bg-emerald-50 px-4 py-3">
                  <span className="text-sm text-emerald-700 font-medium">
                    You send:
                  </span>
                  <span className="text-base text-emerald-800 font-bold">
                    {currency}{" "}
                    {youSend.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>

                {/* Rate Info */}
                <div className="flex justify-between items-center rounded-xl bg-slate-50 px-4 py-2">
                  <span className="text-xs text-slate-500">Rate:</span>
                  <span className="text-xs text-slate-700 font-medium">
                    1 {selectedToken.symbol} = {currency}{" "}
                    {currentRate.toLocaleString()}
                  </span>
                </div>

                {/* Limits Info */}
                <div className="text-center text-xs text-slate-400">
                  Limits: {minAmount.toLocaleString()} -{" "}
                  {maxAmount.toLocaleString()} {selectedToken.symbol}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!isValid || ratesLoading}
        className={`mt-6 h-[52px] w-full rounded-xl font-semibold text-sm transition ${
          isValid && !ratesLoading
            ? "bg-emerald-600 text-white hover:brightness-110 cursor-pointer"
            : "bg-slate-200 text-slate-500 cursor-not-allowed"
        }`}
      >
        {ratesLoading ? (
          <Loader2 className="h-4 w-4 animate-spin mx-auto" />
        ) : (
          `Buy ${selectedToken?.symbol || "Crypto"}`
        )}
      </button>
    </div>
  );
}
