import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { CallToAction } from "@/components/sections/CallToAction";
import { Button } from "@/components/ui/Button";
import Arrowlight from "@/components/icons/arrowlight";
import Arrowdark from "@/components/icons/arrowright";
import Arrow from "@/components/icons/arrowsmile";
import Giftid from "@/components/icons/giftid";
import { AboutStats } from "@/components/sections/AboutStats";
import { AboutTestimonials } from "@/components/sections/AboutTestimonials";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans overflow-x-hidden">
      <Navbar />

      <main className="grow ">
        {/* HERO */}
        <Section className="relative pt-10 lg:pt-30 pb-10 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 relative z-10 ">
            {/* Background Decorations - Anchored to Container */}
            <div className="absolute top-[-20%] left-[-15%] w-[70%] h-[70%] bg-emerald-100/60 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="rounded-full bg-primary p-10 w-20 h-20 blur-2xl absolute -left-10 top-1/2 -translate-y-1/2 opacity-60 -z-10 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* LEFT – higher content */}
              <div className="pt-2">
                <p className="mb-3 text-sm font-semibold text-green-600">
                  About Us
                </p>

                <h1 className="max-w-xl text-md lg:text-3xl  leading-tight text-gray-700 ">
                  Simplifying digital exchange for everyone, everywhere,
                  anytime.
                </h1>

                <div className="mt-8">
                  <button className="rounded-full bg-[#00B86B] px-8 py-5 text-sm font-semibold text-white hover:bg-green-700 transition">
                    Get Started
                  </button>
                </div>
              </div>

              {/* RIGHT – pushed downward */}
              <div className="hidden lg:flex items-end pb-13">
                <p className="max-w-md text-base leading-relaxed text-gray-500">
                  Whether you're a crypto trader or a gift card holder, our
                  mission is to make exchanging as simple and rewarding as
                  possible — no confusion, no delays.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* STORY + VISION / MISSION */}
        <section className="mx-auto max-w-7xl px-6 py-2">
          <div className="grid grid-cols-1 gap-4 lg:gap-10 lg:grid-cols-3">
            {/* IMAGE (2/3 width) */}
            <div className="relative col-span-2 h-[250px] md:h-[400px] lg:h-[580px] overflow-hidden rounded-3xl">
              <Image
                src="/images/our_story.jpg"
                alt="Our Story"
                fill
                className="object-cover"
                priority
              />

              <div className="absolute inset-0 bg-black/35" />

              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 max-w-md text-white">
                <h3 className="mb-2 text-lg font-semibold">Our Story</h3>
                <p className="text-xs md:text-sm leading-relaxed text-white/90">
                  Our journey began with one goal: to simplify trading, maximize
                  value, and protect users through a platform built on trust,
                  transparency, global access, and reliable support.
                </p>
              </div>
            </div>

            {/* VISION + MISSION – SAME HEIGHT AS IMAGE */}
            <div className="grid grid-cols-2 gap-3  lg:flex lg:flex-col lg:h-[580px] lg:gap-6">
              <div className="flex-1 rounded-3xl bg-green-100 py-20 lg:py-20 px-5 md:p-8">
                <h3 className="mb-2 md:mb-3 text-base lg:text-lg font-semibold text-green-800">
                  Our Vision
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-green-800/80">
                  To lead digital exchange with trust, speed, innovation, and
                  inclusivity everywhere.
                </p>
              </div>

              <div className="flex-1 rounded-3xl bg-[#00B86B] py-20 lg:py-20 px-5 md:p-8 text-white">
                <h3 className="mb-2 md:mb-3 text-base lg:text-lg font-semibold">
                  Our Mission
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-white/90">
                  Delivering fast, trusted, and user-first exchange experiences
                  daily.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* SERVICES */}
        <section className="relative mx-auto max-w-7xl  px-6 pt-10 lg:pt-20 pb-0 ">
          {/* Background network pattern (optional if already global) */}
          <div className="pointer-events-none absolute inset-0 opacity-40" />

          {/* Header */}
          <div className=" w-full relative">
            <p className="mb-3  text-sm font-semibold text-green-600">
              Our Services
            </p>

            <h2 className="text-2xl font-semibold mb-5 lg:mb-0 leading-snug text-[#5c5c5c] lg:text-3xl max-w-2xl">
              Simplifying digital exchange for everyone, everywhere, anytime.
            </h2>
            <Arrow className="hidden lg:block item-center absolute top-[-80%] right-[10%] opacity-80" />
            <div className=" hidden lg:flex justify-end mb-10 mr-20 mt-10">
              <div className="flex gap-x-2 items-center self-end">
                <Giftid />
                <p className="text-lg text-gray-400 font-medium">
                  Sell Gift Card
                </p>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-10 lg:mt-30">
            {/* Card 1: Crypto to Cash (Dark Green) */}
            <div className="bg-primary-dark rounded-4xl lg:rounded-[2.5rem] p-6 lg:p-8 text-white relative overflow-hidden group min-h-80 lg:min-h-120 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                  Cash Connect
                </span>
                <div className="rounded-full border border-white/20 w-12 h-12 flex items-center justify-center text-white/80">
                  <Arrowlight width={50} height={50} />
                </div>
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-3 lg:mb-4 text-white">
                Crypto to <br /> Cash
              </h3>
              <p className="text-white text-sm lg:text-base mb-6 lg:mb-8 leading-relaxed">
                Instantly convert your Bitcoin and other cryptocurrencies to
                Naira at competitive rates.
              </p>

              <div className="mt-auto -translate-y-[10%] lg:-translate-y-20">
                <Button className="rounded-full bg-primary hover:bg-emerald-500 text-white font-bold px-8 py-3 text-xs w-fit border-none">
                  Exchange
                </Button>
              </div>

              {/* Decoration */}
              <div className="absolute bottom-4 right-4 hidden lg:block">
                <Image
                  src="/images/money-1.png"
                  alt="BTC Decoration"
                  width={60}
                  height={60}
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Card 2: Gift Card Exchange (Bright Green) */}
            <div className="bg-primary-light rounded-4xl lg:rounded-[2.5rem] p-6 lg:p-8 text-white relative overflow-hidden group min-h-80 lg:min-h-120 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-bold text-emerald-900/40 uppercase tracking-widest">
                  Cash Connect
                </span>
                <div className="rounded-full border border-emerald-900/10 w-12 h-12 flex items-center justify-center text-emerald-900/40">
                  <Arrowdark width={50} height={50} />
                </div>
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-3 lg:mb-4 text-white">
                Gift Card <br /> Exchange
              </h3>
              <p className="text-white/90 text-sm lg:text-base mb-6 lg:mb-8 leading-relaxed">
                Trade your unused gift cards (Amazon, Steam, iTunes, etc.) for
                cash.
              </p>

              <div className="mt-auto -translate-y-[10%] lg:-translate-y-20">
                <Button className="rounded-full bg-primary-dark hover:bg-emerald-800 text-white font-bold px-8 py-3 text-xs w-fit border-none">
                  Exchange
                </Button>
              </div>

              {/* Decoration */}
              <div className="absolute bottom-4 right-4 hidden lg:block">
                <Image
                  src="/images/money-2.png"
                  alt="BTC Decoration"
                  width={60}
                  height={60}
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Card 3: Global Payouts (Light Green) */}
            <div className="bg-[#D1FADF] rounded-4xl lg:rounded-[2.5rem] p-6 lg:p-8 relative overflow-hidden group min-h-80 lg:min-h-120 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-bold text-emerald-800/60 uppercase tracking-widest">
                  Cash Connect
                </span>
                <div className="rounded-full border border-emerald-800/10 w-12 h-12 flex items-center justify-center text-emerald-800/40">
                  <Arrowdark width={50} height={50} />
                </div>
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-[#007042] leading-tight mb-3 lg:mb-4">
                Global <br /> Payouts
              </h3>
              <p className="text-emerald-800/70 font-medium text-sm lg:text-base mb-6 lg:mb-8 leading-relaxed">
                Send and receive money across borders with ease. Enjoy fast and
                reliable payouts
              </p>

              <div className="mt-auto -translate-y-[10%] lg:-translate-y-20">
                <Button className="rounded-full bg-primary hover:bg-emerald-500 text-white font-bold px-8 py-3 text-xs w-fit border-none">
                  Exchange
                </Button>
              </div>

              {/* Decoration */}
              <div className="absolute bottom-4 right-4 hidden lg:block">
                <Image
                  src="/images/money-1.png"
                  alt="BTC Decoration"
                  width={60}
                  height={60}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <AboutStats />
        <AboutTestimonials />
      </main>

      <CallToAction />
      <Footer />
    </div>
  );
}
