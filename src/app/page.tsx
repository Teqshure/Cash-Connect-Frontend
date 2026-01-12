import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CallToAction } from "@/components/sections/CallToAction";
import { Hero } from "@/components/sections/Hero";
import { LiveRates } from "@/components/sections/LiveRates";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { Team } from "@/components/sections/Team";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900">
      <Navbar />

      <main className="grow">
        <Hero />
        <Stats />
        <LiveRates />
        <Process />
        <WhyChooseUs />
        <Testimonials />
        <Team />
        <Services />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}
