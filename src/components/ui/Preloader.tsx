"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [visible, setVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("cc_app_loaded");
    }
    return true;
  });
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("cc_app_loaded")) {
      setVisible(false);
      return;
    }

    // Quick fade out as soon as hydration finishes (~250ms)
    const fadeTimer = setTimeout(() => {
      setOpacity(0);
      try {
        sessionStorage.setItem("cc_app_loaded", "true");
      } catch (e) {}
    }, 300);

    const unmountTimer = setTimeout(() => setVisible(false), 550);

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
