import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { CallToAction } from "@/components/sections/CallToAction";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Navbar />

      <main className="grow pt-24">
        {/* HERO */}
        <Section background="accent">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* LEFT – higher content */}
              <div className="pt-2">
                <p className="mb-3 text-sm font-semibold text-green-600">
                  About Us
                </p>

                <h1 className="max-w-xl text-1xl  leading-tight text-gray-700 lg:text-3xl">
                  Simplifying digital exchange for,<br />
                  everyone , everywhere, anytime.
                </h1>

                <div className="mt-8">
                  <button className="rounded-full bg-[#00B86B] px-8 py-3 text-sm font-semibold text-white hover:bg-green-700 transition">
                    Get Started
                  </button>
                </div>
              </div>

              {/* RIGHT – pushed downward */}
              <div className="flex items-end pb-13">
                <p className="max-w-md text-base leading-relaxed text-gray-500">
                  Whether you're a crypto trader or a gift card holder,
                  our mission is to make exchanging as simple and
                  rewarding as possible — no confusion, no delays.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* STORY + VISION / MISSION */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* IMAGE (2/3 width) */}
            <div className="relative col-span-2 h-[580px] overflow-hidden rounded-3xl">
              <Image
                src="/images/our_story.png"
                alt="Our Story"
                fill
                className="object-cover"
                priority
              />

              <div className="absolute inset-0 bg-black/35" />

              <div className="absolute bottom-6 left-6 max-w-md text-white">
                {/* <h3 className="mb-2 text-lg font-semibold">Our Story</h3> */}
                {/* <p className="text-sm leading-relaxed text-white/90">
                  Our journey began with one goal: to simplify trading,
                  maximize value, and protect users through a platform
                  built on trust, transparency, global access, and
                  reliable support.
                </p> */}
              </div>
            </div>

            {/* VISION + MISSION – SAME HEIGHT AS IMAGE */}
            <div className="flex h-[580px] flex-col gap-6">
              <div className="flex-1 rounded-3xl bg-green-100 p-8">
                <h3 className="mb-3 text-lg font-semibold text-green-800">
                  Our Vision
                </h3>
                <p className="text-sm leading-relaxed text-green-800/80">
                  To lead digital exchange with trust, speed,
                  innovation, and inclusivity everywhere.
                </p>
              </div>

              <div className="flex-1 rounded-3xl bg-[#00B86B] p-8 text-white">
                <h3 className="mb-3 text-lg font-semibold">
                  Our Mission
                </h3>
                <p className="text-sm leading-relaxed text-white/90">
                  Delivering fast, trusted, and user-first exchange
                  experiences daily.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* SERVICES */}
      <section className="relative mx-auto max-w-7xl px-6 pb-24">
        {/* Background network pattern (optional if already global) */}
        <div className="pointer-events-none absolute inset-0 opacity-40" />

        {/* Header */}
        <div className="mb-14 max-w-xl">
          <p className="mb-3 text-sm font-semibold text-green-600">
            Our Services
          </p>

          <h2 className="text-2xl font-medium leading-snug text-gray-700 lg:text-3xl">
            Simplifying digital exchange for
            everyone, everywhere, anytime.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="relative flex flex-col justify-between rounded-3xl bg-[#007A4D] p-8 text-white">
            <div>
              <p className="mb-6 text-sm opacity-80">Cash Connect</p>
              <h3 className="mb-4 text-2xl font-semibold">
                Crypto to <br /> Cash
              </h3>
              <p className="text-sm opacity-90">
                Instantly convert your Bitcoin and other cryptocurrencies
                to Naira at competitive rates.
              </p>
            </div>

            <button className="mt-10 w-fit rounded-full bg-green-700 px-6 py-2 text-sm font-medium">
              Exchange
            </button>

            {/* Arrow */}
            <span className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/30">
              ↗
            </span>
          </div>

          {/* Card 2 */}
          <div className="relative flex flex-col justify-between rounded-3xl bg-[#00B86B] p-8 text-white">
            <div>
              <p className="mb-6 text-sm opacity-80">Cash Connect</p>
              <h3 className="mb-4 text-2xl font-semibold">
                Gift Card <br /> Exchange
              </h3>
              <p className="text-sm opacity-90">
                Trade your unused gift cards (Amazon, Steam, iTunes, etc.)
                for cash.
              </p>
            </div>

            <button className="mt-10 w-fit rounded-full bg-green-700 px-6 py-2 text-sm font-medium">
              Exchange
            </button>

            <span className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/30">
              ↗
            </span>
          </div>

          {/* Card 3 */}
          <div className="relative flex flex-col justify-between rounded-3xl bg-[#CCF5E0] p-8 text-green-900">
            <div>
              <p className="mb-6 text-sm opacity-70">Cash Connect</p>
              <h3 className="mb-4 text-2xl font-semibold">
                Global <br /> Payouts
              </h3>
              <p className="text-sm opacity-80">
                Send and receive money across borders with ease.
                Enjoy fast and reliable payouts.
              </p>
            </div>

            <button className="mt-10 w-fit rounded-full bg-[#00B86B] px-6 py-2 text-sm font-medium text-white">
              Exchange
            </button>

            <span className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-green-700/30">
              ↗
            </span>
          </div>
        </div>
      </section>

      </main>

      <CallToAction />
      <Footer />
    </div>
  );
}
