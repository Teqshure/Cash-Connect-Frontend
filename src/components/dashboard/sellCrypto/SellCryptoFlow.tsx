"use client";

import { useState } from "react";
import SellCryptoForm from "./SellCryptoForm";
import PaymentAccountModal from "./PaymentAccountModal";
import WalletConfirmation from "./WalletConfirmation";
import TransferProcessing from "./TransferProcessing";
import { CancelTradeModal } from "./TradeModals";
import {
  CryptoToken,
  CryptoNetwork,
  PaymentAccountOption,
} from "./sellCryptoData";
import { useCryptoStore, useCryptoRate } from "@/store/cryptoStore";

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

  // API
  const { cryptos } = useCryptoStore();
  const tokenId = token ? parseInt(token.id) : 0;
  const { sellRate } = useCryptoRate(tokenId);

  // Get wallet address from API
  const getWalletAddress = () => {
    const crypto = cryptos.find((c: any) => c.symbol === token?.symbol);
    return crypto?.wallet_address || "";
  };

  const handleFormContinue = (
    t: CryptoToken,
    n: CryptoNetwork,
    a: number,
  ) => {
    setToken(t);
    setNetwork(n);
    setAmount(a);
    setStep("confirm");
  };

  const handlePaymentContinue = (account: PaymentAccountOption) => {
    setPaymentAccount(account);
    setShowPaymentModal(false);
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

  const currentRate = sellRate || 0;
  const youGet = amount * currentRate;

  return (
    <div className="w-full">
      {/* Step 1: Form */}
      {step === "form" && (
        <SellCryptoForm onBack={onBack} onContinue={handleFormContinue} />
      )}

      {/* Step 3: Wallet Confirmation */}
      {step === "confirm" && token && network && (
        <WalletConfirmation
          amount={amount}
          tokenSymbol={token.symbol}
          tokenId={tokenId}
          network={network.label}
          walletAddress={getWalletAddress()}
          onBack={() => {
            setStep("form");
          }}
          onCancelTrade={() => setShowCancelModal(true)}
          onDeposited={handleDeposited}
        />
      )}

      {/* Step 4: Transfer Processing */}
      {step === "processing" && token && (
        <TransferProcessing
          amountSent={amount}
          tokenSymbol={token.symbol}
          amountReceived={youGet}
          onReturnHome={handleReturnHome}
        />
      )}

      {/* Cancel Trade Modal */}
      <CancelTradeModal
        open={showCancelModal}
        onNo={() => setShowCancelModal(false)}
        onYesCancel={handleCancelConfirmed}
      />
    </div>
  );
}
