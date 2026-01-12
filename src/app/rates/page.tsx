import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";

export default function RatesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Navbar />
      <main className="grow pt-20">
        <Section background="accent">
          <h1 className="text-4xl font-bold mb-4">Live Exchange Rates</h1>
          <p className="text-zinc-600 max-w-2xl">
            Get the most competitive real-time rates for crypto and gift cards.
          </p>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
