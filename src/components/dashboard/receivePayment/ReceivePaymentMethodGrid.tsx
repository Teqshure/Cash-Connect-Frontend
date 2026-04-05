// components/dashboard/receivePayment/ReceivePaymentMethodGrid.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, ArrowLeft } from "lucide-react";
import { useGlobalPaymentStore, UIPaymentMethod } from "@/store/globalPayment";

type Props = {
  onSelect: (method: UIPaymentMethod) => void;
  onBack?: () => void; // ✅ Add optional onBack prop
};

export default function ReceivePaymentMethodGrid({ onSelect, onBack }: Props) {
  const [uiMethods, setUiMethods] = useState<UIPaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { fetchMethods, convertToUIMethods } = useGlobalPaymentStore();

  // ✅ Fetch methods from API on component mount
  useEffect(() => {
    const loadMethods = async () => {
      try {
        setLoading(true);
        setError(null);

        // Call the API
        const fetchedMethods = await fetchMethods();

        // Validate response
        if (
          fetchedMethods &&
          Array.isArray(fetchedMethods) &&
          fetchedMethods.length > 0
        ) {
          const converted = convertToUIMethods(fetchedMethods);

          if (converted && Array.isArray(converted) && converted.length > 0) {
            setUiMethods(converted);
          } else {
            setError("No payment methods available");
            setUiMethods([]);
          }
        } else {
          setError("No payment methods available");
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

  // ✅ Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-600 mb-4" />
        <p className="text-sm text-gray-500">Loading payment methods...</p>
      </div>
    );
  }

  // ✅ Error State
  if (error) {
    return (
      <div className="text-center py-12 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <p className="text-red-500 text-sm mb-4 font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  // ✅ Empty State
  if (uiMethods.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <p className="text-slate-500 text-sm">No payment methods available</p>
        {onBack && (
          <button
            onClick={onBack}
            className="mt-6 px-6 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition cursor-pointer"
          >
            Go Back
          </button>
        )}
      </div>
    );
  }

  // ✅ Success State - Display Methods Grid
  return (
    <div className="w-full">
      {/* Back button - only show if onBack is provided */}
      {onBack && (
        <div className="pl-2 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-800 transition font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {uiMethods.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => onSelect(method)}
            className="flex flex-col items-center gap-3 p-4 rounded-[16px] border border-slate-200 bg-white hover:border-emerald-400 hover:shadow-lg transition-all cursor-pointer group"
          >
            {/* Logo Container */}
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-emerald-50 transition">
              <Image
                src={method.logo}
                alt={method.name}
                width={32}
                height={32}
                className="object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = "/images/payments/default.png";
                }}
              />
            </div>

            {/* Method Info */}
            <div className="text-center">
              <p className="text-[13px] font-semibold text-slate-800 group-hover:text-emerald-600 transition">
                {method.name}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                ETA: {method.eta}
              </p>
              <p className="text-[11px] text-emerald-600 font-medium">
                {method.feeNote}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
