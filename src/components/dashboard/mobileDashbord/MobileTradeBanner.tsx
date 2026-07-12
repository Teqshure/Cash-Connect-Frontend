"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const DEFAULT_SLIDES = [
  {
    id: 1,
    title: "Trade Crypto\nInstantly",
    subtitle: "Fast, Secure & Global Payments",
    discount: "20% Discount on all transfers",
    image_url: "/images/dashboard/packet.png",
    button_text: "Start Now",
    link_url: "/sell-crypto",
  },
  {
    id: 2,
    title: "Sell Gift Cards\nInstantly",
    subtitle: "Best Rates & Instant Payment",
    discount: "Top rates on all gift cards",
    image_url: "/images/btc_large.png",
    button_text: "Start Now",
    link_url: "/buy-giftcard",
  },
  {
    id: 3,
    title: "Send Money\nWorldwide",
    subtitle: "Zero Fees on First Transfer",
    discount: "Free transfers this week only",
    image_url: "/images/dashboard/our_story.jpg",
    button_text: "Start Now",
    link_url: "/receive-payment",
  },
];

export default function MobileTradeBanner() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState(DEFAULT_SLIDES);

  const getApiUrl = () => {
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      if (host.includes("localhost") || host.includes("127.0.0.1")) {
        return "http://localhost:8000/api/v1";
      }
    }
    return "https://api.cashconnectworld.com/api/v1";
  };

  const getImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("/storage/")) {
      if (typeof window !== "undefined") {
        const host = window.location.hostname;
        if (host.includes("localhost") || host.includes("127.0.0.1")) {
          return `http://localhost:8000${url}`;
        }
      }
      return `https://api.cashconnectworld.com${url}`;
    }
    return url;
  };

  useEffect(() => {
    let active = true;
    const fetchAdverts = async () => {
      try {
        const baseUrl = getApiUrl();
        const res = await fetch(`${baseUrl}/adverts`);
        if (!res.ok) throw new Error("Failed to fetch adverts");
        const json = await res.json();
        if (active && json.status && json.data && json.data.length > 0) {
          const mapped = json.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            subtitle: item.subtitle || "",
            discount: item.discount || "",
            image_url: item.image_url || "/images/dashboard/packet.png",
            button_text: item.button_text || "Start Now",
            link_url: item.link_url || "/dashboard",
          }));
          setSlides(mapped);
        }
      } catch (err) {
        console.warn("Using fallback static mobile slides:", err);
      }
    };
    fetchAdverts();
    return () => {
      active = false;
    };
  }, []);

  const activeSlide = slides[current] || slides[0] || DEFAULT_SLIDES[0];

  return (
    <div className="mt-6">
      {/* Slide */}
      <div className="relative overflow-hidden rounded-[24px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
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
                  {activeSlide.title}
                </h3>
                <p className="text-[13px] text-white/80 mt-2">
                  {activeSlide.subtitle}
                </p>
                <button 
                  onClick={() => router.push(activeSlide.link_url)}
                  className="mt-4 flex items-center gap-2 bg-[#F5A623] hover:bg-[#F5A623]/95 transition text-white text-[14px] font-bold px-5 py-2.5 rounded-full shadow-md cursor-pointer"
                >
                  {activeSlide.button_text} <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Right: image flush at bottom */}
              <div className="w-[130px] flex-shrink-0">
                <div className="rounded-tl-[20px] rounded-tr-[20px] overflow-hidden h-[155px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getImageUrl(activeSlide.image_url)}
                    alt="banner"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Discount strip */}
            <div className="bg-white/15 px-5 py-2 text-center">
              <p className="text-[12px] text-white font-medium">
                {activeSlide.discount}
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
