// components/dashboard/receivePayment/ReceivePaymentMethodGrid.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useGlobalPaymentStore, UIPaymentMethod } from "@/store/globalPayment";

type Props = {
  onSelect: (method: UIPaymentMethod) => void;
};

export default function ReceivePaymentMethodGrid({ onSelect }: Props) {
  const [uiMethods, setUiMethods] = useState<UIPaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { fetchMethods, convertToUIMethods } = useGlobalPaymentStore();

  useEffect(() => {
    const loadMethods = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedMethods = await fetchMethods();
        if (
          fetchedMethods &&
          Array.isArray(fetchedMethods) &&
          fetchedMethods.length > 0
        ) {
          const converted = convertToUIMethods(fetchedMethods);
          if (converted && Array.isArray(converted) && converted.length > 0) {
            setUiMethods(converted);
          } else {
            setUiMethods([]);
          }
        } else {
          setUiMethods([]);
        }
      } catch (err: any) {
        console.error("Error loading payment methods:", err);
        setError(err.message || "Failed to load payment methods");
        setUiMethods([]);
      } finally {
        setLoading(false);
      }
    };

    loadMethods();
  }, [fetchMethods, convertToUIMethods]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
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

  if (uiMethods.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500 text-sm">No payment methods available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {uiMethods.map((method) => (
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
