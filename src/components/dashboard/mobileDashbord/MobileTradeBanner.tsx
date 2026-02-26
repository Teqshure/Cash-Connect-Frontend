"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const slides = [
  {
    id: 1,
    title: "Trade Crypto\nInstantly",
    subtitle: "Fast, Secure & Global Payments",
    discount: "20% Discount on all transfers",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
  },
  {
    id: 2,
    title: "Sell Gift Cards\nInstantly",
    subtitle: "Best Rates & Instant Payment",
    discount: "Top rates on all gift cards",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80",
  },
  {
    id: 3,
    title: "Send Money\nWorldwide",
    subtitle: "Zero Fees on First Transfer",
    discount: "Free transfers this week only",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80",
  },
];

export default function MobileTradeBanner() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="mt-6">
      {/* Slide */}
      <div className="relative overflow-hidden rounded-[24px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[current].id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            style={{
              background: "linear-gradient(135deg, #00BC7D 0%, #009966 100%)",
              boxShadow: "0px 8px 10px -6px #00BC7D33",
            }}
            className="rounded-[24px]"
          >
            {/* Main content */}
            <div className="flex items-end justify-between px-5 pt-5 gap-4">
              {/* Left */}
              <div className="flex-1 pb-5">
                <h3 className="text-[20px] font-bold text-white leading-tight whitespace-pre-line">
                  {slides[current].title}
                </h3>
                <p className="text-[13px] text-white/80 mt-2">
                  {slides[current].subtitle}
                </p>
                <button className="mt-4 flex items-center gap-2 bg-[#F5A623] text-white text-[14px] font-bold px-5 py-2.5 rounded-full shadow-md">
                  Start Now <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Right: image flush at bottom */}
              <div className="w-[130px] flex-shrink-0">
                <div className="rounded-tl-[20px] rounded-tr-[20px] overflow-hidden h-[155px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slides[current].image}
                    alt="banner"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Discount strip */}
            <div className="bg-white/15 px-5 py-2 text-center">
              <p className="text-[12px] text-white font-medium">
                {slides[current].discount}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      <div className="flex items-center justify-center gap-2 mt-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-[4px] rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-slate-600" : "w-5 bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
