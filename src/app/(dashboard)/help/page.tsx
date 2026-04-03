"use client";

import HelpCards from "@/components/dashboard/help/HelpCards";
import HelpContact from "@/components/dashboard/help/HelpContact";
import HelpWhatsApp from "@/components/dashboard/help/HelpWhatsApp";

export default function HelpPage() {
  return (
    <div className="w-full px-4 lg:px-6 py-6 space-y-8">
      <HelpCards />
      <HelpContact />
      <HelpWhatsApp />
    </div>
  );
}
