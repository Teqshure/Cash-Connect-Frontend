"use client";

import { useState } from "react";
import { ChevronDown, Copy } from "lucide-react";
import {
  PaymentMethod,
  Currency,
  CURRENCIES,
  AMOUNT_PRESETS,
  RATE_PER_USDT,
} from "./sendPaymentData";

type Props = {
  method: PaymentMethod;
  onBack: () => void;
  onContinue: (formData: PaymentFormData) => void;
};

export type PaymentFormData = {
  currency: string;
  country: string;
  email: string;
  gender: string;
  tagId: string;
  amount: number | "";
};

export default function SendPaymentForm({ method, onBack, onContinue }: Props) {
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    CURRENCIES[0],
  );
  const [country, setCountry] = useState("Nigeria");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [tagId] = useState("TXN-2025-0911-00123");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const amount = selectedPreset ?? (customAmount ? Number(customAmount) : "");
  const usdt =
    typeof amount === "number" ? (amount / RATE_PER_USDT).toFixed(2) : null;

  const isValid =
    !!country &&
    !!email &&
    !!gender &&
    (selectedPreset !== null || customAmount !== "");

  const handleContinue = () => {
    if (!isValid) return;
    onContinue({
      currency: selectedCurrency.code,
      country,
      email,
      gender,
      tagId,
      amount,
    });
  };

  const copyTagId = () => {
    try {
      navigator.clipboard.writeText(tagId).catch(() => {});
    } catch {
      // fallback for when document is not focused
      const el = document.createElement("textarea");
      el.value = tagId;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
  };

  return (
    <div className="w-full">
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-[13px] text-slate-500 hover:text-slate-800 mb-6 cursor-pointer transition"
      >
        ← Back
      </button>

      {/* Method logo — plain img, no next/image */}
      <div className="flex justify-center mb-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={method.logo}
          alt={method.name}
          className="h-14 w-auto object-contain"
        />
      </div>

      <div className="space-y-4">
        {/* Currency */}
        <div>
          <label className="text-[13px] font-medium text-slate-700 mb-1.5 block">
            Select Payout Currency
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setCurrencyOpen((v) => !v)}
              className="w-full h-[48px] rounded-[10px] border border-slate-200 bg-white px-4 flex items-center justify-between text-[14px] text-slate-700 cursor-pointer"
            >
              <span>
                {selectedCurrency.flag} {selectedCurrency.code}
              </span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>
            {currencyOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setCurrencyOpen(false)}
                />
                <div className="absolute top-[52px] left-0 right-0 bg-white border border-slate-200 rounded-[12px] shadow-lg z-20 overflow-hidden">
                  {CURRENCIES.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => {
                        setSelectedCurrency(c);
                        setCurrencyOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-[14px] text-slate-700 transition"
                    >
                      <span>{c.flag}</span>
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="text-[13px] font-medium text-slate-700 mb-1.5 block">
            Select country
          </label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Nigeria"
            className="w-full h-[48px] rounded-[10px] border border-slate-200 bg-slate-50 px-4 text-[14px] outline-none focus:border-emerald-500 focus:bg-white transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-[13px] font-medium text-slate-700 mb-1.5 block">
            Enter {method.name} email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={`Enter ${method.name.toLowerCase()} email`}
            className="w-full h-[48px] rounded-[10px] border border-slate-200 bg-slate-50 px-4 text-[14px] outline-none focus:border-emerald-500 focus:bg-white transition"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="text-[13px] font-medium text-slate-700 mb-1.5 block">
            Select Gender
          </label>
          <div className="relative">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full h-[48px] rounded-[10px] border border-slate-200 bg-slate-50 px-4 text-[14px] outline-none focus:border-emerald-500 appearance-none cursor-pointer"
            >
              <option value="">Enter gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Tag ID */}
        <div>
          <label className="text-[13px] font-medium text-slate-700 mb-1.5 block">
            Tag ID
          </label>
          <div className="relative">
            <input
              type="text"
              value={tagId}
              readOnly
              className="w-full h-[48px] rounded-[10px] border border-slate-200 bg-slate-50 px-4 pr-12 text-[14px] text-slate-500 outline-none"
            />
            <button
              type="button"
              onClick={copyTagId}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              aria-label="Copy"
            >
              <Copy className="h-4 w-4 text-slate-400 hover:text-emerald-600 transition" />
            </button>
          </div>
        </div>

        {/* Amount presets */}
        <div>
          <label className="text-[13px] font-medium text-slate-700 mb-2 block">
            Select Amount
          </label>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {AMOUNT_PRESETS.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => {
                  setSelectedPreset(v);
                  setCustomAmount("");
                }}
                className={[
                  "h-[40px] rounded-[10px] border text-[13px] font-medium transition cursor-pointer",
                  selectedPreset === v
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                ].join(" ")}
              >
                {v.toLocaleString()}
              </button>
            ))}
          </div>
          <input
            type="text"
            inputMode="numeric"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value.replace(/\D/g, ""));
              setSelectedPreset(null);
            }}
            placeholder="Enter other amount"
            className="w-full h-[48px] rounded-[10px] border border-slate-200 bg-slate-50 px-4 text-[14px] outline-none focus:border-emerald-500 focus:bg-white transition"
          />
          {usdt && (
            <p className="mt-2 text-right text-[12px] text-emerald-600 font-medium">
              {RATE_PER_USDT.toLocaleString()}.00 per USDT
            </p>
          )}
        </div>
      </div>

      {/* Continue */}
      <button
        type="button"
        onClick={handleContinue}
        disabled={!isValid}
        className={[
          "mt-6 h-[52px] w-full rounded-[12px] font-semibold text-[15px] transition",
          isValid
            ? "bg-emerald-600 text-white hover:brightness-110 cursor-pointer"
            : "bg-slate-200 text-slate-500 cursor-not-allowed",
        ].join(" ")}
      >
        Continue
      </button>
    </div>
  );
}
