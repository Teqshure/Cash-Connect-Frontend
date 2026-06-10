"use client";

import { User, Mail, Phone, Globe, ChevronRight, Edit3 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";
import EditProfileModal from "./EditProfileModal";

export default function AccountDetails() {
  const user = useAuthStore((s: any) => s.user);
  const refreshUser = useAuthStore((s: any) => s.refreshUser);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // ✅ Ensure latest user data from API
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <div
      className="
        bg-white
        rounded-[20px]
        cursor-pointer
        p-6
        border border-slate-100
        shadow-sm
        flex flex-col
      "
    >
      <div className="flex justify-between items-center mb-4">
        <p className="text-[16px] font-semibold text-slate-800">
          Account Details
        </p>
        <button 
          onClick={() => setIsEditModalOpen(true)}
          className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition cursor-pointer"
        >
          <Edit3 className="h-4 w-4" />
          Edit
        </button>
      </div>

      <div className="flex flex-col divide-y divide-slate-100">
        {/* FULL NAME */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-slate-400" />
            <div>
              <p className="text-[13px] text-slate-500">Full Name</p>
              <p className="text-[14px] font-medium text-slate-800">
                {user?.fullname || "—"}
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-400" />
        </div>

        {/* EMAIL */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-slate-400" />
            <div>
              <p className="text-[13px] text-slate-500">Email Address</p>
              <p className="text-[14px] font-medium text-slate-800">
                {user?.email || "—"}
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-400" />
        </div>

        {/* PHONE */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-slate-400" />
            <div>
              <p className="text-[13px] text-slate-500">Phone Number</p>
              <p className="text-[14px] font-medium text-slate-800">
                {user?.phone || "—"}
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-400" />
        </div>

        {/* COUNTRY */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-slate-400" />
            <div>
              <p className="text-[13px] text-slate-500">Country</p>
              <p className="text-[14px] font-medium text-slate-800">
                {user?.country || "—"}
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-400" />
        </div>
      </div>

      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />
    </div>
  );
}
