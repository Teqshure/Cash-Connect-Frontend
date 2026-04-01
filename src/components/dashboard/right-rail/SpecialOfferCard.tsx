"use client";

import Image from "next/image";

export default function SpecialOfferCard() {
  return (
    <section className="pt-4">
      <div
        className="w-[210px] h-[236px] rounded-[18px] p-6 text-white flex flex-col
        shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.1),0px_20px_25px_-5px_rgba(0,0,0,0.1)]"
        style={{
          background:
            "linear-gradient(135deg, #2563EB 0%, #9333EA 50%, #DB2777 100%)",
        }}
      >
        {/* Icon */}
        <Image
          src="/images/specialstar.png"
          alt="Special offer"
          width={32}
          height={32}
        />

        {/* Title */}
        <p className="mt-4 text-[14px] font-semibold">Special Offer!</p>

        {/* Description */}
        <p className="mt-2 text-[12px] text-white/85 leading-relaxed flex-1">
          Get 20% discount on all gift card purchases this week
        </p>

        {/* Button */}
        <button
          type="button"
          onClick={() => {
            window.location.href = "/more-screen";
          }}
          className="mt-4 w-full h-9 rounded-[14px] bg-white text-purple-700 text-[12px] font-semibold cursor-pointer"
        >
          Shop Now
        </button>
      </div>
    </section>
  );
}
