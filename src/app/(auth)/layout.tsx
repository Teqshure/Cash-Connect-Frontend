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
    <div className="flex flex-col lg:flex-row h-screen w-full font-sans overflow-x-hidden overflow-y-hidden pt-15 lg:pt-0">
      <MobileNavbar />
      {/* Left Side - Visual & Branding */}
      <div
        className={`hidden lg:flex lg:w-1/2 h-full flex-col relative overflow-hidden transition-all duration-500 ease-in-out ${
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
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center p-4 sm:p-8 lg:p-12 bg-white relative overflow-y-auto overflow-x-hidden no-scrollbar">
        {/* Global Language Switcher */}
        <div className="fixed lg:absolute top-17.5 lg:top-8 right-4 z-20">
          <Link href="">
            <button className="flex items-center text-[10px] font-medium text-primary-dark hover:text-primary-hover transition-colors uppercase tracking-wider">
              English (UK) <span className="ml-1">▼</span>
            </button>
          </Link>
        </div>

        <div className="w-full max-w-xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] lg:shadow-none rounded-2xl p-6 md:p-8 pb-12 md:pb-24 relative mt-20 lg:mt-0">
          {children}
        </div>
      </div>
    </div>
  );
}
