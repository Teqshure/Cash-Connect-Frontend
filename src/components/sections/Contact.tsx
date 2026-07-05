"use client";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Phone, Mail, MapPin, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const heroImage = require("../../../public/images/gift-card-right.png");
const getApiUrl = () => {
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host.includes("localhost") || host.includes("127.0.0.1")) {
      return "http://localhost:8000/api/v1";
    }
  }
  return "https://api.cashconnectworld.com/api/v1";
};
const API_URL = getApiUrl();

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      setSubmitStatus("error");
      setStatusMessage("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setStatusMessage("");

    try {
      const response = await fetch(`${API_URL}/contact/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus("success");
        setStatusMessage("Thank you! Your message has been sent successfully.");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setSubmitStatus("error");
        setStatusMessage(data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setStatusMessage("A connection error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section
      background="white"
      className="py-34 relative pt-15 lg:pt-40 overflow-hidden"
    >
      <div className="container w-full relative z-10 max-w-6xl">
        {/* Background Decorations - Anchored to Container */}
        <div className="absolute top-[-15%] left-[-20%] w-150 h-150 bg-primary opacity-15 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-[3%] right-[-10%] w-125 h-125 bg-primary opacity-15 rounded-full blur-[100px] pointer-events-none -z-10" />
        
        <div className="flex w-full flex-col lg:flex-row justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">
              Contact Us
            </span>
            <h2 className="text-2xl md:text-3xl font-light text-gray-800 tracking-tight leading-tight max-w-xl">
              Simplifying digital exchange for everyone, everywhere, anytime.
            </h2>
          </motion.div>
          <div className="hidden lg:block px-40 relative -top-10">
            <Image
              src={heroImage}
              alt="Hero"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">
          {/* Left: Contact Info Card - Green */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[40%] bg-primary-dark rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden flex flex-col justify-center min-h-137.5 "
          >
            {/* Background Decoration */}
            <div className="absolute -bottom-25 -right-25 w-80 h-80 bg-[#00E096] rounded-full p-2 opacity-60 blur-3xl pointer-events-none" />

            <div className="  mb-10 pl-2">
              <span className="text-primary-light text-sm font-medium mb-14 block">
                Cash Connect
              </span>
              <h3 className=" text-2xl font-semibold mb-6">
                Contact Information
              </h3>
              <p className="text-emerald-50 font-normal mb-12 leading-relaxed opacity-90 text-base max-w-xs">
                Get in touch with us for support, partnerships, or any other inquiries.
              </p>

              <div className="space-y-8 mt-12">
                <div className="flex items-start gap-5">
                  <Phone className="w-6 h-6 text-white mt-1 shrink-0" />
                  <div className="text-white font-small text-base">
                    <p>+234 813 956 2826</p>
                    <p>+234 816 364 8159</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <Mail className="w-6 h-6 text-white shrink-0" />
                  <div className="text-white font-medium text-base">
                    <p>info@cashconnectworld.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <MapPin className="w-6 h-6 text-white shrink-0" />
                  <div className="text-white font-medium text-base">
                    <p>Rivers State, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full lg:w-[60%] lg:pl-10 pt-4"
          >
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-12 gap-y-12">
                <div className="space-y-2">
                  <label className="lg:text-lg font-medium text-sm text-primary-dark block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-b border-primary/30 focus:border-primary outline-none py-2 text-zinc-700 bg-transparent transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="lg:text-lg font-medium text-sm text-primary-dark block">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b border-primary/30 focus:border-primary outline-none py-2 text-zinc-700 bg-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="lg:text-lg font-medium text-sm text-primary-dark block">
                  Your Subject
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border-b border-primary/30 focus:border-primary outline-none py-2 text-zinc-700 bg-transparent transition-all"
                  placeholder="Enter message subject"
                />
              </div>

              <div className="space-y-2">
                <div className="flex flex-col gap-2">
                  <label className="lg:text-lg font-medium text-sm text-primary-light block">
                    Message
                  </label>
                  <span className="text-primary-dark font-medium lg:text-lg text-sm">
                    Write Your message here
                  </span>
                </div>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border-b border-primary/30 focus:border-primary outline-none py-2 text-zinc-700 bg-transparent resize-none transition-all"
                  placeholder="Tell us what you need..."
                />
              </div>

              {submitStatus && (
                <div className={`p-4 rounded-xl text-sm font-semibold flex items-center gap-3 border ${
                  submitStatus === "success"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                    : "bg-rose-50 text-rose-700 border-rose-100"
                }`}>
                  {submitStatus === "success" ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <AlertCircle className="w-5 h-5 text-rose-500" />}
                  {statusMessage}
                </div>
              )}

              <div className="pt-4">
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-[#00B86B] hover:bg-emerald-600 text-white font-semibold px-8 py-3 w-fit text-sm border-none shadow-none flex items-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};
