"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Start fading out 300ms before unmount
    const fadeTimer = setTimeout(() => setOpacity(0), 2700);
    // Unmount at 3000ms
    const unmountTimer = setTimeout(() => setVisible(false), 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-300 ease-out"
      style={{ opacity }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-20 h-20 md:w-32 md:h-32 animate-pulse animate-scale-up">
          <Image
            src="/logo.png"
            alt="Cash Connect"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="w-36 h-1 bg-slate-100 rounded-full overflow-hidden relative animate-fade-in-up">
          <div className="absolute inset-0 bg-emerald-600 rounded-full animate-preloader-bar" />
        </div>
      </div>
    </div>
  );
}
