import Link from "next/link";
import Btcfly from "../icons/btc_fly";
import Logo from "../icons/logo";
import React from "react";
import Instagram from "../icons/instagram";

export const Footer = () => {
  return (
    <footer className="relative mt-10  ml-[5%] mr-[5%] lg:ml-0 lg:mr-0 rounded-t-3xl bg-[#f8fafe]">
      <div className="  pt-10 pb-12 relative ">
        <div className="mx-auto max-w-7xl px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-y-12 gap-x-4 lg:gap-8">
            {/* Brand Column - Mobile: 1/2 width (50%), Desktop: 4/12 width (33%) */}
            <div className="col-span-6 lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-6 sm:w-8 sm:h-8 relative">
                  <Logo className="w-full h-full" />
                </div>
                <span className="text-sm sm:text-xl font-semibold tracking-tight text-primary-light">
                  Cash Connect
                </span>
              </div>

              <div className="space-y-2 text-[10px] sm:text-[13px] font-semibold text-primary-dark max-w-xs leading-relaxed">
                <p>20 Osgood Rd, Milford, NH 03055, USA</p>
                <p>+1283871239190</p>
              </div>
            </div>

            {/* Company Column - Mobile: 1/4 width (25%), Desktop: 2/12 width (16%) */}
            <div className="col-span-3 lg:col-span-2">
              <h4 className="text-xs sm:text-[10px]  font-semibold text-primary-light mb-4 sm:mb-6">
                Company
              </h4>
              <ul className="space-y-3 sm:space-y-4">
                {[
                  { name: "Careers", href: "#" },
                  { name: "Teachers", href: "#" },
                  { name: "Support", href: "#" },
                  { name: "Contact", href: "/contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-[10px] sm:text-xs font-semibold text-primary-dark hover:text-primary-light transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Column - Mobile: 1/4 width (25%), Desktop: 2/12 width (16%) */}
            <div className="col-span-3 lg:col-span-2">
              <h4 className="text-xs sm:text-[10px]  font-semibold text-primary-light mb-4 sm:mb-6">
                Product
              </h4>
              <ul className="space-y-3 sm:space-y-4">
                {[
                  { name: "Courses", href: "#" },
                  { name: "Pricing", href: "#" },
                  { name: "Blog", href: "#" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-[10px] sm:text-xs font-semibold text-primary-dark hover:text-primary-light transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column - Mobile: 1/2 width (50%), Desktop: 2/12 width (16%) */}
            <div className="col-span-6 lg:col-span-2 pt-4 lg:pt-0">
              <h4 className="text-xs sm:text-[10px] font-semibold text-primary-light mb-4 sm:mb-6">
                Legal
              </h4>
              <ul className="space-y-3 sm:space-y-4">
                {["Terms & Conditions", "Privacy policy"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-[10px] sm:text-xs font-semibold text-primary-dark hover:text-primary-light transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Icons - Mobile: 1/2 width (50%), Desktop: 2/12 width (16%) */}
            <div className="col-span-6 lg:col-span-2 pt-4 lg:pt-0 flex items-start lg:justify-end">
              <div className="flex gap-2 sm:gap-4">
                {[
                  // Facebook
                  <svg
                    width="14"
                    height="14"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>,
                  // Twitter
                  <svg
                    width="14"
                    height="14"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>,
                  // Instagram
                  <Instagram />,
                ].map((icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-primary-dark   cursor-pointer"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
