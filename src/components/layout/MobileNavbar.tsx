"use client";

import Link from "next/link";
import { useState } from "react";
import Menu from "../icons/menu";
import Close from "../icons/close";
import { Button } from "../ui/Button";

export const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#007042] text-white">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="text-xl font-bold tracking-tight">CashConnect</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="p-1 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Sidebar Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#007042] z-50 shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col">
            <div className="p-6 flex flex-col h-full">
              {/* Header with Home Icon and Close */}
              <div className="flex items-center justify-between mb-8">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-white font-medium"
                >
                  {/* Home Icon */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 9.75L12 2.25L21 9.75V20.25C21 20.6478 20.842 21.0294 20.5607 21.3107C20.2794 21.592 19.8978 21.75 19.5 21.75H4.5C4.10218 21.75 3.72064 21.592 3.43934 21.3107C3.15804 21.0294 3 20.6478 3 20.25V9.75Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Home
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-white rounded-full p-0.5"
                >
                  <Close className="w-5 h-5 text-[#007042]" />
                </button>
              </div>

              {/* Menu Links */}
              <div className="flex flex-col gap-6 pl-1">
                <Link
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white font-medium hover:text-emerald-100"
                >
                  About
                </Link>
                <Link
                  href="/history"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white font-medium hover:text-emerald-100"
                >
                  History
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white font-medium hover:text-emerald-100"
                >
                  Contact
                </Link>
                <Link
                  href="/products"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white font-medium hover:text-emerald-100"
                >
                  Products
                </Link>
                <Link
                  href="/resources"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white font-medium hover:text-emerald-100"
                >
                  Resources
                </Link>
                <Link
                  href="/team"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white font-medium hover:text-emerald-100"
                >
                  Our Team
                </Link>

                <div className="mt-4 pt-4 border-t border-emerald-500/30 flex flex-col gap-6">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white font-medium hover:text-emerald-100"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white font-medium hover:text-emerald-100"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};
