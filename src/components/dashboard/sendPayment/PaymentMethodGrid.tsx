"use client";

/**
 * PaymentMethodGrid
 * Displays a grid of selectable payment method cards.
 * Used in both desktop and mobile send payment flows.
 */

import Image from "next/image";
import { PAYMENT_METHODS, PaymentMethod } from "./sendPaymentData";

type Props = {
  onSelect: (method: PaymentMethod) => void;
};

export default function PaymentMethodGrid({ onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {PAYMENT_METHODS.map((method) => (
        <button
          key={method.id}
          type="button"
          onClick={() => onSelect(method)}
          className="
            flex flex-col items-center gap-2 p-4
            rounded-[14px] border border-slate-100
            bg-white hover:border-emerald-400 hover:shadow-md
            transition cursor-pointer text-left
          "
        >
          {/* Logo placeholder — replace path with actual asset */}
          <div className="h-10 w-full relative">
            <Image
              src={method.logo}
              alt={method.name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="w-full">
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
