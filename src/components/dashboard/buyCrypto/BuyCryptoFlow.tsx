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
import { useTransactionStore } from "@/store/Transactionstore";

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
  const [transactionId, setTransactionId] = useState<number | null>(null);

  // Modals
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [isLocalSubmitting, setIsLocalSubmitting] = useState(false);

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
        await fetchCryptoByTokenNetwork(token.symbol, token.network);
      }
    };
    fetchRate();
  }, [token, fetchCryptoByTokenNetwork]);

  useEffect(() => {
    const rateStr = String(sellRate || "0");
    const parsedRate = parseFloat(rateStr);
    if (sellRate && parsedRate > 0) {
      setCurrentRate(parsedRate);
    }
  }, [sellRate]);

  // Helper to get fallback/configured rate
  const resolveRate = () => {
    const rateStr = String(sellRate || "0");
    const parsedRate = parseFloat(rateStr);
    if (sellRate && parsedRate > 0) {
      return parsedRate;
    }
    if (cryptoWithRate?.rate?.sell_rate) {
      const parsed = parseFloat(cryptoWithRate.rate.sell_rate);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    return currentRate;
  };

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleFormContinue = async (
    t: CryptoToken,
    wallet: string,
    a: number,
    account: PaymentAccountOption,
  ) => {
    if (isLocalSubmitting) return;
    setIsLocalSubmitting(true);

    setToken(t);
    setWalletAddress(wallet);
    setAmount(a);
    setPaymentAccount(account);

    if (account.type === "wallet") {
      setShowWarningModal(true);
      setIsLocalSubmitting(false);
    } else {
      // Crypto payment method: create pending transaction immediately so it is tracked in Payouts
      try {
        let rateToUse = 0;
        const tokenIdInt = parseInt(t.id);
        if (tokenIdInt > 0) {
          const freshRate = await useRateStore
            .getState()
            .fetchRateByTypeAndId("crypto", tokenIdInt);

          if (freshRate?.sell_rate) {
            const parsed = parseFloat(freshRate.sell_rate);
            if (!isNaN(parsed) && parsed > 0) {
              rateToUse = parsed;
            }
          }
        }

        if (!rateToUse || rateToUse <= 0) {
          rateToUse = resolveRate();
        }

        if (!rateToUse || rateToUse <= 0) {
          alert("Rate not available. Please try again.");
          return;
        }

        const res: any = await buyCrypto({
          token: t.symbol,
          network: t.network || "TRC20",
          wallet_address: wallet,
          crypto_amount: a,
          selling_rate: rateToUse,
          payment_method: account.type,
        });

        if (res && res.transaction_id) {
          setTransactionId(res.transaction_id);
        } else if (res && res.id) {
          setTransactionId(res.id);
        }

        setStep("confirm");
      } catch (err: any) {
        console.error("Failed to initiate crypto session:", err);
        alert(err.message || "Failed to initiate session. Please try again.");
      } finally {
        setIsLocalSubmitting(false);
      }
    }
  };

  const handlePaymentContinue = async (account: PaymentAccountOption) => {
    if (isLocalSubmitting) return;
    setIsLocalSubmitting(true);
    setPaymentAccount(account);
    setShowPaymentModal(false);

    if (account.type === "wallet") {
      setShowWarningModal(true);
      setIsLocalSubmitting(false);
    } else {
      if (token) {
        try {
          let rateToUse = 0;
          if (tokenId > 0) {
            const freshRate = await useRateStore
              .getState()
              .fetchRateByTypeAndId("crypto", tokenId);
            if (freshRate?.sell_rate) {
              const parsed = parseFloat(freshRate.sell_rate);
              if (!isNaN(parsed) && parsed > 0) rateToUse = parsed;
            }
          }
          if (!rateToUse || rateToUse <= 0) rateToUse = resolveRate();

          const res: any = await buyCrypto({
            token: token.symbol,
            network: token.network || "TRC20",
            wallet_address: walletAddress,
            crypto_amount: amount,
            selling_rate: rateToUse,
            payment_method: account.type,
          });

          if (res && res.transaction_id) {
            setTransactionId(res.transaction_id);
          } else if (res && res.id) {
            setTransactionId(res.id);
          }
        } catch (err: any) {
          console.error("Failed to initiate session on payment update:", err);
        } finally {
          setIsLocalSubmitting(false);
        }
      } else {
        setIsLocalSubmitting(false);
      }
      setStep("confirm");
    }
  };

  const handleWarningContinue = () => {
    setShowWarningModal(false);
    if (paymentAccount?.type === "wallet") {
      handleDeposited(null);
    } else {
      setStep("confirm");
    }
  };

  // ✅ FIXED: fetches fresh rate directly from /rates/crypto/{id} before submitting
  const handleDeposited = async (file: File | null) => {
    if (!token) return;
    if (isLocalSubmitting) return;
    setIsLocalSubmitting(true);

    try {
      // Step 1: Wallet transactions must call buyCrypto to deduct wallet balance
      if (paymentAccount?.type === "wallet") {
        let rateToUse = 0;
        if (tokenId > 0) {
          const freshRate = await useRateStore
            .getState()
            .fetchRateByTypeAndId("crypto", tokenId);

          if (freshRate?.sell_rate) {
            const parsed = parseFloat(freshRate.sell_rate);
            if (!isNaN(parsed) && parsed > 0) {
              rateToUse = parsed;
            }
          }
        }

        if (!rateToUse || rateToUse <= 0) {
          rateToUse = resolveRate();
        }

        if (!rateToUse || rateToUse <= 0) {
          alert("Rate not available. Please go back and try again.");
          return;
        }

        const res: any = await buyCrypto({
          token: token.symbol,
          network: token.network || "TRC20",
          wallet_address: walletAddress,
          crypto_amount: amount,
          selling_rate: rateToUse,
          payment_method: "wallet",
        });

        if (res && res.transaction_id) {
          setTransactionId(res.transaction_id);
        }
      } else {
        // Step 2: Crypto transactions are pre-created, just upload receipt
        if (file && transactionId) {
          await useTransactionStore.getState().uploadTransactionReceipt(transactionId, file);
        }
      }

      setStep("processing");
    } catch (err: any) {
      console.error("Buy crypto validation/upload failed:", err);
      alert(err.message || "Confirmation failed. Please try again.");
    } finally {
      setIsLocalSubmitting(false);
    }
  };

  const handleReturnHome = () => {
    setStep("form");
    setToken(null);
    setWalletAddress("");
    setAmount(0);
    setPaymentAccount(null);
    setTransactionId(null);
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
        <BuyCryptoForm onBack={onBack} onContinue={handleFormContinue} isSubmitting={isLocalSubmitting || submitting} />
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
          networkName={token.network || "TRC20"}
          adminWalletAddress={cryptoWithRate?.crypto?.wallet_address || "TJaBucewys2MkKcqCastDLvWvndYGQbgwg"}
          adminQrCode={cryptoWithRate?.crypto?.qr_code || null}
          userWalletAddress={walletAddress}
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
          amountSent={youSend}
          sentSymbol="NGN"
          amountReceived={amount}
          receivedSymbol={token.symbol}
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
        loading={submitting}
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
