import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Team } from "@/components/sections/Team";
import { CallToAction } from "@/components/sections/CallToAction";
import { Services } from "@/components/sections/Services";

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900">
      <Navbar />
      <main className="grow ">
        {" "}
        {/* Added pt-20 to account for fixed navbar */}
        <Team />
        <Services />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
