"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { MobileNavbar } from "@/components/layout/MobileNavbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSelectCountry = pathname?.includes("select-country");

  return (
    <div className="flex min-h-screen w-full font-sans">
      <MobileNavbar />
      {/* Left Side - Visual & Branding */}
      <div
        className={`hidden lg:flex lg:w-1/2 flex-col relative overflow-hidden transition-all duration-500 ease-in-out ${
          isSelectCountry
            ? "justify-end items-start p-12 bg-black"
            : "justify-center items-center bg-[#E8F5E9] p-12"
        }`}
      >
        {isSelectCountry ? (
          <>
            <Image
              src="/images/young-woman.png"
              alt="Trading Experience"
              fill
              className="object-cover opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 text-left max-w-md">
              <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                Fastest way to trade your giftcards
              </h2>
              <p className="text-white/80 text-lg">
                Get over 10,000+ happy peers, avoid the glitches using our swift
                platform.
              </p>
            </div>
          </>
        ) : (
          <div className="relative z-10 w-full max-w-md flex flex-col items-center">
            <Image
              src="/images/cash-connect.png"
              alt="Cash Connect"
              width={500}
              height={400}
              className="w-full h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>
        )}
      </div>

      {/* Right Side - Forms */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 pt-24 sm:p-12 lg:p-20 bg-white">
        {isSelectCountry && (
          <div className="absolute top-8 right-8 text-sm text-zinc-500">
            register &gt;
          </div>
        )}
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
