import Link from "next/link";
import Btcfly from "../icons/btc_fly";
import Logo from "../icons/logo";

export const Footer = () => {
  return (
    <footer className="relative mt-20">
      <div className="bg-white rounded-t-[3rem] pt-20 pb-12 relative shadow-sm">
        {/* Floating Coin - Absolute positioned */}
        <div className="absolute top-0 left-10 md:left-20 -translate-y-1/2">
          <div className="relative w-20 h-20 md:w-24 md:h-24">
            <Btcfly className="w-full h-full drop-shadow-xl" />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                {/* Logo Icon */}
                <div className="w-8 h-8 relative">
                  <Logo className="w-full h-full" />
                </div>
                <span className="text-xl font-bold tracking-tight text-emerald-500">
                  Cash Connect
                </span>
              </div>

              <div className="space-y-2 text-[13px] font-bold text-emerald-900/60 max-w-xs">
                <p>20 Osgood Rd, Milford, NH 03055, USA</p>
                <p>+1283871239190213021</p>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="text-sm font-bold text-emerald-500 mb-6">
                Company
              </h4>
              <ul className="space-y-4">
                {["Careers", "Teachers", "Support", "Contact"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-xs font-bold text-emerald-900/60 hover:text-emerald-600 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-emerald-500 mb-6">
                Product
              </h4>
              <ul className="space-y-4">
                {["Courses", "Pricing", "Blog"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-xs font-bold text-emerald-900/60 hover:text-emerald-600 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-emerald-500 mb-6">Legal</h4>
              <ul className="space-y-4">
                {["Terms & Conditions", "Privacy policy"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-xs font-bold text-emerald-900/60 hover:text-emerald-600 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social Icons */}
            </div>
            <div className="flex gap-4">
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
                <svg
                  width="14"
                  height="14"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>,
              ].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white border border-emerald-100 flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors shadow-sm"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
