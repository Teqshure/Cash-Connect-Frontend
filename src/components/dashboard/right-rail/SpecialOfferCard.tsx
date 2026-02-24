"use client";

export default function SpecialOfferCard() {
  return (
    <section
      className="rounded-[18px] p-4 text-white shadow-[0_8px_10px_-6px_rgba(0,0,0,0.1),0_20px_25px_-5px_rgba(0,0,0,0.1)] w-[210px] h-[236px] flex flex-col"
      style={{
        background:
          "linear-gradient(180deg, #2563EB 0%, #9333EA 50%, #DB2777 100%)",
      }}
    >
      <div className="h-8 w-8 rounded-xl bg-white/15 grid place-items-center">
        <span className="text-base">✨</span>
      </div>

      <p className="mt-3 text-[13px] font-semibold tracking-tight">
        Special Offer!
      </p>

      <p className="mt-1.5 text-[11px] text-white/80 leading-relaxed flex-1">
        Get 20% discount on all gift card purchases this week
      </p>

      <button
        type="button"
        onClick={() => {
          // Navigate to "More Screen"
          window.location.href = "/more-screen";
        }}
        className="mt-2 w-full h-8 rounded-xl bg-white text-purple-700 text-[11px] font-semibold hover:opacity-95 transition duration-0"
      >
        Shop Now
      </button>
    </section>
  );
}
