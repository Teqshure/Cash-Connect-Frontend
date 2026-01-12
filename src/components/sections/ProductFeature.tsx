"use client";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import React from "react";
import Link from "next/link";

interface ProductFeatureProps {
  title: string;
  description: string;
  imageContent: React.ReactNode;
  imagePosition?: "left" | "right";
  backgroundColor?: string;
  buttonText?: string;
  buttonLink?: string;
}

export const ProductFeature = ({
  title,
  description,
  imageContent,
  imagePosition = "right",
  backgroundColor = "white",
  buttonText = "Get Started",
  buttonLink = "/signup",
}: ProductFeatureProps) => {
  const isImageRight = imagePosition === "right";

  return (
    <Section
      background={backgroundColor as any}
      className="py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div
          className={`flex flex-col ${
            isImageRight ? "lg:flex-row" : "lg:flex-row-reverse"
          } items-center gap-12 lg:gap-20`}
        >
          {/* Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#007042] tracking-tight leading-tight">
              {title}
            </h2>
            <p className="text-lg text-zinc-600 leading-relaxed font-medium">
              {description}
            </p>
            <Link href={buttonLink}>
              <Button className="rounded-full bg-[#00D67D] hover:bg-emerald-500 text-white font-bold px-8 py-3 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105">
                {buttonText}
              </Button>
            </Link>
          </div>

          {/* Image/Visual Content */}
          <div className="w-full lg:w-1/2">{imageContent}</div>
        </div>
      </div>
    </Section>
  );
};
