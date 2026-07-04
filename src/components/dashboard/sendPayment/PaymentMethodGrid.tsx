"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useGlobalPaymentStore, UIPaymentMethod } from "@/store/globalPayment";

type Props = {
  onSelect: (method: UIPaymentMethod) => void;
};

export default function PaymentMethodGrid({ onSelect }: Props) {
  const methods = useGlobalPaymentStore((s: any) => s.methods);
  const loading = useGlobalPaymentStore((s: any) => s.loading);
  const error = useGlobalPaymentStore((s: any) => s.error);
  const fetchMethods = useGlobalPaymentStore((s: any) => s.fetchMethods);
  const convertToUIMethods = useGlobalPaymentStore(
    (s: any) => s.convertToUIMethods,
  );

  useEffect(() => {
    fetchMethods();
  }, [fetchMethods]);

  // -----------------------------------
  // Fallback Methods (only if API empty)
  // -----------------------------------
  const fallbackMethods: UIPaymentMethod[] = [
    {
      id: "paypal",
      name: "PayPal",
      logo: "/images/payments/paypal.png",
      eta: "Instant",
      feeNote: "2%",
    },
    {
      id: "zelle",
      name: "Zelle",
      logo: "/images/payments/zelle.png",
      eta: "Instant",
      feeNote: "2%",
    },
    {
      id: "western-union",
      name: "Western Union",
      logo: "/images/payments/western-union.png",
      eta: "Instant",
      feeNote: "2%",
    },
    {
      id: "moneygram",
      name: "MoneyGram",
      logo: "/images/payments/money-gram.png",
      eta: "Instant",
      feeNote: "2%",
    },
    {
      id: "venmo",
      name: "Venmo",
      logo: "/images/payments/venmo.png",
      eta: "Instant",
      feeNote: "2%",
    },
    {
      id: "cashapp",
      name: "Cash App",
      logo: "/images/payments/cashapp.png",
      eta: "Instant",
      feeNote: "2%",
    },
    {
      id: "payoneer",
      name: "Payoneer",
      logo: "/images/payments/payoneer.png",
      eta: "Instant",
      feeNote: "2%",
    },
    {
      id: "skrill",
      name: "Skrill",
      logo: "/images/payments/skrill.png",
      eta: "Instant",
      feeNote: "2%",
    },
  ];

  const apiMethods = convertToUIMethods(methods);

  const uiMethods =
    apiMethods && apiMethods.length > 0 ? apiMethods : fallbackMethods;

  // -------------------------------
  // Loading State
  // -------------------------------
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  // -------------------------------
  // Error State
  // -------------------------------
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-red-500">{error}</p>

        <button
          onClick={fetchMethods}
          className="mt-3 text-sm text-emerald-600 hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  // -------------------------------
  // Payment Methods UI
  // -------------------------------
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {uiMethods.map((method: UIPaymentMethod) => (
        <button
          key={method.id}
          type="button"
          onClick={() => onSelect(method)}
          className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-100 bg-white hover:border-emerald-400 hover:shadow-md transition"
        >
          <div className="relative w-12 h-12">
            <Image
              src={method.logo}
              alt={method.name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold text-slate-800">
              {method.name}
            </p>

            <p className="text-xs text-slate-400">ETA: {method.eta}</p>

            <p className="text-xs text-slate-400">Fee: {method.feeNote}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
