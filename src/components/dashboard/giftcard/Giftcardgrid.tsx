"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { GIFT_CARDS, GiftCard } from "./Giftcarddata";

type Props = {
  title: string;
  onSelect: (card: GiftCard) => void;
  onBack: () => void;
};

export default function GiftCardGrid({ title, onSelect, onBack }: Props) {
  const [search, setSearch] = useState("");

  const filtered = GIFT_CARDS.filter((c) =>
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

      {/* Grid — 3 columns */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelect(card)}
            className="flex flex-col rounded-[14px] overflow-hidden border border-slate-100 hover:border-emerald-400 hover:shadow-md transition-all duration-200 cursor-pointer text-left"
          >
            {/* Image fills the card completely */}
            <div className={`w-full h-[100px] ${card.bgColor} overflow-hidden`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.logo}
                alt={card.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>

            {/* Name below */}
            <div className="bg-white px-3 py-2">
              <p className="text-[12px] font-medium text-slate-700 truncate">
                {card.name}
              </p>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-[14px] text-slate-400 mt-10">
          No gift cards found for &quot;{search}&quot;
        </p>
      )}
    </div>
  );
}
