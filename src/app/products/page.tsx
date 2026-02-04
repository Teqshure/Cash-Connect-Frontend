import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

import { CallToAction } from "@/components/sections/CallToAction";
import { ProductHero } from "@/components/sections/ProductHero";
import { ProductFeature } from "@/components/sections/ProductFeature";
import { Services } from "@/components/sections/Services";
import Coin from "@/components/icons/coin";
import Arrow from "@/components/icons/arrowsmile";
import Btc from "@/components/icons/btc";
import Image from "next/image";
import Globe from "@/components/icons/globe";

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900">
      <Navbar />

      <main className="grow">
        <ProductHero />

        <CallToAction />

        <ProductFeature
          label="Cash Connect"
          title="Spread love with giftcard"
          description="Put a smile on your loved one faces with Spread love whilst transaction hostees clear rating of giftcard gift through our platform."
          imageContent={
            <div className="relative w-full mx-auto">
              <div className="absolute -bottom-12 -right-12 delay-1000 z-10">
                <Arrow className="w-24 h-24 text-emerald-500 rotate-12" />
              </div>

              <div className="relative w-full  flex items-center justify-center">
                <Image
                  src="/images/d2.png"
                  alt="Spread Love"
                  width={500}
                  height={500}
                  className=" w-full relative z-10"
                />
              </div>
              <Globe className="absolute bottom-[-20%] -left-35 lg:block hidden " />
            </div>
          }
          imagePosition="right"
          buttonText="Gift a Card"
        />

        <ProductFeature
          label="Cash Connect"
          title="Exchange your unused Giftcard for value"
          description="Don't wait for that Giftcard to expire in your hands, exchange them for value the seamless and better way Mouthwatering Rates"
          imageContent={
            <div className="relative w-full mx-auto">
              {/* Floating Icons */}
              {/* <div className="absolute -top-10 -right-10  delay-500 z-10">
                <Btc className="w-16 h-16 drop-shadow-xl rotate-12" />
              </div> */}
              {/* <div className="absolute -bottom-8 -left-8 animate-pulse delay-300 z-10">
                <Coin className="w-14 h-14 drop-shadow-lg -rotate-12" />
              </div> */}

              <div className="relative flex items-center justify-center">
                <Image
                  src="/images/p3.png"
                  alt="Exchange Gift Cards"
                  width={500}
                  height={500}
                  className="w-full relative z-10"
                />
              </div>
              <Globe className="absolute -bottom-20 -right-130 lg:block hidden " />
            </div>
          }
          imagePosition="left"
          backgroundColor="white"
          buttonText="Gift a Card"
        />

        <Services showProductsHeader={true} />
      </main>

      <Footer />
    </div>
  );
}
