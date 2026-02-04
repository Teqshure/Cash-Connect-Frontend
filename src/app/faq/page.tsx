import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { FAQ } from "@/components/sections/FAQ";

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Navbar />
      <main className="grow pt-20">
        <Section background="surface">
          <h1 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-zinc-600 max-w-2xl">
            Find answers to common questions about our platform and services.
          </p>
        </Section>
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
