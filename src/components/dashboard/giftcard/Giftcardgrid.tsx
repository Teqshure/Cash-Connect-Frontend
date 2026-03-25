"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { GiftCard } from "@/store/giftCardStore";

type Props = {
  title: string;
  giftCards: GiftCard[];
  isLoading?: boolean;
  onSelect: (card: GiftCard) => void;
  onBack: () => void;
};

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

  const filtered = giftCards.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-[13px] text-slate-500 hover:text-slate-800 mb-4 cursor-pointer transition"
      >
        ← Back
      </button>

      <h2 className="text-[20px] font-semibold text-slate-900 mb-4">{title}</h2>

      {/* Search */}
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

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        </div>
      )}

      {/* Grid */}
      {!isLoading && filtered.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => onSelect(card)}
              className="flex flex-col rounded-[14px] overflow-hidden border border-slate-100 hover:border-emerald-400 hover:shadow-md transition-all duration-200 cursor-pointer text-left"
            >
              <div
                className={`w-full h-[100px] ${getCardColor(card.name)} flex items-center justify-center overflow-hidden`}
              >
                {card.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                ) : (
                  <span className="text-2xl font-bold text-slate-400">
                    {card.name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="bg-white px-3 py-2">
                <p className="text-[12px] font-medium text-slate-700 truncate">
                  {card.name}
                </p>
                {card.country && (
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {card.country}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-[14px] text-slate-400">
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
