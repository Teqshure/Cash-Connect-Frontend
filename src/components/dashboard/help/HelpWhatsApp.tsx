"use client";

import { MessageCircle } from "lucide-react";

export default function HelpWhatsApp() {
  return (
    <a
      href="https://wa.me/23478987534"
      target="_blank"
      className="
        fixed bottom-6 right-6
        h-[56px] w-[56px]
        rounded-full
        bg-green-500
        flex items-center justify-center
        shadow-lg
        hover:scale-105
        transition
      "
    >
      <MessageCircle className="text-white h-6 w-6" />
    </a>
  );
}
