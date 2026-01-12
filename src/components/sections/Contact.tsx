"use client";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Phone, Mail, MapPin } from "lucide-react";
import React from "react";
import Image from "next/image";

const heroImage = require("../../../public/images/gift-card-right.png");

export const Contact = () => {
  return (
    <Section background="white" className="py-24 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-15%] w-[500px] h-[500px] bg-emerald-50/60 rounded-full blur-[100px]" />
      </div>

      <div className="container w-full relative z-10">
        <div className="flex w-full flex-col lg:flex-row  justify-between">
          <div className="mb-16">
            <span className="text-emerald-500 font-bold tracking-widest uppercase text-xs mb-3 block">
              Get in Touch
            </span>
            <h2 className="text-2xl md:text-3xl font-light text-gray-800  tracking-tight leading-tight max-w-2xl">
              Simplifying digital exchange for everyone, everywhere, anytime.
            </h2>
          </div>
          <Image src={heroImage} alt="Hero" width={200} height={200} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
          {/* Left: Contact Info Card - Green */}
          <div className="w-full lg:w-[40%] bg-gradient-to-br from-[#00D67D] to-[#007042] rounded-[2.5rem] p-12 text-white relative overflow-hidden flex flex-col justify-between min-h-[550px] shadow-2xl shadow-emerald-500/20">
            {/* Background Decoration */}
            <div className="absolute bottom-[-100px] right-[-100px] w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <p className="text-emerald-50 font-medium mb-12 leading-relaxed">
                Fill up the form and our Team will get back to you within 24
                hours.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-white mt-1" />
                  <div className="text-emerald-50 font-medium">
                    <p>+234 816 718 245</p>
                    <p>+234 908 178 345</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-white mt-1" />
                  <div className="text-emerald-50 font-medium">
                    <p>hello.cashconnect@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-white mt-1" />
                  <div className="text-emerald-50 font-medium">
                    <p>University of Nigeria Nsukka</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons placeholders */}
            <div className="flex gap-4 mt-auto relative z-10">
              {/* Add social icons if needed */}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="w-full lg:w-[60%]rounded-[2.5rem] p-10 md:p-12 ">
            <form className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-[#007042] uppercase tracking-widest block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full border-b-2 border-emerald-200 focus:border-[#00D67D] outline-none py-3 text-zinc-700 bg-transparent transition-all placeholder:text-zinc-400 font-medium"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-[#007042] uppercase tracking-widest block">
                    Your Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full border-b-2 border-emerald-200 focus:border-[#00D67D] outline-none py-3 text-zinc-700 bg-transparent transition-all placeholder:text-zinc-400 font-medium"
                    placeholder="+123 456 7890"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-[#007042] uppercase tracking-widest block">
                  Your Subject
                </label>
                <input
                  type="text"
                  className="w-full border-b-2 border-emerald-200 focus:border-[#00D67D] outline-none py-3 text-zinc-700 bg-transparent transition-all placeholder:text-zinc-400 font-medium"
                  placeholder="Trading Inquiry"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-[#007042] uppercase tracking-widest block">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full border-b-2 border-emerald-200 focus:border-[#00D67D] outline-none py-3 text-zinc-700 bg-transparent resize-none transition-all placeholder:text-zinc-400 font-medium"
                  placeholder="Write your message here..."
                />
              </div>

              <div className="pt-6">
                <Button className="rounded-full bg-gradient-to-r from-[#00D67D] to-[#007042] hover:shadow-2xl hover:shadow-emerald-500/30 text-white font-bold px-12 py-4 shadow-xl shadow-emerald-500/20 w-auto transition-all hover:scale-105">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
};
