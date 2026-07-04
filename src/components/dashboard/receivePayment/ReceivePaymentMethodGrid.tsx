// components/dashboard/receivePayment/ReceivePaymentMethodGrid.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, ArrowLeft } from "lucide-react";
import { useGlobalPaymentStore, UIPaymentMethod } from "@/store/globalPayment";

type Props = {
  onSelect: (method: UIPaymentMethod) => void;
  onBack?: () => void;
};

export interface StaticUIPaymentMethod {
  id: string;
  name: string;
  logo: string;
  eta: string;
  feeNote: string;
  matchNames: string[];
}

export const STATIC_METHODS: StaticUIPaymentMethod[] = [
  { id: "paypal", name: "PayPal", logo: "/images/payments/paypal.png", eta: "Instant", feeNote: "Check rates", matchNames: ["paypal"] },
  { id: "venmo", name: "Venmo", logo: "/images/payments/venmo.png", eta: "Instant", feeNote: "Check rates", matchNames: ["venmo"] },
  { id: "zelle", name: "Zelle", logo: "/images/payments/zelle.png", eta: "Instant", feeNote: "Check rates", matchNames: ["zelle"] },
  { id: "cash-app", name: "Cash App", logo: "/images/payments/cashapp.png", eta: "Instant", feeNote: "Check rates", matchNames: ["cash app", "cashapp"] },
  { id: "revolut-wise", name: "Revolut / Wise", logo: "/images/payments/wise.png", eta: "Instant", feeNote: "Check rates", matchNames: ["revolut", "wise", "revolut / wise"] },
  { id: "bank-wire-transfer", name: "Bank Wire Transfer", logo: "/images/payments/wise.png", eta: "Instant", feeNote: "Check rates", matchNames: ["bank wire", "wire transfer", "bank wire transfer"] },
];

export default function ReceivePaymentMethodGrid({ onSelect, onBack }: Props) {
  const [apiMethods, setApiMethods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { fetchMethods } = useGlobalPaymentStore();

  useEffect(() => {
    const loadMethods = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedMethods = await fetchMethods();
        if (fetchedMethods && Array.isArray(fetchedMethods)) {
          setApiMethods(fetchedMethods);
        }
      } catch (err: any) {
        console.error("Error loading payment methods:", err);
        setError(err.message || "Failed to load payment methods");
      } finally {
        setLoading(false);
      }
    };

    loadMethods();
  }, [fetchMethods]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-600 mb-4" />
        <p className="text-sm text-gray-500">Loading payment methods...</p>
      </div>
    );
  }

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

  return (
    <div className="w-full">
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
        {STATIC_METHODS.map((staticMethod) => {
          // Find if there is any matching active method from the database
          const apiMethod = apiMethods.find((am: any) =>
            staticMethod.matchNames.some(name => am.name.toLowerCase().includes(name))
          );

          const hasAccounts = apiMethod && apiMethod.accounts && apiMethod.accounts.length > 0;

          const uiMethod: UIPaymentMethod = {
            id: staticMethod.id,
            name: staticMethod.name,
            logo: staticMethod.logo,
            eta: staticMethod.eta,
            feeNote: staticMethod.feeNote,
            code: apiMethod?.code || staticMethod.id,
            paymentMethodId: apiMethod?.id,
            accounts: hasAccounts ? apiMethod.accounts : [],
          };

          return (
            <button
              key={staticMethod.id}
              type="button"
              onClick={() => onSelect(uiMethod)}
              className="flex flex-col items-center gap-3 p-4 rounded-[16px] border border-slate-200 bg-white hover:border-emerald-400 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-emerald-50 transition">
                <Image
                  src={staticMethod.logo}
                  alt={staticMethod.name}
                  width={32}
                  height={32}
                  className="object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = "/images/payments/default.png";
                  }}
                />
              </div>

              <div className="text-center w-full flex flex-col items-center">
                <p className="text-[13px] font-semibold text-slate-800 group-hover:text-emerald-600 transition">
                  {staticMethod.name}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  ETA: {staticMethod.eta}
                </p>
                {apiMethod?.currencies && apiMethod.currencies.length > 0 ? (
                  <div className="flex flex-col gap-0.5 mt-2 border-t border-slate-100 pt-1.5 w-full items-center">
                    {apiMethod.currencies.map((c: any) => (
                      <p key={c.id} className="text-[10px] font-bold text-emerald-600 bg-emerald-50/50 px-2 py-0.5 rounded border border-emerald-100/30">
                        {c.currency}: ₦{parseFloat(c.buy_rate).toLocaleString()}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-emerald-600 font-medium mt-1">
                    {staticMethod.feeNote}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
