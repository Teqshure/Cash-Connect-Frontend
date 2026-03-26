"use client";

/**
 * BuyCryptoFlow
 *
 * step 1 — form        : select token, wallet address, amount
 * step 2 — payment     : choose payment account (modal overlay)
 * step 3 — confirm     : QR code + wallet address + countdown
 * step 4 — processing  : you sent / you receive / progress
 * modals — cancelTrade, transferWarning
 */

import { useState } from "react";
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

  // Modal visibility
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  // ── Handlers ──────────────────────────────────────────────────────────────

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

  const handleDeposited = () => setStep("processing");

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

  const youSend = amount * RATE_PER_USDT;

  // ─────────────────────────────────────────────────────────────────────────

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
        open={showWarningModal}
        amount={youSend}
        onBack={() => setShowWarningModal(false)}
        onContinue={handleWarningContinue}
      />
    </div>
  );
}
