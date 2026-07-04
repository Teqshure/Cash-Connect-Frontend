import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

import { CallToAction } from "@/components/sections/CallToAction";
import { ProductHero } from "@/components/sections/ProductHero";
import { ProductFeature } from "@/components/sections/ProductFeature";
import { Services } from "@/components/sections/Services";
import Arrow from "@/components/icons/arrowsmile";
import Image from "next/image";
import Globe from "@/components/icons/globe";

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900">
      <Navbar />

      <main className="grow">
        <ProductHero />

        {/* FEATURE 1: Receive Global Payments */}
        <ProductFeature
          label="Cash Connect Global"
          title="Receive Global Payments Worldwide"
          description="Accept money globally from clients or senders via Zelle, PayPal, Cash App, Venmo, Revolut/Wise, and international Bank Wires. We convert it instantly at premium rates and update your local Naira wallet balance directly."
          imageContent={
            <div className="relative w-full mx-auto">
              <div className="relative flex items-center justify-center">
                <Image
                  src="/images/young-woman.png"
                  alt="Receive Global Payments"
                  width={500}
                  height={500}
                  className="w-full relative z-10 rounded-[3rem] object-cover"
                />
              </div>
              <Globe className="absolute -bottom-20 -left-35 lg:block hidden " />
            </div>
          }
          imagePosition="right"
          buttonText="Get Paid Globally"
          buttonLink="/signup"
        />

        {/* FEATURE 2: Gift Card Love */}
        <ProductFeature
          label="Cash Connect Love"
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
          imagePosition="left"
          buttonText="Gift a Card"
          buttonLink="/signup"
          backgroundColor="white"
        />

        {/* FEATURE 3: Gift Card Sell */}
        <ProductFeature
          label="Cash Connect Exchange"
          title="Exchange your unused Giftcard for value"
          description="Don't wait for that Giftcard to expire in your hands, exchange them for value the seamless and better way Mouthwatering Rates"
          imageContent={
            <div className="relative w-full mx-auto">
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
          imagePosition="right"
          backgroundColor="white"
          buttonText="Sell Gift Card"
          buttonLink="/signup"
        />

        <Services showProductsHeader={true} />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}
