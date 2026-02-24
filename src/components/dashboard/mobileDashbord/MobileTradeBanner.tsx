"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export default function MobileTradeBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="px-4 mt-6"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative rounded-[24px] overflow-hidden p-5"
        style={{
          background:
            "linear-gradient(135deg, #00D492 0%, #00BC7D 50%, #009966 100%)",
          boxShadow: "0px 4px 6px -4px #00BC7D4D, 0px 10px 15px -3px #00BC7D4D",
        }}
      >
        {/* Abstract background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/20 blur-2xl"></div>
          <div className="absolute -left-4 -bottom-4 w-32 h-32 rounded-full bg-white/20 blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-start gap-4">
          {/* Left side - Text content */}
          <div className="flex-1">
            <h3 className="text-[18px] font-bold text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-300" />
              Trade Crypto Instantly
            </h3>

            <p className="text-[13px] text-white/80 mt-1 leading-relaxed">
              Fast, Secure & Global Payments
            </p>

            {/* Discount tag */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.4,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 2,
              }}
              className="mt-3 inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1"
            >
              <span className="text-[11px] font-medium text-white">
                20% Discount on all transfers
              </span>
            </motion.div>

            {/* Start Now Button */}
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 bg-white text-emerald-700 text-[13px] font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg"
            >
              Start Now
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </motion.button>
          </div>

          {/* Right side - Image/Icon space */}
          <motion.div
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-20 h-20 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center border border-white/20"
          >
            {/* Placeholder for image - you can replace with an actual Image component */}
            <div className="text-4xl">🚀</div>
            {/* <Image src="/crypto-rocket.png" width={60} height={60} alt="Crypto" /> */}
          </motion.div>
        </div>

        {/* Animated glow effect */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
        />
      </motion.div>
    </motion.div>
  );
}
