"use client";

import { Section } from "@/components/ui/Section";
import React, { useState } from "react";
import { motion } from "framer-motion";

const faqData = [
  {
    id: 1,
    question: "What is Cash Connect?",
    answer:
      "Cash Connect is a premium digital asset exchange platform that allows you to securely trade cryptocurrencies, sell gift cards, and receive global payments from abroad (such as PayPal, Zelle, Cash App, Venmo, Revolut/Wise, and Bank Wires) directly into your local Naira wallet at high rates.",
  },
  {
    id: 2,
    question:
      "Do I need to pay any setup or maintenance fees to Cash Connect?",
    answer:
      "No, there are absolutely no setup fees, account maintenance fees, or annual charges. We only charge a small transparent fee per successful transaction or conversion.",
  },
  {
    id: 3,
    question: "How do I receive global payments using Cash Connect?",
    answer:
      "Simply navigate to 'Receive Global Payment' in your dashboard, choose an active payment method, fill out your transaction details, and we will display the verified bank or payment account details. Once your sender pays into the account, notify the admin and your Naira wallet will be automatically credited.",
  },
  {
    id: 4,
    question: "What payout methods do you support for international transfers?",
    answer:
      "We support premium global transfer channels including PayPal, Zelle, Venmo, Cash App, Revolut / Wise, and international Bank Wire Transfers.",
  },
  {
    id: 5,
    question: "How fast are the transactions processed and credited?",
    answer:
      "Most transactions are verified and paid out within minutes of approval by the administrator. Cryptocurrencies are processed automatically upon network confirmations, and gift cards are credited immediately once validated.",
  },
  {
    id: 6,
    question: "How do you ensure the security of my transactions?",
    answer:
      "Security is our top priority. All transactions, financial accounts, and personal data are encrypted end-to-end using 256-bit SSL technology. Our platform utilizes advanced real-time monitoring and strict admin validation protocols to keep your funds safe and secure.",
  },
];

export const FAQ = () => {
  const [activeId, setActiveId] = useState(1);

  return (
    <Section background="white" className="pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="lg:text-3xl text-2xl font-bold text-primary-dark tracking-tight text-center lg:text-left">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="relative flex flex-col lg:flex-row items-center">
          {/* Left: Questions List */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[58%] bg-white rounded-2xl shadow-2xl shadow-emerald-900/10 p-2 z-20 relative lg:-mr-16"
          >
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
          </motion.div>

          {/* Right: Answer Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[65%] hidden lg:block lg:translate-x-12"
          >
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
          </motion.div>
        </div>
      </div>
    </Section>
  );
};
