"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Copy, ChevronDown, Loader2 } from "lucide-react";
import { UIPaymentMethod, usePaymentMethodRate } from "@/store/globalPayment";
import { CurrencyFlag, CountryFlag } from "@/components/ui/FlagIcon";

export type PaymentFormData = {
  email: string;
  currency: string;
  country: string;
  gender: string;
  amount: number;
  tagId: string;
};

type Props = {
  method: UIPaymentMethod;
  onBack: () => void;
  onContinue: (data: PaymentFormData) => void;
};

const PRESET_AMOUNTS = [500, 1000, 3000, 5000];

export default function SendPaymentForm({ method, onBack, onContinue }: Props) {
  const rate = usePaymentMethodRate(method);

  const [currency, setCurrency] = useState("USD");
  const [country, setCountry] = useState("Nigeria");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [tag, setTag] = useState("");

  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const currencyRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setIsCurrencyOpen(false);
      }
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tagVerified, setTagVerified] = useState(false);

  const finalAmount = amount ?? Number(customAmount || 0);
  const convertedNGN = finalAmount ? finalAmount * rate : 0;

  const generateTag = () => {
    const newTag =
      "TAG-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    setTag(newTag);
    setTagVerified(false);
  };

  const copyTag = () => {
    if (!tag) return;
    navigator.clipboard.writeText(tag);
  };

  const verifyTag = async () => {
    if (!tag) return;

    setLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 1000));
      setTagVerified(true);
    } catch {
      setError("Tag verification failed");
    }

    setLoading(false);
  };

  const validate = () => {
    if (!currency) return "Select payout currency";
    if (!country) return "Select country";
    if (!email) return "Enter PayPal email";
    if (!gender) return "Select gender";
    if (!finalAmount) return "Select or enter amount";
    if (!tagVerified) return "Verify tag before continuing";
    return "";
  };

  const handleContinue = async () => {
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

    try {
      setLoading(true);

      const data: PaymentFormData = {
        email,
        currency,
        country,
        gender,
        amount: finalAmount,
        tagId: tag,
      };

      onContinue(data);
    } catch (err: any) {
      setError(err?.message || "Transaction failed");
    }

    setLoading(false);
  };

  return (
    <div className="w-full flex justify-center bg-[#F5F5F5] min-h-screen py-12">
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

        {/* FORM CONTAINER */}
        <div className="w-[446px] min-h-[775px] mx-auto flex flex-col gap-6">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full border border-emerald-200 flex items-center justify-center">
              <Image
                src={method.logo}
                alt={method.name}
                width={42}
                height={42}
              />
            </div>
          </div>

          {/* Currency */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">
              Select Payout Currency
            </label>

            <div className="relative" ref={currencyRef}>
              <button
                type="button"
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                className="w-[446px] h-[58px] rounded-[12px] px-[16px] py-[14px] bg-white text-sm flex items-center justify-between outline-none shadow-[104px_-5px_103.2px_0px_#0000001A] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <CurrencyFlag currency={currency} />
                  <span>{currency}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isCurrencyOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCurrencyOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
                  {["USD", "GBP", "EUR"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCurrency(c);
                        setIsCurrencyOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 cursor-pointer"
                    >
                      <CurrencyFlag currency={c} />
                      <span className="text-sm font-medium">{c}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">
              Select country
            </label>

            <div className="relative" ref={countryRef}>
              <button
                type="button"
                onClick={() => setIsCountryOpen(!isCountryOpen)}
                className="w-[446px] h-[58px] rounded-[12px] px-[16px] py-[14px] bg-white text-sm flex items-center justify-between outline-none shadow-[104px_-5px_103.2px_0px_#0000001A] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <CountryFlag countryName={country} />
                  <span>{country}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCountryOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
                  {["Nigeria", "Ghana", "Kenya"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCountry(c);
                        setIsCountryOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 cursor-pointer"
                    >
                      <CountryFlag countryName={c} />
                      <span className="text-sm font-medium">{c}</span>
                    </button>
                  ))}
                </div>
              )}
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
              className="w-[446px] h-[58px] rounded-[12px] px-[16px] py-[14px] bg-white text-sm outline-none placeholder:text-[#A0A0A0] shadow-[104px_-5px_103.2px_0px_#0000001A]"
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
                className="w-[446px] h-[58px] rounded-[12px] px-[16px] py-[14px] bg-white text-sm appearance-none outline-none shadow-[104px_-5px_103.2px_0px_#0000001A]"
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
                className="w-[446px] h-[58px] rounded-[12px] px-[16px] py-[14px] bg-white text-sm outline-none shadow-[104px_-5px_103.2px_0px_#0000001A]"
              />

              {tag && (
                <>
                  <Copy
                    size={18}
                    onClick={copyTag}
                    className="absolute right-10 top-[20px] text-gray-400 cursor-pointer"
                  />

                  <button
                    onClick={verifyTag}
                    className="absolute right-3 top-[14px] text-xs bg-green-100 text-green-700 px-2 py-1 rounded cursor-pointer"
                  >
                    Verify
                  </button>
                </>
              )}
            </div>

            {tagVerified && (
              <p className="text-green-600 text-xs mt-1">Tag verified ✓</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">
              Select Amount
            </label>

            <div className="grid grid-cols-4 gap-3">
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
                    }`}
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
            className="w-[446px] h-[58px] rounded-[12px] px-[16px] py-[14px] bg-white text-sm outline-none shadow-[104px_-5px_103.2px_0px_#0000001A]"
          />

          {/* Conversion */}
          {finalAmount > 0 && (
            <div className="text-right text-sm text-gray-600">
              ≈ ₦{convertedNGN.toLocaleString()}
            </div>
          )}

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

          {/* Button */}
          <button
            onClick={handleContinue}
            disabled={loading}
            className="w-[446px] h-[56px] rounded-xl bg-[#0E9F6E] text-white font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading && <Loader2 className="animate-spin w-4 h-4" />}
            {tag ? "Continue" : "Generate Tag"}
          </button>
        </div>
      </div>
    </div>
  );
}
