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
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search gift cards..."
          className="w-full h-[44px] rounded-[10px] border border-slate-200 bg-slate-50 pl-9 pr-4 text-[14px] outline-none focus:border-emerald-500 focus:bg-white transition"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {filtered.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelect(card)}
            className="flex flex-col items-center gap-2 p-2 rounded-[12px] border border-slate-100 bg-white hover:border-emerald-400 hover:shadow-md transition cursor-pointer"
          >
            {/* Logo */}
            <div
              className={`w-full h-16 rounded-[8px] ${card.bgColor} flex items-center justify-center overflow-hidden`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.logo}
                alt={card.name}
                className="h-12 w-full object-contain p-1"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <p className="text-[11px] font-medium text-slate-700 text-center leading-tight">
              {card.name}
            </p>
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
