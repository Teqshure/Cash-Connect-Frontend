import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import React from "react";

export const Testimonials = () => {
  return (
    <Section background="white" className="py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto px-6">
        {/* Left: Mockup Card (Contact Form Style) */}
        <div className="relative order-2 lg:order-1">
          <div className="bg-white rounded-[3rem] border border-emerald-500/30 p-8 md:p-12 relative overflow-hidden shadow-sm">
            {/* Green blur effect */}
            <div className="absolute top-24 -left-12 w-56 h-56 bg-emerald-400/30 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="flex justify-between items-start mb-8">
              <span className="text-zinc-500 font-medium"></span>
              <div className="w-12 h-12 rounded-full border border-emerald-500/30 flex items-center justify-center text-emerald-500 bg-white">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </div>
            </div>

            <div className="space-y-6 relative z-10">
              <div>
                <label className="block text-emerald-800 font-bold mb-3 text-sm">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="w-full bg-zinc-100/50 rounded-xl px-5 py-4 text-sm border-none outline-none focus:ring-1 focus:ring-emerald-200 placeholder:text-zinc-400 font-medium"
                />
              </div>
              <div>
                <label className="block text-emerald-800 font-bold mb-3 text-sm">
                  Message
                </label>
                <textarea
                  placeholder="What are you say ?"
                  className="w-full bg-zinc-100/50 rounded-xl px-5 py-4 text-sm border-none outline-none focus:ring-1 focus:ring-emerald-200 resize-none h-28 placeholder:text-zinc-400 font-medium"
                ></textarea>
              </div>

              <Button className="w-full bg-[#00B060] hover:bg-emerald-600 text-white rounded-xl py-4 font-bold shadow-lg shadow-emerald-200/50 text-[15px]">
                Send Message
              </Button>

              <div className="text-center pt-2">
                <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-wide cursor-pointer hover:text-emerald-700 transition-colors">
                  or Start Free Trial
                </span>
              </div>
            </div>

            <div className="absolute bottom-10 left-12">
              <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-widest">
                Cash Connect
              </span>
            </div>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="order-1 lg:order-2 pl-4">
          <h2 className="text-4xl font-bold text-[#00B060] mb-8">
            Testimonials
          </h2>
          <p className="text-zinc-500 mb-10 max-w-md leading-relaxed font-medium">
            Everything you need to accept payments, grow your money, and manage
            it from anywhere on the planet.
          </p>

          <div className="mb-8">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect
                x="4"
                y="4"
                width="8"
                height="24"
                rx="1"
                transform="rotate(-15 4 4)"
                className="fill-[#00B060]"
              />
              <rect
                x="20"
                y="4"
                width="8"
                height="24"
                rx="1"
                transform="rotate(-15 20 4)"
                className="fill-[#00B060]"
              />
            </svg>
          </div>

          <p className="text-lg md:text-xl font-medium text-emerald-950 mb-8 leading-relaxed max-w-lg">
            I've tried several platforms, but this one is by far the fastest and
            most reliable. Got my payment in minutes! 🤩
          </p>

          <p className="font-extrabold text-[#007042] mb-12 flex items-center">
            <span className="inline-block w-3 h-0.5 bg-[#007042] mr-2"></span>
            David, Lagos
          </p>

          <div className="flex items-center gap-3">
            <div className="flex space-x-1">
              {[
                "https://i.pravatar.cc/100?img=11",
                "https://i.pravatar.cc/100?img=5",
                "https://i.pravatar.cc/100?img=3",
                "https://i.pravatar.cc/100?img=8",
              ].map((src, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border-[3px] border-white overflow-hidden relative shadow-sm"
                >
                  <img
                    src={src}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="w-12 h-12 rounded-full border border-emerald-500/30 flex items-center justify-center text-emerald-500 bg-white cursor-pointer hover:bg-emerald-50 hover:scale-105 transition-all shadow-sm ml-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-0.5"
              >
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
