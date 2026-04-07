"use client";

import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import Image from "next/image";

type Props = {
  amount: number;
  tokenSymbol: string;
  walletAddress: string;
  onBack: () => void;
  onCancelTrade: () => void;
  onDeposited: () => void; // ✅ buyCrypto is handled in BuyCryptoFlow, not here
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

export default function BuyWalletConfirmation({
  amount,
  tokenSymbol,
  walletAddress,
  onBack,
  onCancelTrade,
  onDeposited,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [seconds, setSeconds] = useState(60 * 48 + 30);
  const [qrError, setQrError] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const { hours, minutes, seconds: secs } = formatTime(seconds);

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full max-w-[560px] mx-auto">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-[13px] text-slate-500 hover:text-slate-800 mb-6 cursor-pointer transition"
      >
        ← Back
      </button>

      {/* Instruction */}
      <div className="mb-4">
        <p className="text-[15px] font-medium text-slate-800">
          Hey Chief 👋
          <br />
          <span className="font-semibold">
            Please send {amount} {tokenSymbol} to this wallet address using a
            TRC20 network.
          </span>
        </p>
      </div>

      {/* QR Code */}
      <div className="flex justify-center my-6">
        <div className="h-40 w-40 bg-slate-100 rounded-[12px] border border-slate-200 flex flex-col items-center justify-center gap-2">
          {!qrError ? (
            <Image
              src="/images/crypto/qr-placeholder.png"
              alt="Wallet QR Code"
              width={112}
              height={112}
              className="object-contain"
              onError={() => setQrError(true)}
              priority
            />
          ) : (
            <div className="h-28 w-28 bg-slate-200 rounded-lg flex items-center justify-center">
              <span className="text-3xl">📱</span>
            </div>
          )}
          <p className="text-[10px] text-slate-400">QR Code</p>
        </div>
      </div>

      {/* Wallet address */}
      <div className="mb-4">
        <p className="text-[13px] font-medium text-slate-700 mb-1.5">
          Wallet Address
        </p>
        <div className="flex items-center gap-2 rounded-[10px] border border-slate-200 bg-slate-50 px-4 py-3">
          <span className="text-[12px] text-slate-600 flex-1 truncate">
            {walletAddress}
          </span>
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

      {/* Countdown */}
      <div className="mb-4 text-center">
        <p className="text-[13px] text-slate-500">
          Rate refreshes every 1 hour –{" "}
          <span className="text-emerald-600 font-semibold">
            {hours}h {minutes}m {secs}s
          </span>
        </p>
      </div>

      {/* Attention Required */}
      <div className="rounded-[12px] border border-emerald-200 bg-emerald-50 px-5 py-4 mb-6">
        <p className="text-[13px] font-semibold text-emerald-800 mb-2">
          Attention Required
        </p>
        <ul className="space-y-1.5 list-disc list-inside">
          <li className="text-[12px] text-emerald-700">
            Please deposit within the timeframe above to avoid risking a rate
            change.
          </li>
          <li className="text-[12px] text-emerald-700">
            Ensure the network selected is TRC20 before making the transaction.
          </li>
          <li className="text-[12px] text-emerald-700">
            Deposits sent via other networks may result in loss of funds.
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancelTrade}
          className="flex-1 h-[48px] rounded-[12px] border border-slate-300 text-slate-700 text-[14px] font-semibold hover:bg-slate-50 transition cursor-pointer"
        >
          Cancel Trade
        </button>
        {/* ✅ FIXED: no longer calls buyCrypto directly — delegates to BuyCryptoFlow */}
        <button
          type="button"
          onClick={onDeposited}
          className="flex-1 h-[48px] rounded-[12px] bg-emerald-600 text-white text-[14px] font-semibold hover:brightness-110 transition cursor-pointer"
        >
          I have deposited
        </button>
      </div>
    </div>
  );
}
