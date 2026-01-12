import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CallToAction } from "@/components/sections/CallToAction";
import { ProductHero } from "@/components/sections/ProductHero";
import { ProductFeature } from "@/components/sections/ProductFeature";
import { Services } from "@/components/sections/Services";

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900">
      <Navbar />

      <main className="grow">
        <ProductHero />

        <CallToAction />

        <ProductFeature
          title="Spread love with giftcard"
          description="Put a smile on your loved one faces with Spread love whilst transaction hostees clear rating of giftcard gift through our platform."
          imageContent={
            <div className="relative w-full max-w-md mx-auto">
              <div className="relative bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-[3rem] p-12 flex items-center justify-center min-h-[300px]">
                <div className="flex gap-4 transform rotate-12">
                  <div className="w-24 h-32 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl shadow-2xl flex items-center justify-center text-white font-bold text-2xl transform -rotate-12">
                    🎁
                  </div>
                  <div className="w-24 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl shadow-2xl flex items-center justify-center text-white font-bold text-2xl transform rotate-6">
                    💝
                  </div>
                  <div className="w-24 h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-2xl flex items-center justify-center text-white font-bold text-2xl transform -rotate-6">
                    🎉
                  </div>
                </div>
              </div>
            </div>
          }
          imagePosition="right"
          buttonText="Start now"
        />

        <ProductFeature
          title="Exchange your unused Giftcard for value"
          description="Don't wait for third officersto trade in your hands, exchange them for value the Instantaneous rates"
          imageContent={
            <div className="relative w-full max-w-sm mx-auto">
              <div className="relative bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-[3rem] p-12 flex items-center justify-center min-h-[300px]">
                <div className="relative">
                  {/* Wallet/Card holder visual */}
                  <div className="w-48 h-32 bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-2xl shadow-2xl transform -rotate-6 flex items-center justify-center">
                    <div className="w-32 h-20 bg-gradient-to-br from-zinc-800 to-black rounded-xl flex items-center justify-center">
                      <span className="text-white text-4xl">💳</span>
                    </div>
                  </div>
                  {/* Amazon card peeking out */}
                  <div className="absolute -bottom-4 -right-4 w-32 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl shadow-xl transform rotate-12 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AMAZON</span>
                  </div>
                </div>
              </div>
            </div>
          }
          imagePosition="left"
          backgroundColor="white"
          buttonText="Start now"
        />

        <Services />
      </main>

      <Footer />
    </div>
  );
}
