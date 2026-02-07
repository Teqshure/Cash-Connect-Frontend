"use client";

import { ArrowRight } from "lucide-react";

export default function ExchangePromoCard() {
  return (
    <div
      className="w-[440px] h-[225px] rounded-[24px] p-6 text-white relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0B6CFF 0%, #14B8A6 100%)",
        boxShadow:
          "0px 10px 18px rgba(15,23,42,0.10), 0px 25px 50px rgba(15,23,42,0.10)",
      }}
    >
      {/* Text */}
      <div className="space-y-3">
        <p className="text-[16px] font-semibold leading-tight">
          Your All-in-One
          <br />
          Exchange Hub
        </p>

        <p className="text-[13px] text-white/85 leading-relaxed">
          Trade Crypto, Giftcards
          <br />
          &amp; Send Payments
          <br />
          Worldwide.
        </p>
      </div>

      {/* CTA */}
      <button
        type="button"
        className="mt-6 inline-flex items-center gap-2 h-11 px-5 rounded-[14px] bg-emerald-500 text-white text-sm font-semibold hover:opacity-95 transition"
      >
        Start Trading <ArrowRight className="h-4 w-4" />
      </button>

      {/* Floating icons placeholders (replace with your assets later) */}
      <div className="absolute right-14 top-9 h-10 w-10 rounded-full bg-amber-400/90 grid place-items-center font-bold">
        ₿
      </div>
      <div className="absolute right-6 top-16 h-10 w-10 rounded-full bg-indigo-400/90 grid place-items-center font-bold">
        ≡
      </div>
      <div className="absolute right-16 bottom-14 h-10 w-10 rounded-full bg-emerald-300/90 grid place-items-center font-bold">
        $
      </div>
      <div className="absolute right-8 bottom-10 h-9 w-9 rounded-full bg-cyan-300/90 grid place-items-center font-bold">
        ↗
      </div>
      <div className="absolute right-4 bottom-20 h-9 w-9 rounded-full bg-yellow-300/90 grid place-items-center font-bold">
        ₿
      </div>
    </div>
  );
}
