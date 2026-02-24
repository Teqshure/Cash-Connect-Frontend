"use client";

import { ArrowRight } from "lucide-react";

export default function ExchangePromoCard() {
  return (
    <div
      className="
        relative
        h-[225px]
        w-full
        min-w-0
        rounded-[24px]
        overflow-hidden
        px-6 py-6
        text-white
      "
      style={{
        background: "linear-gradient(135deg, #0AA6D6 0%, #18C48F 100%)",
        boxShadow:
          "0px 8px 10px -6px rgba(2,132,199,0.18), 0px 20px 25px -5px rgba(2,132,199,0.18)",
      }}
    >
      {/* Left content (matches Figma scale) */}
      <div className="relative z-10 max-w-[230px]">
        <p className="text-[14px] leading-[18px] font-medium text-white/90">
          Your All-in-One
        </p>

        {/* Figma shows this smaller, not headline-big */}
        <h3 className="mt-1 text-[16px] leading-[20px] font-semibold text-white/95">
          Exchange Hub
        </h3>

        <p className="mt-4 text-[14px] leading-[20px] text-white/90">
          Trade Crypto, Giftcards
          <br />
          &amp; Send Payments
          <br />
          Worldwide.
        </p>

        {/* Button: rounded rectangle (not pill) */}
        <button
          type="button"
          className="
            mt-5
            inline-flex items-center gap-2
            h-[44px]
            px-6
            rounded-[14px]
            bg-[#0AA66E]
            text-[14px] font-semibold
            hover:brightness-110
            transition
            cursor-pointer
          "
        >
          Start Trading <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Coins: smaller + pushed right like Figma */}
      <div className="absolute right-6 top-7 h-[160px] w-[160px]">
        <div className="absolute right-[78px] top-[0px] h-[38px] w-[38px] rounded-full bg-[#F59E0B] shadow-md grid place-items-center">
          <span className="text-[15px] font-bold">₿</span>
        </div>

        <div className="absolute right-[20px] top-[34px] h-[44px] w-[44px] rounded-full bg-[#7C3AED] shadow-md grid place-items-center">
          <span className="text-[15px] font-bold">≡</span>
        </div>

        <div className="absolute right-[86px] top-[82px] h-[46px] w-[46px] rounded-full bg-[#10B981] shadow-md grid place-items-center">
          <span className="text-[15px] font-bold">$</span>
        </div>

        <div className="absolute right-[2px] top-[92px] h-[44px] w-[44px] rounded-full bg-[#0EA5E9] shadow-md grid place-items-center">
          <span className="text-[15px] font-bold">↗</span>
        </div>

        <div className="absolute right-[34px] top-[132px] h-[42px] w-[42px] rounded-full bg-[#FACC15] shadow-md grid place-items-center">
          <span className="text-[15px] font-bold">◎</span>
        </div>
      </div>
    </div>
  );
}
