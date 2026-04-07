"use client";

import { useState, useEffect } from "react";
import BuyCryptoForm from "./BuyCryptoForm";
import BuyPaymentAccountModal from "./BuyPaymentAccountModal";
import BuyWalletConfirmation from "./BuyWalletConfirmation";
import BuyTransferProcessing from "./BuyTransferProcessing";
import { CancelTradeModal, TransferWarningModal } from "./BuyTradeModals";
import {
  CryptoToken,
  PaymentAccountOption,
  RATE_PER_USDT,
} from "./buyCryptoData";

import { useBuyCrypto, useCryptoStore } from "@/store/cryptoStore";
import { useLoadRates, useRateForItem, useRateStore } from "@/store/rateStore";

type Step = "form" | "confirm" | "processing";

type Props = {
  onBack: () => void;
};

export default function BuyCryptoFlow({ onBack }: Props) {
  const [step, setStep] = useState<Step>("form");

  // Flow data
  const [token, setToken] = useState<CryptoToken | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [paymentAccount, setPaymentAccount] =
    useState<PaymentAccountOption | null>(null);
  const [currentRate, setCurrentRate] = useState(RATE_PER_USDT);

  // Modals
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  // Store hooks
  const { buyCrypto, submitting, error } = useBuyCrypto();
  const { fetchCryptoByTokenNetwork, cryptoWithRate } = useCryptoStore();

  // Load rates
  const { rates, isLoading: ratesLoading } = useLoadRates();

  // Get rate from rate store using crypto ID
  const tokenId = token ? parseInt(token.id) : 0;
  const { sellRate } = useRateForItem(tokenId, "crypto");

  // ── Fetch crypto details + rate when token changes ──────────────────────────

  useEffect(() => {
    const fetchRate = async () => {
      if (token?.symbol && token?.network) {
        try {
          const result = await fetchCryptoByTokenNetwork(
            token.symbol,
            token.network,
          );

          if (result?.rate?.sell_rate) {
            const rate = parseFloat(result.rate.sell_rate);
            if (!isNaN(rate) && rate > 0) {
              setCurrentRate(rate);
              console.log(
                "✅ Rate updated from fetchCryptoByTokenNetwork:",
                rate,
              );
            }
          }
        } catch (err) {
          console.error("❌ Failed to fetch rate:", err);
        }
      }
    };

    fetchRate();
  }, [token, fetchCryptoByTokenNetwork]);

  // ── Resolve best available rate ─────────────────────────────────────────────

  const resolveRate = (): number => {
    if (sellRate > 0) return sellRate;
    if (cryptoWithRate?.rate?.sell_rate) {
      const r = parseFloat(cryptoWithRate.rate.sell_rate);
      if (!isNaN(r) && r > 0) return r;
    }
    if (currentRate > 0) return currentRate;
    return RATE_PER_USDT;
  };

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleFormContinue = (t: CryptoToken, wallet: string, a: number) => {
    setToken(t);
    setWalletAddress(wallet);
    setAmount(a);
    setShowPaymentModal(true);
  };

  const handlePaymentContinue = (account: PaymentAccountOption) => {
    setPaymentAccount(account);
    setShowPaymentModal(false);

    if (account.type === "wallet") {
      setShowWarningModal(true);
    } else {
      setStep("confirm");
    }
  };

  const handleWarningContinue = () => {
    setShowWarningModal(false);
    setStep("confirm");
  };

  // ✅ FIXED: fetches fresh rate directly from /rates/crypto/{id} before submitting
  const handleDeposited = async () => {
    if (!token) return;

    try {
      // Step 1: Fetch fresh rate directly from the dedicated endpoint
      let rateToUse = 0;

      if (tokenId > 0) {
        const freshRate = await useRateStore
          .getState()
          .fetchRateByTypeAndId("crypto", tokenId);

        if (freshRate?.sell_rate) {
          const parsed = parseFloat(freshRate.sell_rate);
          if (!isNaN(parsed) && parsed > 0) {
            rateToUse = parsed;
            console.log(
              "✅ Got fresh rate from /rates/crypto/",
              tokenId,
              ":",
              rateToUse,
            );
          }
        }
      }

      // Step 2: Fall back to already-resolved rate if fresh fetch failed
      if (!rateToUse || rateToUse <= 0) {
        rateToUse = resolveRate();
        console.log("⚠️ Using fallback rate:", rateToUse);
      }

      // Step 3: Guard — don't submit with zero rate
      if (!rateToUse || rateToUse <= 0) {
        alert("Rate not available. Please go back and try again.");
        return;
      }

      console.log("📤 Submitting buy crypto:", {
        token: token.symbol,
        network: token.network || "TRC20",
        wallet_address: walletAddress,
        crypto_amount: amount,
        selling_rate: rateToUse,
      });

      await buyCrypto({
        token: token.symbol,
        network: token.network || "TRC20",
        wallet_address: walletAddress,
        crypto_amount: amount,
        selling_rate: rateToUse,
      });

      setStep("processing");
    } catch (err: any) {
      console.error("Buy crypto failed:", err);
      alert(err.message || "Transaction failed. Please try again.");
    }
  };

  const handleReturnHome = () => {
    setStep("form");
    setToken(null);
    setWalletAddress("");
    setAmount(0);
    setPaymentAccount(null);
    onBack();
  };

  const handleCancelConfirmed = () => {
    setShowCancelModal(false);
    setStep("form");
  };

  // ── youSend calculation ─────────────────────────────────────────────────────

  const youSend = (() => {
    if (!amount || amount <= 0) return 0;
    const rate = resolveRate();
    const total = amount * rate;
    console.log(`💰 Calculating: ${amount} * ${rate} = ${total}`);
    return isNaN(total) ? 0 : total;
  })();

  const isValidAmount = youSend > 0 && !isNaN(youSend);
  const shouldShowWarning = showWarningModal && isValidAmount;

  return (
    <div className="w-full">
      {/* Step 1: Form */}
      {step === "form" && (
        <BuyCryptoForm onBack={onBack} onContinue={handleFormContinue} />
      )}

      {/* Step 2 (modal): Payment Account */}
      <BuyPaymentAccountModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onContinue={handlePaymentContinue}
      />

      {/* Step 3: Wallet confirmation */}
      {step === "confirm" && token && (
        <BuyWalletConfirmation
          amount={amount}
          tokenSymbol={token.symbol}
          walletAddress={walletAddress}
          onBack={() => {
            setStep("form");
            setShowPaymentModal(true);
          }}
          onCancelTrade={() => setShowCancelModal(true)}
          onDeposited={handleDeposited}
        />
      )}

      {/* Step 4: Transfer processing */}
      {step === "processing" && token && (
        <BuyTransferProcessing
          amountSent={amount}
          tokenSymbol={token.symbol}
          amountReceived={amount}
          recipientWallet={walletAddress}
          onReturnHome={handleReturnHome}
        />
      )}

      {/* Cancel trade modal */}
      <CancelTradeModal
        open={showCancelModal}
        onNo={() => setShowCancelModal(false)}
        onYesCancel={handleCancelConfirmed}
      />

      {/* Transfer warning modal */}
      <TransferWarningModal
        open={shouldShowWarning}
        amount={youSend}
        onBack={() => setShowWarningModal(false)}
        onContinue={handleWarningContinue}
      />

      {error && (
        <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
      )}

      {submitting && (
        <p className="text-emerald-600 text-sm mt-2 text-center">
          Processing transaction...
        </p>
      )}

      {ratesLoading && (
        <p className="text-slate-400 text-xs mt-2 text-center">
          Loading rates...
        </p>
      )}
    </div>
  );
}
