"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col items-center justify-center p-4">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      <div className="max-w-md w-full text-center space-y-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <h1 className="text-[120px] font-black text-[#009966] leading-none tracking-tight select-none">
          404
        </h1>
        
        <h2 className="text-[22px] font-bold text-[#1a1a1a]">
          Page Not Found
        </h2>
        
        <p className="text-[14px] text-slate-500 leading-relaxed max-w-sm mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="pt-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#009966] text-[#ffffff] font-medium text-[14px] hover:bg-[#007a4d] transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
