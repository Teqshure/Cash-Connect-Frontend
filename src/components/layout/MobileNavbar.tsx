"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Menu from "../icons/menu";
import Close from "../icons/close";
import { Button } from "../ui/Button";

export const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Products", href: "/products" },
    { name: "Our Team", href: "/team" },
  ];

  return (
    <nav className="lg:hidden relative z-50">
      {/* Top Bar - Acts as persistent header */}
      <div className="bg-[#007042] text-white flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex flex-col leading-none group">
          <span className="text-xl font-bold tracking-tight">CashConnect</span>
        </Link>

        <button
          className="p-1 focus:outline-none cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <div className="bg-white rounded-full p-0.5">
              <Close className="w-5 h-5 text-[#007042]" />
            </div>
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Accordion / Push Down Menu Content */}
      {isMenuOpen && (
        <div className="bg-[#007042] w-full px-6 pb-8 pt-2 flex flex-col gap-6 animate-in slide-in-from-top duration-300 origin-top">
          {/* Menu Links */}
          <div className="flex flex-col gap-6">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.href} className="relative group">
                  {/* Vertical Active Indicator */}
                  {isActive && (
                    <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-[#00D67D] rounded-r-full" />
                  )}
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-lg font-medium block transition-colors ${
                      isActive ? "text-white" : "text-white/90 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
              <div className="border border-white/20 rounded-lg py-3 px-6 text-center text-white font-medium hover:bg-white/10 transition-colors cursor-pointer">
                Log In
              </div>
            </Link>
            <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
              <div className="bg-[#00D67D] rounded-lg py-3 px-6 text-center text-white font-medium hover:bg-[#00c472] transition-colors shadow-lg cursor-pointer">
                Sign UP
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
