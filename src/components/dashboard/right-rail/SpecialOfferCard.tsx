import { useState, useEffect } from "react";
import Image from "next/image";

export default function SpecialOfferCard() {
  const [advert, setAdvert] = useState<{ title: string; discount: string; link_url: string; button_text: string } | null>(null);

  useEffect(() => {
    let active = true;
    const fetchAdverts = async () => {
      try {
        const host = typeof window !== "undefined" ? window.location.hostname : "";
        const baseUrl = (host.includes("localhost") || host.includes("127.0.0.1")) 
          ? "http://localhost:8000/api/v1" 
          : "https://api.cashconnectworld.com/api/v1";
        
        const res = await fetch(`${baseUrl}/adverts`);
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        if (active && json.status && json.data && json.data.length > 0) {
          setAdvert({
            title: json.data[0].title.replace("\n", " "),
            discount: json.data[0].discount || json.data[0].subtitle || "",
            link_url: json.data[0].link_url || "/dashboard",
            button_text: json.data[0].button_text || "Shop Now",
          });
        }
      } catch (err) {
        console.warn("Using fallback static desktop advert:", err);
      }
    };
    fetchAdverts();
    return () => {
      active = false;
    };
  }, []);

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
        <p className="mt-4 text-[14px] font-semibold">{advert ? advert.title : "Special Offer!"}</p>

        {/* Description */}
        <p className="mt-2 text-[12px] text-white/85 leading-relaxed flex-1">
          {advert ? advert.discount : "Get 20% discount on all gift card purchases this week"}
        </p>

        {/* Button */}
        <button
          type="button"
          onClick={() => {
            window.location.href = advert ? advert.link_url : "/more-screen";
          }}
          className="mt-4 w-full h-9 rounded-[14px] bg-white text-purple-700 text-[12px] font-semibold cursor-pointer"
        >
          {advert ? advert.button_text : "Shop Now"}
        </button>
      </div>
    </section>
  );
}
