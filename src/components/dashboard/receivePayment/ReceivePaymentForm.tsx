"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRateStore } from "@/store/rateStore";
import { ReceivePaymentMethod } from "./receivePaymentData";

type Props = {
  method: ReceivePaymentMethod;
  onBack: () => void;
  onContinue: (data: any) => void;
};

const PRESET_AMOUNTS = [500, 1000, 3000, 5000];

export default function ReceivePaymentForm({
  method,
  onBack,
  onContinue,
}: Props) {
  const { fetchRates, getSellRate } = useRateStore();

  const [currency, setCurrency] = useState("USD");
  const [country, setCountry] = useState("Nigeria");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const [tag, setTag] = useState("");

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  /* ✅ FIXED ERROR HERE */
  const rate = getSellRate(Number(method.id)) || 1450;

  const finalAmount = amount ?? Number(customAmount || 0);

  /* ---------------------------
Generate Tag
--------------------------- */

  const handleGenerateTag = () => {
    if (!email || !gender || !currency || !country) {
      alert("Please fill all fields");
      return;
    }

    const date = new Date();

    const generated =
      "TXN-" +
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      Math.floor(Math.random() * 100000);

    setTag(generated);
  };

  /* ---------------------------
Continue to Receipt
--------------------------- */

  const handleContinue = () => {
    const safeAmount = Number(finalAmount);

    if (!safeAmount || safeAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    onContinue({
      email,
      currency,
      country,
      gender,
      amount: safeAmount,
      tagId: tag,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-sm p-6">
      {/* Back */}
      <button onClick={onBack} className="text-sm text-gray-500 mb-4">
        ← Back
      </button>

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 border rounded-full flex items-center justify-center">
          <Image src={method.logo} alt={method.name} width={60} height={60} />
        </div>
      </div>

      <div className="space-y-4">
        {/* Currency */}
        <div>
          <label className="text-xs text-gray-500">
            Select Payout Currency
          </label>

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full border rounded-xl p-3 mt-1 text-sm"
          >
            <option>USD</option>
            <option>GBP</option>
            <option>EUR</option>
          </select>
        </div>

        {/* Country */}
        <div>
          <label className="text-xs text-gray-500">Select country</label>

          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border rounded-xl p-3 mt-1 text-sm"
          >
            <option>Nigeria</option>
            <option>Ghana</option>
            <option>Kenya</option>
          </select>
        </div>

        {/* Email */}
        <div>
          <label className="text-xs text-gray-500">Paypal Email</label>

          <input
            type="email"
            placeholder="Enter paypal email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl p-3 mt-1 text-sm"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="text-xs text-gray-500">Select Gender</label>

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border rounded-xl p-3 mt-1 text-sm"
          >
            <option value="">Enter gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        {/* Generated Tag */}
        {tag && (
          <div>
            <label className="text-xs text-gray-500">Generated Tag</label>

            <input
              value={tag}
              readOnly
              className="w-full border rounded-xl p-3 mt-1 text-sm bg-gray-50"
            />
          </div>
        )}

        {/* Amount Buttons */}
        <div>
          <label className="text-xs text-gray-500">Select Amount</label>

          <div className="grid grid-cols-4 gap-2 mt-2">
            {PRESET_AMOUNTS.map((value) => (
              <button
                key={value}
                onClick={() => {
                  setAmount(value);
                  setCustomAmount("");
                }}
                className={`border rounded-lg py-2 text-sm ${
                  amount === value
                    ? "border-emerald-500 text-emerald-600"
                    : "border-gray-200"
                }`}
              >
                {value.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <input
          type="number"
          placeholder="Enter amount"
          value={customAmount}
          onChange={(e) => {
            const value = e.target.value;

            setCustomAmount(value);

            if (value) {
              setAmount(Number(value));
            } else {
              setAmount(null);
            }
          }}
          className="w-full border rounded-xl p-3 text-sm"
        />

        {/* Rate */}
        <div className="flex justify-end">
          <div className="bg-emerald-50 text-emerald-600 text-xs px-3 py-1 rounded-lg">
            {rate.toLocaleString()} per {currency}
          </div>
        </div>

        {/* Buttons */}
        {!tag ? (
          <button
            onClick={handleGenerateTag}
            className="w-full h-12 bg-emerald-600 text-white rounded-xl font-semibold"
          >
            Generate Tag
          </button>
        ) : (
          <button
            onClick={handleContinue}
            disabled={!finalAmount}
            className="w-full h-12 bg-emerald-600 text-white rounded-xl font-semibold disabled:opacity-50"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
