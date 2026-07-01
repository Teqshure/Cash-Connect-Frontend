"use client";

import { ArrowRight } from "lucide-react";

export default function ExchangePromoCard() {
  return (
    <div
      className="
        relative
        h-full
        w-full
        rounded-[24px]
        overflow-hidden
        
        px-6 py-6
        text-white
        flex flex-col justify-between
      "
      style={{
        background: "linear-gradient(135deg, #1E90FF 0%, #18C48F 100%)",
        boxShadow:
          "0px 10px 20px rgba(2,132,199,0.25), 0px 6px 10px rgba(0,0,0,0.06)",
      }}
    >
      {/* TEXT */}
      <div className="z-10 max-w-[240px]">
        <p className="text-[13px] text-white/90">Your All-in-One</p>

        <h3 className="text-[18px] font-semibold mt-1">Exchange Hub</h3>

        <p className="text-[14px] mt-3 text-white/90 leading-[20px]">
          Trade Crypto, Giftcards <br />& Receive Payments Worldwide.
        </p>

        <button
          className="
            mt-5
            h-[42px]
            px-6
            rounded-[14px]
            cursor-pointer
            bg-[#0AA66E]
            text-[14px] font-semibold
            flex items-center gap-2
            hover:brightness-110
          "
        >
          Start Trading <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* ICON CLUSTER (CLEAN + BALANCED) */}
      <div className="absolute right-8 top-8 w-[150px] h-[150px]">
        {/* BTC - top */}
        <div className="absolute top-0 right-10 h-[34px] w-[34px] rounded-full bg-[#F59E0B] flex items-center justify-center shadow-md">
          <span className="text-[13px] font-bold">₿</span>
        </div>

        {/* Purple */}
        <div className="absolute top-[28px] right-0 h-[36px] w-[36px] rounded-full bg-[#7C3AED] flex items-center justify-center shadow-md">
          <span className="text-[13px] font-bold">≡</span>
        </div>

        {/* Arrow (center focus) */}
        <div className="absolute top-[60px] right-[55px] h-[34px] w-[34px] rounded-full bg-[#0EA5E9] flex items-center justify-center shadow-md">
          <span className="text-[12px] font-bold">↗</span>
        </div>

        {/* Dollar */}
        <div className="absolute top-[85px] right-[10px] h-[36px] w-[36px] rounded-full bg-[#10B981] flex items-center justify-center shadow-md">
          <span className="text-[13px] font-bold">$</span>
        </div>

        {/* Yellow coin - bottom anchor */}
        <div className="absolute bottom-0 right-[40px] h-[38px] w-[38px] rounded-full bg-[#FACC15] flex items-center justify-center shadow-md">
          <span className="text-[13px] font-bold">◎</span>
        </div>
      </div>
    </div>
  );
}
