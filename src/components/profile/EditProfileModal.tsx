"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

type EditProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const user = useAuthStore((s: any) => s.user);
  const updateProfile = useAuthStore((s: any) => s.updateProfile);
  const isLoading = useAuthStore((s: any) => s.isLoading);

  const [fullname, setFullname] = useState(user?.fullname || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [country, setCountry] = useState(user?.country || "");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ fullname, phone, country });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-[20px] w-full max-w-md p-8 shadow-xl overflow-y-auto max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[18px] font-semibold text-slate-900">Edit Profile</h2>
          <button 
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">Full Name</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full h-[48px] px-4 rounded-xl border border-slate-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-[48px] px-4 rounded-xl border border-slate-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full h-[48px] px-4 rounded-xl border border-slate-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full h-[48px] rounded-xl bg-emerald-600 text-white font-medium text-[15px] hover:bg-emerald-700 transition disabled:opacity-70 cursor-pointer"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
