"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Check } from "lucide-react";
import { WALLET_ADDRESS } from "./sellCryptoData";
import SellSuccessModal from "./Sellsuccessmodal";

type Props = {
  amountSent: number;
  tokenSymbol: string;
  amountReceived: number;
  recipientAccount: string;
  onReturnHome: () => void;
};

// ── Progress step config ──────────────────────────────────────────────────────
type StepState = "active" | "done" | "pending";

type ProgressStep = {
  label: string;
  Icon: React.ElementType;
};

const STEPS: ProgressStep[] = [
  { label: "Waiting to confirm deposit in wallet", Icon: ArrowDown },
  { label: "Processing", Icon: ArrowUp },
  { label: "Done", Icon: Check },
];

// How long each step stays active before moving to the next (ms)
const STEP_DURATION = 3000;

export default function TransferProcessing({
  amountSent,
  tokenSymbol,
  amountReceived,
  recipientAccount,
  onReturnHome,
}: Props) {
  // 0 = Waiting, 1 = Processing, 2 = Done
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Auto-advance steps
  useEffect(() => {
    if (currentStep >= STEPS.length - 1) return;

    const t = setTimeout(() => {
      setCurrentStep((s) => s + 1);
    }, STEP_DURATION);

    return () => clearTimeout(t);
  }, [currentStep]);

  // Show success modal when Done step is reached
  useEffect(() => {
    if (currentStep === STEPS.length - 1) {
      const t = setTimeout(() => setShowSuccess(true), 800);
      return () => clearTimeout(t);
    }
  }, [currentStep]);

  const getStepState = (index: number): StepState => {
    if (index < currentStep) return "done";
    if (index === currentStep) return "active";
    return "pending";
  };

  return (
    <div className="w-full max-w-[560px] mx-auto py-4">
      {/* You sent */}
      <div className="rounded-[16px] border border-slate-100 bg-white shadow-sm px-6 py-5 mb-3 text-center">
        <p className="text-[13px] text-slate-500 mb-1">You sent</p>
        <p className="text-[22px] font-bold text-slate-900">
          {amountSent.toLocaleString()} {tokenSymbol}
        </p>
        <p className="text-[12px] text-slate-400 mt-1">to:</p>
        <p className="text-[12px] text-slate-600 truncate px-4">
          {WALLET_ADDRESS}
        </p>
      </div>

      {/* You receive */}
      <div className="rounded-[16px] border border-slate-100 bg-white shadow-sm px-6 py-5 mb-3 text-center">
        <p className="text-[13px] text-slate-500 mb-1">You receive</p>
        <p className="text-[22px] font-bold text-emerald-600">
          ₦{amountReceived.toLocaleString()}.00
        </p>
        <p className="text-[12px] text-slate-400 mt-1">to:</p>
        <p className="text-[12px] text-slate-600">{recipientAccount}</p>
      </div>

      {/* Progress indicator */}
      <div className="rounded-[16px] border border-emerald-100 bg-emerald-50 px-6 py-6 mb-6">
        <div className="flex items-start justify-center gap-0">
          {STEPS.map((step, index) => {
            const state = getStepState(index);
            const isLast = index === STEPS.length - 1;

            return (
              <div key={step.label} className="flex items-start">
                {/* Step circle + label */}
                <div className="flex flex-col items-center gap-2 w-20">
                  <div
                    className={[
                      "h-11 w-11 rounded-full grid place-items-center transition-all duration-500",
                      state === "pending"
                        ? "bg-slate-200"
                        : "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]",
                    ].join(" ")}
                  >
                    <step.Icon
                      className={[
                        "h-5 w-5 transition-all duration-300",
                        state === "pending" ? "text-slate-400" : "text-white",
                      ].join(" ")}
                    />
                  </div>
                  <p
                    className={[
                      "text-[11px] text-center leading-tight transition-colors duration-300",
                      state === "pending"
                        ? "text-slate-400"
                        : "text-emerald-700 font-medium",
                    ].join(" ")}
                  >
                    {step.label}
                  </p>
                </div>

                {/* Connector line between steps */}
                {!isLast && (
                  <div className="mt-5 w-16 h-[2px] flex-shrink-0 mx-1 rounded-full overflow-hidden bg-slate-200">
                    <div
                      className={[
                        "h-full rounded-full bg-emerald-500 transition-all duration-700",
                        index < currentStep ? "w-full" : "w-0",
                      ].join(" ")}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Status text */}
        <p className="text-[12px] text-emerald-600 text-center mt-5 font-medium">
          {currentStep === 0 &&
            "Waiting to confirm deposit in wallet. Usually 3-5 minutes."}
          {currentStep === 1 && "Processing your transaction..."}
          {currentStep === 2 && "Transaction complete! ✓"}
        </p>
      </div>

      {/* Return to Home — always visible so user isn't stuck */}
      <button
        type="button"
        onClick={onReturnHome}
        className="w-full h-[52px] rounded-[12px] bg-emerald-600 text-white font-semibold text-[15px] hover:brightness-110 transition cursor-pointer"
      >
        Return to Home
      </button>

      {/* Success modal — auto-shown when Done step completes */}
      <SellSuccessModal open={showSuccess} onOk={onReturnHome} />
    </div>
  );
}
