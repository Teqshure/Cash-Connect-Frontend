"use client";

import { useEffect, useState } from "react";
import { Copy, Check, ShieldAlert, Upload } from "lucide-react";
import Image from "next/image";

type Props = {
  amount: number;
  tokenSymbol: string;
  networkName: string;
  adminWalletAddress: string;
  adminQrCode: string | null;
  userWalletAddress: string;
  onBack: () => void;
  onCancelTrade: () => void;
  onDeposited: (file: File | null) => void;
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
  networkName,
  adminWalletAddress,
  adminQrCode,
  userWalletAddress,
  onBack,
  onCancelTrade,
  onDeposited,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [seconds, setSeconds] = useState(60 * 48 + 30);
  const [qrError, setQrError] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const { hours, minutes, seconds: secs } = formatTime(seconds);

  const copyAddress = () => {
    navigator.clipboard.writeText(adminWalletAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDepositedClick = () => {
    if (!receiptFile) {
      alert("Please upload your payment receipt to confirm deposit.");
      return;
    }
    onDeposited(receiptFile);
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
            Please send {amount} {tokenSymbol} to this wallet address using the{" "}
            <span className="text-emerald-600 font-bold">{networkName}</span> network.
          </span>
        </p>
      </div>

      {/* QR Code */}
      <div className="flex justify-center my-6">
        <div className="h-44 w-44 bg-slate-50 rounded-[20px] border border-slate-100 flex flex-col items-center justify-center p-3 gap-2 shadow-sm">
          {!qrError && adminQrCode ? (
            <div className="relative w-32 h-32">
              <Image
                src={adminQrCode}
                alt="Wallet QR Code"
                fill
                sizes="128px"
                className="object-contain rounded-lg"
                onError={() => setQrError(true)}
                priority
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="h-28 w-28 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
                <span className="text-3xl">📱</span>
              </div>
            </div>
          )}
          <p className="text-[10px] text-slate-400 font-medium">Scan to Pay</p>
        </div>
      </div>

      {/* Wallet address */}
      <div className="mb-5">
        <p className="text-[13px] font-bold text-slate-700 mb-1.5">
          Admin Deposit Wallet Address ({networkName})
        </p>
        <div className="flex items-center gap-2 rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-3.5">
          <span className="text-[12px] font-mono text-slate-600 flex-1 truncate">
            {adminWalletAddress}
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

      {/* Payout Destination */}
      <div className="mb-6 rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm">
        <p className="text-[12px] font-bold text-slate-700 mb-1">
          Your Payout Destination Wallet Address
        </p>
        <p className="text-[11px] font-mono text-slate-500 break-all bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
          {userWalletAddress}
        </p>
        <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">
          The crypto you purchased will be sent to this destination address once admin confirms your deposit.
        </p>
      </div>

      {/* Upload Payment Receipt */}
      <div className="mb-6 bg-slate-50 border border-slate-100 rounded-[16px] p-4 flex flex-col gap-3 shadow-sm">
        <div className="flex items-center gap-2 text-slate-800">
          <Upload className="h-4 w-4 text-emerald-600 shrink-0" />
          <p className="text-xs font-bold">Upload Payment Receipt</p>
        </div>
        <p className="text-[10px] text-slate-450 leading-relaxed">
          Please upload the transaction receipt or screenshot to notify the admin for verification.
        </p>
        <input 
          type="file" 
          accept="image/*,application/pdf" 
          onChange={(e) => {
            if (e.target.files?.[0]) setReceiptFile(e.target.files[0]);
          }} 
          id="confirm-receipt-file"
          className="hidden"
        />
        <label 
          htmlFor="confirm-receipt-file"
          className="w-full h-[46px] border border-dashed border-slate-350 rounded-xl bg-white flex items-center justify-center gap-2 text-xs font-bold text-slate-650 hover:bg-slate-50 cursor-pointer transition"
        >
          <span>{receiptFile ? receiptFile.name : "Select Receipt JPG, PNG or PDF"}</span>
        </label>
      </div>

      {/* Countdown */}
      <div className="mb-5 text-center">
        <p className="text-[13px] text-slate-500">
          Rate refreshes every 1 hour –{" "}
          <span className="text-emerald-600 font-semibold">
            {hours}h {minutes}m {secs}s
          </span>
        </p>
      </div>

      {/* Attention Required */}
      <div className="rounded-[16px] border border-emerald-200 bg-emerald-50 px-5 py-4 mb-6">
        <div className="flex items-center gap-2 mb-2 text-emerald-800">
          <ShieldAlert className="h-4 w-4 shrink-0 text-emerald-600" />
          <p className="text-[13px] font-bold">
            Attention Required
          </p>
        </div>
        <ul className="space-y-1.5 list-disc list-inside">
          <li className="text-[12px] text-emerald-700">
            Please deposit within the timeframe above to avoid risking a rate
            change.
          </li>
          <li className="text-[12px] text-emerald-700">
            Ensure the network selected is <span className="font-bold">{networkName}</span> before making the transaction.
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
        <button
          type="button"
          onClick={handleDepositedClick}
          className="flex-1 h-[48px] rounded-[12px] bg-emerald-600 text-white text-[14px] font-semibold hover:brightness-110 transition cursor-pointer"
        >
          I have deposited
        </button>
      </div>
    </div>
  );
}
