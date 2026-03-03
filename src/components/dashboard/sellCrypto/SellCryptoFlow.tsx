"use client";

/**
 * SellCryptoFlow
 *
 * step 1 — form        : select token, network, amount
 * step 2 — payment     : choose payment account (modal overlay)
 * step 3 — confirm     : QR code + wallet address + countdown
 * step 4 — processing  : you sent / you receive / progress
 * modals — cancelTrade, transferWarning
 */

import { useState } from "react";
import SellCryptoForm from "./SellCryptoForm";
import PaymentAccountModal from "./PaymentAccountModal";
import WalletConfirmation from "./WalletConfirmation";
import TransferProcessing from "./TransferProcessing";
import { CancelTradeModal, TransferWarningModal } from "./TradeModals";
import {
  CryptoToken,
  CryptoNetwork,
  PaymentAccountOption,
  RATE_PER_USDT,
} from "./sellCryptoData";

type Step = "form" | "confirm" | "processing";

type Props = {
  onBack: () => void;
};

export default function SellCryptoFlow({ onBack }: Props) {
  const [step, setStep] = useState<Step>("form");

  // Flow data
  const [token, setToken] = useState<CryptoToken | null>(null);
  const [network, setNetwork] = useState<CryptoNetwork | null>(null);
  const [amount, setAmount] = useState(0);
  const [paymentAccount, setPaymentAccount] =
    useState<PaymentAccountOption | null>(null);

  // Modal visibility
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleFormContinue = (t: CryptoToken, n: CryptoNetwork, a: number) => {
    setToken(t);
    setNetwork(n);
    setAmount(a);
    setShowPaymentModal(true);
  };

  const handlePaymentContinue = (account: PaymentAccountOption) => {
    setPaymentAccount(account);
    setShowPaymentModal(false);
    // Show transfer warning only for wallet payment
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
    setNetwork(null);
    setAmount(0);
    setPaymentAccount(null);
    onBack();
  };

  const handleCancelConfirmed = () => {
    setShowCancelModal(false);
    setStep("form");
  };

  const youGet = amount * RATE_PER_USDT;

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="w-full">
      {/* Step 1: Form */}
      {step === "form" && (
        <SellCryptoForm onBack={onBack} onContinue={handleFormContinue} />
      )}

      {/* Step 2 (modal): Payment Account — overlays on top of form */}
      <PaymentAccountModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onContinue={handlePaymentContinue}
      />

      {/* Step 3: Wallet confirmation */}
      {step === "confirm" && token && network && (
        <WalletConfirmation
          amount={amount}
          tokenSymbol={token.symbol}
          network={network.label}
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
        <TransferProcessing
          amountSent={amount}
          tokenSymbol={token.symbol}
          amountReceived={youGet}
          recipientAccount={
            paymentAccount?.label ?? "2141536385 (United Bank For Africa)"
          }
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
        amount={youGet}
        onBack={() => setShowWarningModal(false)}
        onContinue={handleWarningContinue}
      />
    </div>
  );
}
