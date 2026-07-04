"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, User, Check, AlertCircle, TrendingUp } from "lucide-react";
import { CurrencyFlag, CountryFlag } from "@/components/ui/FlagIcon";
import {
  UIPaymentMethod,
  usePaymentMethodCurrencies,
  usePaymentMethodCountries,
  type Currency,
  type Country,
} from "@/store/globalPayment";

type Props = {
  method: UIPaymentMethod;
  onBack: () => void;
  onContinue: (data: {
    currency: string;
    country: string;
    gender: string;
    amount: number;
  }) => void;
  isLoading?: boolean;
};

const PRESET_AMOUNTS = [500, 1000, 3000, 5000];

const CURRENCY_FLAGS: Record<string, string> = {
  USD: "🇺🇸",
  GBP: "🇬🇧",
  CAD: "🇨🇦",
  EUR: "🇪🇺",
  NGN: "🇳🇬",
};

const CURRENCY_NAMES: Record<string, string> = {
  USD: "US Dollar",
  GBP: "British Pound",
  CAD: "Canadian Dollar",
  EUR: "Euro",
  NGN: "Nigerian Naira",
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  GBP: "£",
  CAD: "CA$",
  EUR: "€",
  NGN: "₦",
};

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export default function ReceivePaymentForm({
  method,
  onBack,
  onContinue,
  isLoading = false,
}: Props) {
  const {
    currencies,
    fetchCurrenciesForMethod,
    loading: currenciesLoading,
  } = usePaymentMethodCurrencies(method.paymentMethodId);

  const {
    countries,
    fetchCountriesForMethod,
    loading: countriesLoading,
  } = usePaymentMethodCountries(method.paymentMethodId);

  const [currency, setCurrency] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [error, setError] = useState("");
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const hasFetchedCurrencies = useRef(false);
  const hasFetchedCountries = useRef(false);
  const currencyRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);
  const genderRef = useRef<HTMLDivElement>(null);

  const isLoadingData = currenciesLoading || countriesLoading;

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        currencyRef.current &&
        !currencyRef.current.contains(event.target as Node)
      ) {
        setIsCurrencyOpen(false);
      }
      if (
        countryRef.current &&
        !countryRef.current.contains(event.target as Node)
      ) {
        setIsCountryOpen(false);
      }
      if (
        genderRef.current &&
        !genderRef.current.contains(event.target as Node)
      ) {
        setIsGenderOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!method?.paymentMethodId) return;

    if (
      !hasFetchedCurrencies.current &&
      currencies.length === 0 &&
      !currenciesLoading
    ) {
      hasFetchedCurrencies.current = true;
      const methodCode = method.code || method.name.toLowerCase();
      fetchCurrenciesForMethod(method.paymentMethodId, methodCode);
    }
  }, [
    method?.paymentMethodId,
    method?.code,
    method?.name,
    currencies.length,
    currenciesLoading,
    fetchCurrenciesForMethod,
  ]);

  useEffect(() => {
    if (!method?.paymentMethodId) return;

    if (
      !hasFetchedCountries.current &&
      countries.length === 0 &&
      !countriesLoading
    ) {
      hasFetchedCountries.current = true;
      const methodCode = method.code || method.name.toLowerCase();
      fetchCountriesForMethod(method.paymentMethodId, methodCode);
    }
  }, [
    method?.paymentMethodId,
    method?.code,
    method?.name,
    countries.length,
    countriesLoading,
    fetchCountriesForMethod,
  ]);

  useEffect(() => {
    if (currencies.length > 0 && !currency) {
      setCurrency(currencies[0].currency);
    }
  }, [currencies, currency]);

  useEffect(() => {
    if (countries.length > 0 && !country) {
      setCountry(countries[0].country);
    }
  }, [countries, country]);

  const finalAmount = amount ?? Number(customAmount || 0);

  const validate = useCallback(() => {
    if (!currency) return "Select payout currency";
    if (!country) return "Select country";
    if (!gender) return "Select gender";
    if (!finalAmount || finalAmount <= 0) return "Enter a valid amount";
    return "";
  }, [currency, country, gender, finalAmount]);

  const handleSubmit = useCallback(() => {
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    onContinue({ currency, country, gender, amount: finalAmount });
  }, [validate, currency, country, gender, finalAmount, onContinue]);

  const getSelectedGenderDisplay = () => {
    const selected = GENDER_OPTIONS.find((g) => g.value === gender);
    if (selected) {
      return (
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-emerald-600" />
          <span className="font-medium text-slate-800">{selected.label}</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <User className="w-5 h-5 text-gray-400" />
        <span className="text-gray-500">Enter gender</span>
      </div>
    );
  };

  if (initialLoading && currencies.length === 0 && countries.length === 0) {
    return (
      <div className="w-full flex justify-center pb-12 bg-[#F5F5F5] min-h-screen px-4">
        <div className="w-full max-w-[600px] bg-white rounded-[28px] pt-10 pb-12 shadow-[0px_4px_25px_rgba(0,0,0,0.06)]">
          <div className="px-6 sm:px-12 text-center">
            <div className="animate-pulse">
              <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-8"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading payment options...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center pb-12 bg-[#F5F5F5] min-h-screen px-4">
      <div className="w-full max-w-[600px] bg-white rounded-[28px] pt-10 pb-12 shadow-[0px_4px_25px_rgba(0,0,0,0.06)]">
        <div className="pl-6 mb-6">
          <button
            onClick={onBack}
            className="text-sm text-gray-600 cursor-pointer hover:text-gray-800 transition font-medium"
          >
            ← Back
          </button>
        </div>

        <div className="px-6 sm:px-12">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-full border border-emerald-200 flex items-center justify-center bg-white shadow-sm mb-3">
              <Image
                src={method.logo}
                alt={method.name}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {method.name}
            </h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-sm text-gray-600 mb-2 block font-medium">
                Select Payout Currency
              </label>

              {currencies.length === 0 && currenciesLoading ? (
                <div className="h-[56px] rounded-xl bg-gray-100 animate-pulse" />
              ) : (
                <div className="relative animate-in fade-in duration-200" ref={currencyRef}>
                  <button
                    type="button"
                    onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                    className="w-full h-[56px] rounded-xl px-4 bg-[#F8F8F8] cursor-pointer text-sm flex items-center justify-between hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-2">
                      <CurrencyFlag currency={currency} />
                      <div className="text-left">
                        <div className="font-medium">
                          {currency ? `${currency} (${CURRENCY_SYMBOLS[currency] || ""})` : "Select"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {currency
                            ? CURRENCY_NAMES[currency] || "Currency"
                            : "Choose currency"}
                        </div>
                      </div>
                    </div>
                    {isCurrencyOpen ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>

                  {isCurrencyOpen && currencies.length > 0 && (
                    <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
                      {currencies.map((c: Currency, index: number) => (
                        <button
                          key={c.id || index}
                          type="button"
                          onClick={() => {
                            setCurrency(c.currency);
                            setIsCurrencyOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition flex items-center justify-between ${
                            currency === c.currency ? "bg-emerald-50" : ""
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <CurrencyFlag currency={c.currency} />
                            <div>
                              <div className="font-semibold text-sm flex items-center gap-2 text-slate-800">
                                <span>{c.currency} ({CURRENCY_SYMBOLS[c.currency] || ""})</span>
                                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-100/50 font-bold">
                                  Rate: ₦{parseFloat(c.buy_rate).toLocaleString()}
                                </span>
                              </div>
                              <div className="text-xs text-gray-400">
                                {CURRENCY_NAMES[c.currency] || "Currency"}
                              </div>
                            </div>
                          </div>
                          {currency === c.currency && (
                            <Check className="w-4 h-4 text-emerald-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Selected Rate Info Box */}
                  {currency && (() => {
                    const selectedC = currencies.find((c: any) => c.currency === currency);
                    if (!selectedC) return null;
                    return (
                      <div className="mt-2 text-[13px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100/50 rounded-xl px-3.5 py-2.5 animate-in fade-in slide-in-from-top-1 duration-200 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Exchange Rate: 1 {currency} = ₦{parseFloat(selectedC.buy_rate).toLocaleString()} NGN</span>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block font-medium">
                Select Country
              </label>

              {countries.length === 0 && countriesLoading ? (
                <div className="h-[56px] rounded-xl bg-gray-100 animate-pulse" />
              ) : (
                <div className="relative" ref={countryRef}>
                  <button
                    type="button"
                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                    className="w-full h-[56px] rounded-xl px-4 bg-[#F8F8F8] cursor-pointer text-sm flex items-center justify-between hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-2">
                      <CountryFlag countryName={country} />
                      <div className="text-left">
                        <div className="font-medium">{country || "Select"}</div>
                      </div>
                    </div>
                    {isCountryOpen ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>

                  {isCountryOpen && countries.length > 0 && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
                      {countries.map((c: Country, index: number) => (
                        <button
                          key={c.id || index}
                          type="button"
                          onClick={() => {
                            setCountry(c.country);
                            setIsCountryOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition flex items-center justify-between ${
                            country === c.country ? "bg-emerald-50" : ""
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <CountryFlag countryName={c.country} />
                            <span className="text-sm">{c.country}</span>
                          </div>
                          {country === c.country && (
                            <Check className="w-4 h-4 text-emerald-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block font-medium">
                Select Gender
              </label>

              <div className="relative" ref={genderRef}>
                <button
                  type="button"
                  onClick={() => setIsGenderOpen(!isGenderOpen)}
                  className="w-full h-[56px] rounded-xl px-4 bg-[#F8F8F8] cursor-pointer text-sm flex items-center justify-between hover:bg-gray-100 transition"
                >
                  {getSelectedGenderDisplay()}
                  {isGenderOpen ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>

                {isGenderOpen && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                    {GENDER_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setGender(option.value);
                          setIsGenderOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition flex items-center justify-between ${
                          gender === option.value ? "bg-emerald-50" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-medium">
                            {option.label}
                          </span>
                        </div>
                        {gender === option.value && (
                          <Check className="w-4 h-4 text-emerald-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block font-medium">
                Expected Amount
              </label>

              <div className="grid grid-cols-4 gap-3 mb-3">
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
                      className={`h-[44px] rounded-xl border text-xs font-semibold transition-all cursor-pointer truncate px-1
                        ${
                          isSelected
                            ? "border-[#22C55E] bg-[#F0FDF4] text-[#16A34A] shadow-sm"
                            : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                        }
                      `}
                    >
                      {CURRENCY_SYMBOLS[currency] || currency || ""}{value.toLocaleString()}
                    </button>
                  );
                })}
              </div>

              <div className="relative">
                {currency && (
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                    {CURRENCY_SYMBOLS[currency] || currency}
                  </span>
                )}
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => {
                    const v = e.target.value;
                    setCustomAmount(v);
                    setAmount(v ? Number(v) : null);
                  }}
                  className={`w-full h-[56px] rounded-xl bg-[#F8F8F8] text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition ${currency ? "pl-9 pr-4" : "px-4"}`}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm flex items-center justify-center gap-1.5 bg-red-50 py-3 rounded-xl border border-red-100 px-4">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={
                isLoading || currencies.length === 0 || countries.length === 0
              }
              className={`w-full h-[56px] rounded-xl cursor-pointer text-white font-semibold transition-all duration-200 mt-4
                ${
                  isLoading || currencies.length === 0 || countries.length === 0
                    ? "bg-emerald-400 cursor-not-allowed opacity-70"
                    : "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-md hover:shadow-lg active:scale-[0.98]"
                }
              `}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : currencies.length === 0 || countries.length === 0 ? (
                "Loading options..."
              ) : (
                "Generate Payment Account"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
