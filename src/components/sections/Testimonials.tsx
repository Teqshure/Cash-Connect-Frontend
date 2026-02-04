import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import React from "react";
import Flag from "../icons/flag";

export const Testimonials = () => {
  return (
    <Section background="white" className="py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center max-w-6xl mx-auto px-4 md:px-6">
        {/* Left: Mockup Card (Contact Form Style) - Hidden on mobile */}
        <div className="relative order-2 lg:order-1">
          <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-primary-light text-primary-light/30 p-6 md:p-8 lg:p-12 relative overflow-hidden">
            {/* Green blur effect */}
            <div className="absolute top-24 -left-16 w-50 h-50 bg-[#b5d794] blur-[60px] rounded-full  pointer-events-none"></div>

            <div className="flex justify-between items-start mb-8">
              <span className="text-zinc-500 font-medium"></span>
              <div className="w-12 h-12 rounded-full border border-primary-lightext-primary-light/30 flex items-center justify-center text-primary-light bg-white">
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

            <div className="flex flex-col gap-y-6 relative z-10">
              <div>
                <label className="block text-primary-dark font-semibold mb-3 text-sm">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="w-full bg-[#efefef] text-black rounded-xl px-5 py-4 text-sm border-none outline-none focus:ring-1 focus:ring-emerald-200 placeholder:text-primary-dark font-medium"
                />
              </div>
              <div>
                <label className="block text-primary-dark font-semibold mb-3 text-sm">
                  Message
                </label>
                <textarea
                  placeholder="What are you say ?"
                  className="w-full bg-[#efefef] text-black rounded-xl px-5 py-3 text-sm border-none outline-none focus:ring-1 focus:ring-emerald-200 resize-none h-20 placeholder:text-primary-dark font-medium"
                ></textarea>
              </div>

              <Button className="w-full bg-primary hover:bg-emerald-600 text-white rounded-xl py-4  font-bold shadow-lg shadow-emerald-200/50 text-[15px]">
                Send Message
              </Button>
            </div>
            <div className="text-right bottom-1 pt-0 mb-6">
              <span className="text-[11px] font-semibold text-primary-light  tracking-wide cursor-pointer hover:text-emerald-700 transition-colors">
                <span className="text-primary-dark">or </span> Start Free Trial
              </span>
            </div>

            <div className="absolute bottom-5 mt-5 left-12">
              <span className="text-[11px] font-semibold text-primary-light uppercase tracking-widest">
                Cash Connect
              </span>
            </div>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="order-1 lg:order-2 pl-0 md:pl-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4 md:mb-8">
            Testimonials
          </h2>
          <p className="text-green-700 mb-6 md:mb-10 max-w-md leading-relaxed font-medium text-sm md:text-base">
            Everything you need to accept payments, grow your money, and manage
            it from anywhere on the planet.
          </p>

          <div className="mb-8">
            <Flag />
          </div>

          <p className="text-base md:text-lg lg:text-xl font-medium text-green-700 mb-6 md:mb-8 leading-relaxed max-w-lg">
            I've tried several platforms, but this one is by far the fastest and
            most reliable. Got my payment in minutes! 🤩
          </p>

          <p className="font-extrabold text-primary mb-8 md:mb-12 flex items-center text-sm md:text-base">
            _David, Lagos
          </p>

          <div className="flex items-center gap-8">
            <div className="flex space-x-6">
              {[
                "https://i.pravatar.cc/100?img=11",
                "https://i.pravatar.cc/100?img=5",
                "https://i.pravatar.cc/100?img=3",
                "https://i.pravatar.cc/100?img=8",
              ].map((src, i) => (
                <div
                  key={i}
                  className="w-full  h-full  rounded-full border-[3px] border-white overflow-hidden relative shadow-sm"
                >
                  <img
                    src={src}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              <div className="w-full  rounded-full border border-primary-lightext-primary-light/30 flex items-center justify-center text-primary-light bg-white cursor-pointer hover:bg-emerald-50 hover:scale-105 transition-all shadow-sm ml-2">
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
      </div>
    </Section>
  );
};
