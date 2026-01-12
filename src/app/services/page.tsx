import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Navbar />
      <main className="grow pt-20">
        <Section background="surface">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-zinc-600 max-w-2xl">
            Explore our wide range of services including gift card exchange,
            crypto to cash, and global payouts.
          </p>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
