"use client";

import { Section } from "@/components/ui/Section";
import React, { useState } from "react";

const faqData = [
  {
    id: 1,
    question: "What is a Payment Gateway?",
    answer:
      "A payment gateway is an e-commerce service that processes credit card payments for online stores. Payment gateways facilitate these transactions by transferring key information between payment portals such as web-enabled mobile devices/websites and the front end processor/bank.",
  },
  {
    id: 2,
    question:
      "Do I need to pay to Instapay even when there is no transaction going on in my business?",
    answer:
      "No, you do not need to pay any maintenance fees if there are no transactions. We only charge a small fee per successful transaction.",
  },
  {
    id: 3,
    question: "What platforms does Instapay payment gateway support?",
    answer:
      "We support a wide range of platforms including Web, iOS, Android, and major e-commerce CMS like WooCommerce, Shopify, and Magento.",
  },
  {
    id: 4,
    question: "Does Instapay provide international payments support?",
    answer:
      "Yes, we support international payments in over 135 currencies, allowing you to accept payments from customers globally.",
  },
  {
    id: 5,
    question:
      "Is there any setup fee or annual maintenance fee that I need to pay regularly?",
    answer:
      "There are no setup fees or annual maintenance fees. You only pay for the transactions you process.",
  },
];

export const FAQ = () => {
  const [activeId, setActiveId] = useState(1);

  return (
    <Section background="white" className="py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#007042] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: Questions List */}
          <div className="w-full lg:w-1/2 space-y-2">
            {faqData.map((faq) => (
              <button
                key={faq.id}
                onClick={() => setActiveId(faq.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center gap-4 group ${
                  activeId === faq.id
                    ? "bg-white shadow-md border-l-4 border-[#00D67D]"
                    : "hover:bg-zinc-50 border-l-4 border-transparent"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    activeId === faq.id
                      ? "bg-[#00D67D]"
                      : "bg-emerald-200 group-hover:bg-[#00D67D]"
                  }`}
                />
                <span
                  className={`font-semibold text-sm md:text-base ${
                    activeId === faq.id
                      ? "text-[#007042]"
                      : "text-zinc-600 group-hover:text-[#007042]"
                  }`}
                >
                  {faq.question}
                </span>

                {/* Arrow for active state indication on mobile or small screens could be added here */}
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00D67D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Answer Card */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-emerald-900/5 border border-emerald-50 h-full flex flex-col justify-center min-h-[300px] transition-all duration-500">
              {faqData.map((faq) => {
                if (faq.id !== activeId) return null;
                return (
                  <div
                    key={faq.id}
                    className="animate-in fade-in slide-in-from-right-4 duration-300"
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-[#007042] mb-6 leading-tight">
                      {faq.question}
                    </h3>
                    <p className="text-zinc-500 leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
