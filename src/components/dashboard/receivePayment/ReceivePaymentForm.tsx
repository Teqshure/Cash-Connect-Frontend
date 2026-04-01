"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, ChevronDown } from "lucide-react";
import { UIPaymentMethod, usePaymentMethodRate } from "@/store/globalPayment";

type Props = {
  method: UIPaymentMethod;
  onBack: () => void;
  onContinue: (data: any) => void;
};

const PRESET_AMOUNTS = [500, 1000, 3000, 5000];

export default function ReceivePaymentForm({
  method,
  onBack,
  onContinue,
}: Props) {
  const rate = usePaymentMethodRate(method);

  const [currency, setCurrency] = useState("USD");
  const [country, setCountry] = useState("Nigeria");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [tag, setTag] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [error, setError] = useState("");

  const finalAmount = amount ?? Number(customAmount || 0);

  const generateTag = () => {
    const newTag =
      "TAG-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    setTag(newTag);
  };

  const validate = () => {
    if (!currency) return "Select payout currency";
    if (!country) return "Select country";
    if (!email) return "Enter PayPal email";
    if (!gender) return "Select gender";
    if (!finalAmount) return "Select or enter amount";
    return "";
  };

  const handleButton = () => {
    setError("");

    if (!tag) {
      generateTag();
      return;
    }

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    onContinue({
      email,
      currency,
      country,
      gender,
      amount: finalAmount,
      tagId: tag,
    });
  };

  const copyTag = () => {
    if (!tag) return;
    navigator.clipboard.writeText(tag);
  };

  return (
    <div className="w-full flex justify-center pb-12 bg-[#F5F5F5] min-h-screen">
      <div className="w-[796px] bg-white rounded-[32px] pt-[43px] pb-[50px] shadow-[0px_4px_25px_rgba(0,0,0,0.06)]">
        {/* Back */}
        <div className="pl-[40px] mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
          >
            ← Back
          </button>
        </div>

        <div className="px-[200px]">
          {/* Logo */}
          <div className="flex justify-center mb-10">
            <div className="w-20 h-20 rounded-full border border-emerald-200 flex items-center justify-center">
              <Image
                src={method.logo}
                alt={method.name}
                width={42}
                height={42}
              />
            </div>
          </div>

          <div className="space-y-6">
            {/* Currency */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Select Payout Currency
              </label>

              <div className="relative">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full h-[58px] rounded-xl px-4 bg-[#F8F8F8] text-sm appearance-none outline-none cursor-pointer"
                >
                  <option>USD</option>
                  <option>GBP</option>
                  <option>EUR</option>
                </select>

                <ChevronDown className="absolute right-4 top-[20px] text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Select country
              </label>

              <div className="relative">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full h-[58px] rounded-xl px-4 bg-[#F8F8F8] text-sm appearance-none outline-none cursor-pointer"
                >
                  <option>Nigeria</option>
                  <option>Ghana</option>
                  <option>Kenya</option>
                </select>

                <ChevronDown className="absolute right-4 top-[20px] text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Enter paypal email
              </label>

              <input
                type="email"
                placeholder="Enter paypal email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[58px] rounded-xl px-4 bg-[#F8F8F8] text-sm outline-none placeholder:text-[#A0A0A0]"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Select Gender
              </label>

              <div className="relative">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full h-[58px] rounded-xl px-4 bg-[#F8F8F8] text-sm appearance-none outline-none cursor-pointer"
                >
                  <option value="">Enter gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>

                <ChevronDown className="absolute right-4 top-[20px] text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Tag */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Tag ID</label>

              <div className="relative">
                <input
                  value={tag}
                  placeholder="Paste Tag ID"
                  readOnly
                  className="w-full h-[58px] rounded-xl px-4 pr-10 bg-[#F8F8F8] text-sm outline-none placeholder:text-[#A0A0A0]"
                />

                {tag && (
                  <Copy
                    size={18}
                    onClick={copyTag}
                    className="absolute right-4 top-[20px] text-gray-400 cursor-pointer"
                  />
                )}
              </div>
            </div>

            {/* Select Amount */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Select Amount
              </label>

              <div className="grid grid-cols-4 gap-3 relative z-10">
                {PRESET_AMOUNTS.map((value) => {
                  const isSelected = amount === value;

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        setAmount(value);
                        setCustomAmount(value.toString());
                      }}
                      className={`h-[44px] rounded-xl border text-sm font-medium transition cursor-pointer
                      
                      ${
                        isSelected
                          ? "border-[#22C55E] bg-[#F0FDF4] text-[#16A34A]"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }
                      
                      `}
                    >
                      {value.toLocaleString()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Amount */}
            <input
              type="number"
              placeholder="Enter amount"
              value={customAmount}
              onChange={(e) => {
                const v = e.target.value;
                setCustomAmount(v);
                setAmount(v ? Number(v) : null);
              }}
              className="w-full h-[58px] rounded-xl px-4 bg-[#F8F8F8] text-sm outline-none placeholder:text-[#A0A0A0]"
            />

            {/* Rate */}
            <div className="flex justify-end">
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-md">
                {rate.toLocaleString()} per {currency}
              </span>
            </div>

            {/* Error */}
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            {/* Single Button */}
            <button
              onClick={handleButton}
              className="w-full h-[56px] rounded-xl bg-[#0E9F6E] text-white font-semibold cursor-pointer"
            >
              {tag ? "Continue" : "Generate Tag"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
