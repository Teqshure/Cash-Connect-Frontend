// components/dashboard/sellCrypto/WalletConfirmation.tsx
"use client";

import { useEffect, useState } from "react";
import { Copy, Check, Loader2 } from "lucide-react";
import { useSellCrypto } from "@/store/cryptoStore";
import { useCryptoRate } from "@/store/cryptoStore";
import { PaymentAccountOption } from "./sellCryptoData";
import { useTransactionStore } from "@/store/Transactionstore";

type Props = {
  amount: number;
  tokenSymbol: string;
  tokenId?: number;
  network: string;
  walletAddress: string;
  paymentAccount?: PaymentAccountOption;
  onBack: () => void;
  onCancelTrade: () => void;
  onDeposited: () => void;
};

function formatTime(secs: number) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return {
    hours: String(h).padStart(2, "0"),
    minutes: String(m).padStart(2, "0"),
    seconds: String(s).padStart(2, "0"),
  };
}

function formatCurrencySymbol(curr: string) {
  if (curr === "NGN" || !curr) return "₦";
  return curr;
}

export default function WalletConfirmation({
  amount,
  tokenSymbol,
  tokenId,
  network,
  walletAddress,
  paymentAccount,
  onBack,
  onCancelTrade,
  onDeposited,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [seconds, setSeconds] = useState(60 * 48 + 30);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { sellCrypto, submitting } = useSellCrypto();

  // ✅ IMPORTANT: Use SELL_RATE for selling crypto (what platform pays you)
  const { sellRate, currency } = useCryptoRate(tokenId);

  // Debug logging for props
  useEffect(() => {
    console.log("🔍 [WalletConfirmation] Component mounted with props:", {
      amount,
      tokenSymbol,
      tokenId,
      network,
      walletAddress,
      paymentAccount,
    });
  }, [amount, tokenSymbol, tokenId, network, walletAddress, paymentAccount]);

  // Debug logging for rate
  useEffect(() => {
    console.log("💰 [WalletConfirmation] Rate info:", {
      tokenId,
      sellRate, // ✅ Changed from buyRate
      currency,
      currentRate: sellRate || 0,
      youGet: amount * (sellRate || 0),
    });
  }, [tokenId, sellRate, currency, amount]);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const { hours, minutes, seconds: secs } = formatTime(seconds);

  const copyAddress = () => {
    console.log("📋 [WalletConfirmation] Copying address:", walletAddress);
    navigator.clipboard.writeText(walletAddress).then(() => {
      setCopied(true);
      console.log("✅ [WalletConfirmation] Address copied successfully");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDepositedClick = async () => {
    console.log("🚀 [WalletConfirmation] handleDepositedClick started");
    console.log("📊 [WalletConfirmation] Current state:", {
      tokenId,
      tokenSymbol,
      network,
      amount,
      paymentAccount,
      sellRate, // ✅ Log sell rate instead of buy rate
    });

    if (!tokenId) {
      console.error("❌ [WalletConfirmation] Invalid tokenId:", tokenId);
      alert("Invalid token. Please try again.");
      return;
    }

    // ✅ Validate sell rate exists
    if (!sellRate || sellRate <= 0) {
      console.error("❌ [WalletConfirmation] Invalid sell rate:", sellRate);
      alert("Selling rate not available. Please try again later.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: any = {
        token: tokenSymbol,
        network: network,
        crypto_amount: amount,
      };

      // Only include bank_account_id for bank accounts
      if (paymentAccount && paymentAccount.type === "bank" && paymentAccount.bankAccountId) {
        payload.bank_account_id = paymentAccount.bankAccountId;
        console.log(
          "🏦 [WalletConfirmation] Adding bank_account_id:",
          paymentAccount.bankAccountId,
        );
      } else {
        console.log(
          "👛 [WalletConfirmation] No bank_account_id (wallet transaction)",
        );
      }

      console.log(
        "📤 [WalletConfirmation] Selling crypto with payload:",
        JSON.stringify(payload, null, 2),
      );
      console.log("💵 [WalletConfirmation] Using sell rate:", sellRate);
      console.log(
        "💰 [WalletConfirmation] Expected amount:",
        amount * sellRate,
      );

      const result = await sellCrypto(payload);
      console.log("✅ [WalletConfirmation] sellCrypto successful:", result);

      // Force refresh transactions to update history immediately
      useTransactionStore.getState().fetchTransactions(true);

      console.log("🎯 [WalletConfirmation] Calling onDeposited...");
      onDeposited();
    } catch (err: any) {
      console.error("❌ [WalletConfirmation] Sell crypto failed:", {
        error: err,
        message: err.message,
        stack: err.stack,
      });
      alert(err.message || "Transaction failed. Please try again.");
    } finally {
      setIsSubmitting(false);
      console.log("🏁 [WalletConfirmation] handleDepositedClick finished");
    }
  };

  // ✅ Use SELL_RATE for calculation (what you receive)
  const currentRate = sellRate || 0;
  const youGet = amount * currentRate;

  console.log("🎨 [WalletConfirmation] Rendering with:", {
    amount,
    currentRate,
    youGet,
    currency,
    isSubmitting,
    submitting,
  });

  return (
    <div className="w-full max-w-[560px] mx-auto">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-[13px] text-slate-500 hover:text-slate-800 mb-6 cursor-pointer transition"
      >
        ← Back
      </button>

      <div className="mb-4">
        <p className="text-[15px] font-medium text-slate-800">
          Hey Chief 👋
          <br />
          <span className="font-semibold">
            Please send {amount.toLocaleString()} {tokenSymbol} to this wallet
            address using a {network} network.
          </span>
        </p>
      </div>

      {/* Wallet Address */}
      <div className="bg-slate-50 rounded-[16px] border border-slate-200 p-4 mb-4">
        <p className="text-[11px] text-slate-500 mb-1.5">Wallet Address</p>
        <div className="flex items-center justify-between gap-2">
          <code className="text-[12px] font-mono text-slate-700 break-all flex-1">
            {walletAddress}
          </code>
          <button
            type="button"
            onClick={copyAddress}
            className="flex items-center gap-1 text-[12px] font-semibold text-emerald-600 hover:text-emerald-700 transition cursor-pointer flex-shrink-0"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copied ? "Copied" : "Copy Address"}
          </button>
        </div>
      </div>

      {/* Payment Account Info */}
      <div className="bg-emerald-50 rounded-[16px] border border-emerald-200 p-4 mb-4">
        <p className="text-[11px] text-emerald-600 mb-1.5">
          Funds will be sent to:
        </p>
        <p className="text-[13px] font-semibold text-emerald-800">
          {paymentAccount?.label || "Cash Connect Wallet"}
        </p>
        <p className="text-[11px] text-emerald-600 mt-0.5">
          {paymentAccount?.sublabel || "Internal Wallet Balance"}
        </p>
      </div>

      {/* Rate Info - Prominently displayed */}
      <div className="bg-white rounded-[16px] border-2 border-emerald-500 p-5 mb-4">
        <p className="text-[12px] text-slate-500 mb-1">You will receive</p>
        <p className="text-[28px] font-bold text-emerald-600">
          {formatCurrencySymbol(currency)}{youGet.toLocaleString()}
        </p>
        <div className="mt-3 pt-3 border-t border-emerald-100">
          <div className="flex justify-between text-[12px]">
            <span className="text-slate-600">Amount:</span>
            <span className="font-medium">
              {amount.toLocaleString()} {tokenSymbol}
            </span>
          </div>
          <div className="flex justify-between text-[12px] mt-1">
            <span className="text-slate-600">Rate:</span>
            <span className="font-medium text-emerald-600">
              {formatCurrencySymbol(currency)}{currentRate.toLocaleString()} per {tokenSymbol}
            </span>
          </div>
        </div>
      </div>

      {/* Countdown */}
      <div className="mb-4 text-center">
        <p className="text-[13px] text-slate-500">
          Rate refreshes every 1 hour –{" "}
          <span className="text-emerald-600 font-semibold">
            {hours}h {minutes}m {secs}s
          </span>
        </p>
      </div>

      {/* Warning */}
      <div className="rounded-[16px] border border-amber-200 bg-amber-50 px-5 py-4 mb-6">
        <p className="text-[13px] font-semibold text-amber-800 mb-2">
          ⚠️ Attention Required
        </p>
        <ul className="space-y-1.5 list-disc list-inside">
          <li className="text-[12px] text-amber-700">
            Please deposit within the timeframe above to avoid rate changes.
          </li>
          <li className="text-[12px] text-amber-700">
            Ensure the network selected is {network} before making the
            transaction.
          </li>
          <li className="text-[12px] text-amber-700">
            Deposits sent via other networks may result in loss of funds.
          </li>
          <li className="text-[12px] text-amber-700">
            Funds will be credited to your Cash Connect wallet balance after admin approval.
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancelTrade}
          disabled={isSubmitting || submitting}
          className="flex-1 h-[48px] rounded-[12px] border border-slate-300 text-slate-700 text-[14px] font-semibold hover:bg-slate-50 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel Trade
        </button>
        <button
          type="button"
          onClick={handleDepositedClick}
          disabled={isSubmitting || submitting || !currentRate}
          className="flex-1 h-[48px] rounded-[12px] bg-emerald-600 text-white text-[14px] font-semibold hover:brightness-110 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting || submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "I have deposited"
          )}
        </button>
      </div>

      {/* Rate not available warning */}
      {!currentRate && (
        <div className="mt-3 text-center">
          <p className="text-[12px] text-red-500">
            ⚠️ Selling rate not available. Please try again later.
          </p>
        </div>
      )}
    </div>
  );
}
