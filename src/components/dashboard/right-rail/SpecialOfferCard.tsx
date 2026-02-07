"use client";

export default function SpecialOfferCard() {
  return (
    <section
      className="rounded-[18px] p-4 text-white shadow-[0_18px_50px_rgba(15,23,42,0.10)]"
      style={{
        background: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
      }}
    >
      <div className="h-9 w-9 rounded-[12px] bg-white/15 grid place-items-center">
        <span className="text-lg">✨</span>
      </div>

      <p className="mt-3 text-[12px] font-semibold">Special Offer!</p>

      <p className="mt-1 text-[11px] text-white/85 leading-relaxed">
        Get 20% discount on all gift card purchases this week
      </p>

      <button
        type="button"
        className="mt-3 w-full h-9 rounded-[12px] bg-white text-purple-700 text-[12px] font-semibold hover:opacity-95 transition"
      >
        Shop Now
      </button>
    </section>
  );
}
