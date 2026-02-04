"use client";

import { Section } from "@/components/ui/Section";
import React, { useState } from "react";

const faqData = [
  {
    id: 1,
    question: "What is a Payment Gateway?",
    answer:
      "A payment gateway is an ecommerce service that processes online payments for online as well as offline businesses. Payment gateways help accept payments by transferring key information from their merchant websites to issuing banks, card associations and online wallet players.\n\nPayment gateways play a vital role in the online transaction process, which is the realisation of value, and hence are seen as an important pillar of ecommerce.",
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
  {
    id: 6,
    question: "How do you ensure the security of my transactions?",
    answer:
      "We take security extremely seriously. All transactions are protected by industry-standard 256-bit SSL encryption. Furthermore, we employ advanced fraud detection algorithms and real-time monitoring to identify and prevent suspicious activities. Our platform is fully compliant with PCI-DSS standards, ensuring that your financial data is handled with the highest level of care. We also offer multi-factor authentication for all user accounts and provide detailed transaction logs so you can monitor your account activity closely. Our dedicated security team performs regular audits and penetration testing to stay ahead of potential threats and maintain a robust defense against cyberattacks. In addition to these technical measures, we also provide comprehensive educational resources to help our users understand best practices for maintaining their own security online.",
  },
];

export const FAQ = () => {
  const [activeId, setActiveId] = useState(1);

  return (
    <Section background="white" className="pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12">
          <h2 className="lg:text-3xl text-2xl font-bold text-primary-dark tracking-tight text-center lg:text-left">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center">
          {/* Left: Questions List - Overlapping on Desktop */}
          <div className="w-full lg:w-[58%] bg-white rounded-2xl shadow-2xl shadow-emerald-900/10 p-2 z-20 relative lg:-mr-16">
            {faqData.map((faq) => (
              <div
                key={faq.id}
                className="flex flex-col border-b border-zinc-50 last:border-0"
              >
                <button
                  onClick={() => setActiveId(faq.id)}
                  className={`w-full text-left p-3 md:p-4 rounded-xl transition-all duration-300 flex items-center gap-4 ${
                    activeId === faq.id
                      ? "bg-white"
                      : "bg-transparent hover:bg-zinc-50"
                  } cursor-pointer`}
                >
                  {/* Dot */}
                  <div
                    className={`w-4 h-4 rounded-full shrink-0 transition-colors duration-300 ${
                      activeId === faq.id ? "bg-[#00D67D]" : "bg-primary-dark"
                    }`}
                  />

                  {/* Question Text */}
                  <span
                    className={`font-medium text-sm md:text-base flex-1 ${
                      activeId === faq.id
                        ? "text-primary-dark"
                        : "text-zinc-600"
                    }`}
                  >
                    {faq.question}
                  </span>

                  {/* Arrow Icon */}
                  <div
                    className={`ml-auto text-[#00D67D] transition-transform duration-300 ${
                      activeId === faq.id ? "rotate-90" : ""
                    }`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                </button>

                {/* Mobile Accordion Answer */}
                <div
                  className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    activeId === faq.id
                      ? "max-h-125 opacity-100 mt-2 mb-4"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="pl-13 pr-5 text-sm text-zinc-500 leading-relaxed font-medium whitespace-pre-wrap">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Answer Card - Bottom Layer on Desktop */}
          <div className="w-full lg:w-[65%] hidden lg:block lg:translate-x-12">
            <div className="bg-[#F9FAFB] rounded-[2.5rem] p-12 pl-24 min-h-125 border border-zinc-100 flex flex-col justify-center transition-all duration-500">
              {faqData.map((faq) => {
                if (faq.id !== activeId) return null;
                return (
                  <div
                    key={faq.id}
                    className="animate-in fade-in slide-in-from-right-4 duration-500"
                  >
                    <h3 className="text-2xl md:text-2xl font-bold text-[#007042] mb-8 leading-tight">
                      {faq.question}
                    </h3>
                    <p className="text-zinc-600 leading-[1.8] text-base md:text-lg font-medium whitespace-pre-wrap">
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
