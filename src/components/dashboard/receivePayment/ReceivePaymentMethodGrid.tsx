// components/dashboard/receivePayment/ReceivePaymentMethodGrid.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useGlobalPaymentStore, UIPaymentMethod } from "@/store/globalPayment";

type Props = {
  onSelect: (method: UIPaymentMethod) => void;
};

export default function ReceivePaymentMethodGrid({ onSelect }: Props) {
  const [uiMethods, setUiMethods] = useState<UIPaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { methods, fetchMethods, convertToUIMethods } = useGlobalPaymentStore();

  useEffect(() => {
    const loadMethods = async () => {
      try {
        setLoading(true);
        setError(null);
        await fetchMethods();
        const converted = convertToUIMethods(methods);
        setUiMethods(converted);
      } catch (err: any) {
        setError(err.message || "Failed to load payment methods");
      } finally {
        setLoading(false);
      }
    };

    loadMethods();
  }, [fetchMethods, convertToUIMethods, methods]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-[14px] border bg-gray-50 animate-pulse h-[120px]"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 text-sm mb-3">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-emerald-600 text-sm underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  const displayMethods = uiMethods.length > 0 ? uiMethods : getMockMethods();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {displayMethods.map((method) => (
        <button
          key={method.id}
          type="button"
          onClick={() => onSelect(method)}
          className="flex flex-col items-start gap-2 p-4 rounded-[14px] border border-slate-100 bg-white hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer text-left"
        >
          {/* Logo - FIXED with width/height */}
          <div className="h-10 w-full flex items-center">
            <Image
              src={method.logo}
              alt={method.name}
              width={32}
              height={32}
              className="h-8 w-auto object-contain"
              onError={(e) => {
                const target = e.currentTarget;
                target.src = "/images/payments/default.png";
              }}
            />
          </div>

          <div>
            <p className="text-[13px] font-semibold text-slate-800">
              {method.name}
            </p>
            <p className="text-[11px] text-slate-400">ETA: {method.eta}</p>
            <p className="text-[11px] text-slate-400">
              Fee Note: {method.feeNote}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

function getMockMethods(): UIPaymentMethod[] {
  return [
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
      name: "CashApp",
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
}
