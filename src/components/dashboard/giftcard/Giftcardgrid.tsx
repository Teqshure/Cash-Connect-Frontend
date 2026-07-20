"use client";

import { useState, useMemo } from "react";
import { Search, Loader2 } from "lucide-react";
import { GiftCard } from "@/store/giftCardStore";

type Props = {
  title: string;
  giftCards: GiftCard[];
  isLoading?: boolean;
  onSelect: (card: GiftCard) => void;
  onBack: () => void;
};

const BRAND_LOGOS: Record<string, string> = {
  "amazon": "/images/giftcards/amazons.png",
  "itunes": "/images/giftcards/itunes.png",
  "apple": "/images/giftcards/itunes.png",
  "steam": "/images/giftcards/steam.svg",
  "google": "/images/giftcards/googleplay.svg",
  "play": "/images/giftcards/googleplay.svg",
  "sephora": "/images/giftcards/sephora.png",
  "nordstrom": "/images/giftcards/nordstorm.png",
  "ebay": "/images/giftcards/ebay.png",
  "razer": "/images/giftcards/razer.png",
  "xbox": "/images/giftcards/xbox.svg",
  "playstation": "/images/giftcards/playstation.png",
  "psn": "/images/giftcards/playstation.png",
  "nike": "/images/giftcards/nike.png",
  "vanilla": "/images/giftcards/vanilla.svg",
  "visa": "/images/giftcards/vanilla.svg",
  "walmart": "/images/giftcards/walmart.svg",
  "target": "/images/giftcards/target.svg",
  "macy": "/images/giftcards/macys.svg",
  "roblox": "/images/giftcards/roblox.svg",
  "foot": "/images/giftcards/footlocker.svg",
  "locker": "/images/giftcards/footlocker.svg",
  "american": "/images/giftcards/amex.svg",
  "amex": "/images/giftcards/amex.svg",
  "applebee": "/images/giftcards/applebees.png",
  "ardene": "/images/giftcards/ardene.png",
  "argos": "/images/giftcards/argos.png",
  "asda": "/images/giftcards/asda.png",
  "asos": "/images/giftcards/asos.png",
  "athleta": "/images/giftcards/athleta.png",
  "burger": "/images/giftcards/burger.png",
  "netflix": "/images/giftcards/netflix.png",
  "noon": "/images/giftcards/noon.png",
  "safeway": "/images/giftcards/safeway.png",
  "spotify": "/images/giftcards/spotify.png",
};

export function getGiftCardLogo(card: any): string {
  if (card?.image && typeof card.image === "string" && card.image.trim() !== "") {
    if (card.image.startsWith("http") || card.image.startsWith("/")) {
      return card.image;
    }
    return `/${card.image}`;
  }

  // Fallback match based on card name
  const nameLower = (card?.name || "").toLowerCase();
  for (const [key, logoPath] of Object.entries(BRAND_LOGOS)) {
    if (nameLower.includes(key)) {
      return logoPath;
    }
  }

  return "/images/giftcards/default_giftcard.svg";
}

const CARD_COLORS = [
  "bg-red-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-indigo-100",
  "bg-orange-100",
];

function getCardColor(name: string) {
  return CARD_COLORS[name.length % CARD_COLORS.length];
}

export default function GiftCardGrid({
  title,
  giftCards,
  isLoading = false,
  onSelect,
  onBack,
}: Props) {
  const [search, setSearch] = useState("");
  const [failedImages, setFailedImages] = useState<Record<string | number, boolean>>({});

  /* ---------------------------------------------------- */
  /* FILTER CARDS */
  /* ---------------------------------------------------- */

  const filteredCards = useMemo(() => {
    const keyword = search.toLowerCase().trim();
    let cards = [...giftCards];

    if (title.toLowerCase().includes("sell")) {
      if (!cards.some(c => String(c.id) === "other" || c.name.toLowerCase() === "other")) {
        cards.push({
          id: "other" as any,
          name: "Other / Brand not listed",
          image: "/images/giftcards/default_giftcard.svg",
          created_at: "",
          updated_at: "",
          country: "Global"
        });
      }
    }

    if (!keyword) return cards;

    return cards.filter((card) =>
      card.name.toLowerCase().includes(keyword),
    );
  }, [giftCards, search, title]);

  /* ---------------------------------------------------- */
  /* RENDER */
  /* ---------------------------------------------------- */

  return (
    <div className="w-full">
      {/* BACK */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-[13px] text-slate-500 hover:text-slate-800 mb-4 transition"
      >
        ← Back
      </button>

      <h2 className="text-[20px] font-semibold text-slate-900 mb-4">{title}</h2>

      {/* SEARCH */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search gift cards..."
          className="w-full h-[44px] rounded-[10px] border border-slate-200 bg-slate-50 pl-9 pr-4 text-[14px] outline-none focus:border-emerald-500 focus:bg-white transition"
        />
      </div>

      {/* LOADING */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        </div>
      )}

      {/* GRID */}
      {!isLoading && filteredCards.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredCards.map((card) => {
            const logoSrc = failedImages[card.id]
              ? getGiftCardLogo({ ...card, image: "" })
              : getGiftCardLogo(card);

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => onSelect(card)}
                className="flex flex-col rounded-[14px] overflow-hidden border border-slate-100 hover:border-emerald-400 hover:shadow-md transition-all duration-200 text-left bg-white group"
              >
                <div
                  className={`w-full h-[110px] ${getCardColor(
                    card.name,
                  )} flex items-center justify-center overflow-hidden p-2 relative`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoSrc}
                    alt={card.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={() => {
                      setFailedImages((prev) => ({ ...prev, [card.id]: true }));
                    }}
                  />
                </div>

                <div className="bg-white px-3 py-2.5 border-t border-slate-50">
                  <p className="text-[12px] font-semibold text-slate-800 truncate">
                    {card.name}
                  </p>

                  {card.country && (
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {card.country}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* EMPTY STATE */}
      {!isLoading && filteredCards.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-[14px] text-slate-400 text-center">
            {search
              ? `No gift cards found for "${search}"`
              : "No gift cards available"}
          </p>

          {search && (
            <button
              onClick={() => setSearch("")}
              className="mt-3 text-[13px] text-emerald-600 font-medium hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}
