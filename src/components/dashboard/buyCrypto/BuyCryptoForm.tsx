"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { ChevronDown, Copy, Check, Loader2 } from "lucide-react";
import { BUY_AMOUNT_PRESETS, PaymentAccountOption } from "./buyCryptoData";
import { useCryptoStore } from "@/store/cryptoStore";
import { useLoadRates, useRateForItem } from "@/store/rateStore";
import BuyPaymentAccountModal from "./BuyPaymentAccountModal";

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
    account: PaymentAccountOption,
  ) => void;
};

export default function BuyCryptoForm({ onBack, onContinue }: Props) {
  const [isTokenOpen, setIsTokenOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<CryptoToken | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [isCopied, setIsCopied] = useState(false);

  // Payment method selector state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentAccountOption | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

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
      amount <= maxAmount &&
      selectedPaymentMethod
    );
  }, [selectedToken, walletAddress, amount, minAmount, maxAmount, selectedPaymentMethod]);

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
    if (isValid && selectedToken && selectedPaymentMethod) {
      onContinue(selectedToken, walletAddress, amount, selectedPaymentMethod);
    }
  }, [isValid, selectedToken, walletAddress, amount, selectedPaymentMethod, onContinue]);

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

        {/* Payment Method Selector */}
        {selectedToken && (
          <div className="animate-in fade-in duration-300">
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">
              Payment Method
            </label>
            {selectedPaymentMethod ? (
              <div className="flex items-center justify-between border border-emerald-400 bg-white rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-full ${selectedPaymentMethod.logoColor} flex items-center justify-center text-white text-[12px] font-bold`}>
                    {selectedPaymentMethod.logoText}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-slate-800">{selectedPaymentMethod.label}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{selectedPaymentMethod.sublabel}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(true)}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition"
                >
                  Change
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowPaymentModal(true)}
                className="w-full h-[52px] rounded-xl border border-slate-200 bg-white px-4 flex items-center justify-between text-sm text-slate-400 hover:border-emerald-400 transition"
              >
                Select Payment Method
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>
            )}
          </div>
        )}

        {/* Admin's Payment Wallet Address (Read-only, only for Pay via crypto) */}
        {selectedToken && selectedPaymentMethod?.type === "crypto" && (
          <div className="animate-in fade-in duration-300 bg-slate-50 border border-slate-200 rounded-xl p-4">
            <label className="text-xs font-medium text-slate-500 mb-1 block">
              Admin's Payment Wallet Address ({selectedToken.network})
            </label>
            <div className="flex items-center justify-between gap-2">
              <code className="text-xs font-mono text-slate-700 break-all select-all flex-1">
                {cryptoWithRate?.crypto?.wallet_address || "Loading admin address..."}
              </code>
              <button
                type="button"
                onClick={() => {
                  const addr = cryptoWithRate?.crypto?.wallet_address || "";
                  if (addr) {
                    navigator.clipboard.writeText(addr);
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                  }
                }}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 flex-shrink-0"
              >
                {isCopied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                {isCopied ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Please transfer your crypto payment to the address above.
            </p>
          </div>
        )}

        {/* User's Payout Wallet Address (Where they receive the bought crypto) */}
        {selectedToken && selectedPaymentMethod && (
          <div className="animate-in fade-in duration-300">
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">
              Your Payout Wallet Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder={`Enter your destination ${selectedToken.symbol} wallet address`}
                className="w-full h-[52px] rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>
        )}

        {/* Amount Input */}
        {selectedToken && selectedPaymentMethod && walletAddress && (
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

      {/* BuyPaymentAccountModal */}
      <BuyPaymentAccountModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onContinue={(acc) => {
          setSelectedPaymentMethod(acc);
          setShowPaymentModal(false);
        }}
      />
    </div>
  );
}
