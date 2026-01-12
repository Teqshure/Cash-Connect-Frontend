import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Navbar />
      <main className="grow pt-20">
        <Section background="white">
          <h1 className="text-4xl font-bold mb-4">Latest from Blog</h1>
          <p className="text-zinc-600 max-w-2xl">
            Stay updated with the latest news, trends, and tips in the crypto
            and digital asset space.
          </p>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
