"use client";

import { useRef } from "react";
import Image from "next/image";
import { CheckCircle, Pencil } from "lucide-react";
import avatar from "../../../public/images/dashboard/avatar.png";
import { useAuthStore } from "@/store/useAuthStore";

export default function ProfileCard() {
  const user = useAuthStore((s: any) => s.user);
  const updateProfile = useAuthStore((s: any) => s.updateProfile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      updateProfile({ profile_image: base64String });
    };
    reader.readAsDataURL(file);
  };

  const getImageUrl = (url: string | null) => {
    if (!url) return avatar;
    if (url.startsWith("data:image/") || url.startsWith("blob:")) return url;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("/storage/")) {
      const host = typeof window !== "undefined" ? window.location.hostname : "";
      if (host.includes("localhost") || host.includes("127.0.0.1")) {
        return `http://localhost:8000${url}`;
      }
      return `https://api.cashconnectworld.com${url}`;
    }
    return url;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* PROFILE CARD */}
      <div
        className="
          bg-white
          rounded-[20px]
          p-6
          border border-slate-100
          shadow-sm
          flex flex-col items-center text-center
        "
      >
        {/* Avatar */}
        <div className="relative h-[90px] w-[90px] rounded-full overflow-hidden border-[4px] border-emerald-100 bg-slate-100">
          <Image 
            src={getImageUrl(user?.profile_image || null)} 
            alt="Profile" 
            fill 
            unoptimized
            className="object-cover"
            priority
          />
        </div>

        {/* Name */}
        <p className="mt-4 text-[16px] font-semibold text-slate-900">
          {user?.fullname || "John Davidson"}
        </p>

        {/* Email */}
        <p className="text-[13px] text-slate-500">
          {user?.email || "john@email.com"}
        </p>

        {/* KYC */}
        <div className="mt-3 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[12px] font-medium">
          <CheckCircle className="h-4 w-4" />
          KYC Verified
        </div>

        {/* Edit Photo */}
        <button 
          onClick={handlePhotoClick}
          className="mt-3 flex items-center cursor-pointer gap-1 text-[13px] text-emerald-600 hover:underline"
        >
          <Pencil className="h-4 w-4" />
          Edit Profile Photo
        </button>
      </div>
    </div>
  );
}
