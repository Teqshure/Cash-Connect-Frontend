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
  label?: string;
}

export const ProductFeature = ({
  title,
  description,
  imageContent,
  imagePosition = "right",
  backgroundColor = "white",
  buttonText = "Get Started",
  buttonLink = "/signup",
  label,
}: ProductFeatureProps) => {
  const isImageRight = imagePosition === "right";

  return (
    <Section
      background={backgroundColor as any}
      className="py-12 md:py-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div
          className={`flex flex-col ${
            isImageRight ? "lg:flex-row" : "lg:flex-row-reverse"
          } items-center gap-12 lg:gap-20`}
        >
          {/* Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            {label && (
              <span className="text-emerald-500 font-bold tracking-widest uppercase text-xs block mb-2">
                {label}
              </span>
            )}
            <h2 className="md:text-3xl text-xl font-extrabold text-[#007042] tracking-tight leading-tight">
              {title}
            </h2>
            <p className="text-[10px] md:text-xl text-primary-dark leading-relaxed font-normal">
              {description}
            </p>
            <Link href={buttonLink}>
              <button className="rounded-full bg-primary] hover:bg-emerald-500 bg-primary md:text-xl md:px-8 md:py-4 px-4 py-2 text-[10px] font-normal text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-105">
                {buttonText}
              </button>
            </Link>
          </div>

          {/* Image/Visual Content */}
          <div className="w-full lg:w-1/2">{imageContent}</div>
        </div>
      </div>
    </Section>
  );
};
