"use client";

import Link from "next/link";
import { Button } from "../ui/Button";
import { MobileNavbar } from "./MobileNavbar";

export const Navbar = () => {
  return (
    <>
      <MobileNavbar />
      <nav className="hidden lg:block fixed top-4 left-0 right-0 z-50">
        <div className="mx-auto flex max-w-300 py-2 w-[95%] rounded-full border border-primary bg-white/50 backdrop-blur-md items-center justify-between px-3 lg:px-4 relative">
          <Link href="/" className="flex flex-col leading-none group">
            <span className="text-2xl font-thin tracking-tighter text-primary">
              CashConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-10">
            <Link
              href="/about"
              className="text-[15px] font-bold text-primary/80 hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-[15px] font-bold text-primary/80 hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <div className="group relative flex items-center gap-1 cursor-pointer">
              <Link href="/products">
                <span className="text-[15px] font-bold text-primary/80 group-hover:text-primary transition-colors">
                  Products
                </span>
              </Link>
              {/* <span className="text-[10px] text-primary/60 group-hover:text-primary transition-colors">
                ▼
              </span> */}
            </div>
            <Link
              href="/team"
              className="text-[15px] font-bold text-primary/80 hover:text-primary transition-colors"
            >
              Our Team
            </Link>
          </div>
            {/* <div className="group relative flex items-center gap-1 cursor-pointer">
              <span className="text-[15px] font-bold text-primary/80 group-hover:text-primary transition-colors">
                Resources
              </span>
            </div> */}

          <div className="flex items-center gap-4">
            <Link href="/login">
              <button className="rounded-full border border-primary/20 px-6 py-2.5 text-[15px] font-semibold text-primary hover:bg-primary/5 transition-all cursor-pointer">
                Sign In
              </button>
            </Link>
            <Link href="/signup">
              <Button size="md" className="rounded-full px-7 shadow-none">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
