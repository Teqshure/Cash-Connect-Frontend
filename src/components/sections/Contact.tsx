"use client";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Phone, Mail, MapPin } from "lucide-react";
import React from "react";
import Image from "next/image";

const heroImage = require("../../../public/images/gift-card-right.png");

export const Contact = () => {
  return (
    <Section
      background="white"
      className="py-34 relative pt-15 lg:pt-40 overflow-hidden"
    >
      <div className="container w-full relative z-10 max-w-6xl">
        {/* Background Decorations - Anchored to Container */}
        <div className="absolute top-[-15%] left-[-20%] w-150 h-150 bg-primary opacity-15 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-[3%] right-[-10%] w-125 h-125 bg-primary opacity-15 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="flex w-full flex-col lg:flex-row justify-between mb-16">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">
              Contact Us
            </span>
            <h2 className="text-2xl md:text-3xl font-light text-gray-800 tracking-tight leading-tight max-w-xl">
              Simplifying digital exchange for everyone, everywhere, anytime.
            </h2>
          </div>
          <div className="hidden lg:block px-40 relative -top-10">
            <Image
              src={heroImage}
              alt="Hero"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">
          {/* Left: Contact Info Card - Green */}
          <div className="w-full lg:w-[40%] bg-primary-dark rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden flex flex-col justify-center min-h-137.5 ">
            {/* Background Decoration */}
            <div className="absolute -bottom-25 -right-25 w-80 h-80 bg-[#00E096] rounded-full p-2 opacity-60 blur-3xl pointer-events-none" />

            <div className="  mb-10 pl-2">
              <span className="text-primary-light text-sm font-medium mb-14 block">
                Cash Connect
              </span>
              <h3 className=" text-2xl font-semibold mb-6">
                Contact Information
              </h3>
              <p className="text-emerald-50 font-normal mb-12 leading-relaxed opacity-90 text-base max-w-xs">
                We'll create high-quality linkable content and build
              </p>

              <div className="space-y-8 mt-12">
                <div className="flex items-start gap-5">
                  <Phone className="w-6 h-6 text-white mt-1 shrink-0" />
                  <div className="text-white font-small text-base">
                    <p>+23489876345</p>
                    <p>+23489876345</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <Mail className="w-6 h-6 text-white shrink-0" />
                  <div className="text-white font-medium text-base">
                    <p>flawlesssocials@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <MapPin className="w-6 h-6 text-white shrink-0" />
                  <div className="text-white font-medium text-base">
                    <p>University of Nigeria Nsukka</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="w-full lg:w-[60%] lg:pl-10 pt-4">
            <form className="space-y-12">
              {/* Name Row */}
              <div className="grid grid-cols-2 gap-x-4 md:gap-x-12 gap-y-12">
                <div className="space-y-2">
                  <label className="text-lg font-bold text-primary block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full border-b border-primary/30 focus:border-primary outline-none py-2 text-zinc-700 bg-transparent transition-all placeholder:text-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-lg font-bold text-primary-light block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full border-b border-primary/30 focus:border-primary outline-none py-2 text-zinc-700 bg-transparent transition-all placeholder:text-transparent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-lg font-bold text-primary-light block">
                  Your Subject
                </label>
                <input
                  type="text"
                  className="w-full border-b border-primary/30 focus:border-primary outline-none py-2 text-zinc-700 bg-transparent transition-all placeholder:text-transparent"
                />
              </div>

              <div className="space-y-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xl font-bold text-primary-light block">
                    Message
                  </label>
                  <span className="text-primary font-semibold text-lg">
                    Write Your message here
                  </span>
                </div>
                <textarea
                  rows={4}
                  className="w-full border-b border-primary/30 focus:border-primary outline-none py-2 text-zinc-700 bg-transparent resize-none transition-all"
                />
              </div>

              <div className="pt-4">
                <Button className="rounded-full bg-[#00B86B] hover:bg-primary-dark text-white font-semibold px-8 py-3 w-fit text-sm border-none shadow-none">
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
