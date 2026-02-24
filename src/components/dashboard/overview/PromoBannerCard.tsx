"use client";

import Image from "next/image";

export default function PromoBannerCard() {
  return (
    <div
      className="
        w-full
        rounded-[24px]
        p-5
        text-white
        flex items-center justify-between gap-4
      "
      style={{
        background: "linear-gradient(135deg, #00BC7D 0%, #009966 100%)",
        boxShadow:
          "0px 8px 10px -6px rgba(0,188,125,0.20), 0px 20px 25px -5px rgba(0,188,125,0.20)",
      }}
    >
      <div className="min-w-0">
        <h4 className="text-lg font-semibold leading-6">
          Trade Crypto <br /> Instantly
        </h4>
        <p className="mt-2 text-xs opacity-90">
          Fast, Secure & Global Payments
        </p>

        <button className="mt-4 h-[36px] px-4 rounded-full bg-amber-400 text-slate-900 font-semibold hover:bg-amber-300 transition">
          Start Now →
        </button>

        <p className="mt-3 text-[11px] opacity-90">
          20% Discount on all transfers
        </p>
      </div>

      {/* Image area */}
      <div className="relative h-[96px] w-[120px] shrink-0 rounded-2xl overflow-hidden bg-white/10">
        <Image
          src="/images/dashboard/promo/trade-crypto.png"
          alt="Trade promo"
          fill
          className="object-cover"
          sizes="120px"
        />
      </div>
    </div>
  );
}
