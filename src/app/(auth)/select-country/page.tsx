"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import ReactCountryFlag from "react-country-flag";
import { countries } from "countries-list";

const COUNTRIES = Object.entries(countries)
  .map(([code, country]) => ({
    name: country.name,
    code: code,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function SelectCountryPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = COUNTRIES.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 3);

  return (
    <div className="space-y-8 shadow-2xl p-4 py-8 rounded-2xl">
      <div className="space-y-2 text-center">
        <div className="flex justify-end mb-4">
          {/* <button className="flex items-center text-sm font-bold text-primary hover:text-primary-hover transition-colors">
            English (UK) <span className="ml-1">▼</span>
          </button> */}
        </div>
        <h1 className="text-1xl text-left font-bold tracking-tight text-primary">
          Select Country
        </h1>
      </div>

      <div className="relative space-y-4">
        {/* Dropdown Trigger / Search Input */}
        <div className="relative group" onClick={() => setIsOpen(true)}>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder={selectedCountry || "Search"}
            className="w-full h-14 pl-12 pr-12 rounded-xl bg-zinc-50 border border-zinc-100 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer placeholder:text-zinc-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {/* Dropdown List */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white rounded-xl border border-zinc-100 shadow-xl shadow-zinc-200/50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
            <div className="max-h-64 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {filteredCountries.map((country) => (
                <button
                  key={country.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCountry(country.name);
                    setSearchQuery("");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-emerald-50 transition-colors group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-6 flex items-center justify-center overflow-hidden rounded-sm shadow-xs border border-zinc-100">
                      <ReactCountryFlag
                        countryCode={country.code}
                        svg
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        title={country.name}
                      />
                    </div>
                    <span
                      className={`font-semibold ${
                        selectedCountry === country.name
                          ? "text-zinc-900"
                          : "text-zinc-600"
                      }`}
                    >
                      {country.name}
                    </span>
                  </div>
                  {selectedCountry === country.name && (
                    <Check className="h-5 w-5 text-emerald-600" />
                  )}
                </button>
              ))}
              {filteredCountries.length === 0 && (
                <div className="p-4 text-center text-zinc-500 text-sm">
                  No countries found
                </div>
              )}
            </div>
          </div>
        )}

        {/* Overlay to close dropdown when clicking outside */}
        {isOpen && (
          <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />
        )}
      </div>

      <div className="text-right text-sm pt-8">
        <p className="text-emerald-700 font-bold">
          New User?{" "}
          <Link
            href="/signup"
            className="font-bold underline decoration-2 decoration-emerald-500/30 underline-offset-4 hover:text-emerald-800"
          >
            Sign Up Here
          </Link>
        </p>
      </div>
    </div>
  );
}
