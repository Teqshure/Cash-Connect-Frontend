"use client";

import {
  RECEIVE_PAYMENT_METHODS,
  ReceivePaymentMethod,
} from "./receivePaymentData";

type Props = {
  onSelect: (method: ReceivePaymentMethod) => void;
};

function ReceivePaymentMethodGrid({ onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {RECEIVE_PAYMENT_METHODS.map((method) => (
        <button
          key={method.id}
          type="button"
          onClick={() => onSelect(method)}
          className="flex flex-col items-start gap-2 p-4 rounded-[14px] border border-slate-100 bg-white hover:border-emerald-400 hover:shadow-md transition cursor-pointer"
        >
          <div className="h-10 w-full flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={method.logo}
              alt={method.name}
              className="h-8 w-auto object-contain"
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

export default ReceivePaymentMethodGrid;
