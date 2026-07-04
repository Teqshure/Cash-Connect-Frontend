"use client";

import { Check } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CopySuccessModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* MODAL */}
      <div className="relative bg-white rounded-[24px] w-[90%] max-w-md p-8 text-center shadow-xl">
        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="text-green-600" size={32} />
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-green-600 mb-2">
          Account Copied!
        </h2>

        {/* SUBTEXT */}
        <p className="text-gray-500 text-sm mb-6">
          Share account details with your sender
        </p>

        {/* BUTTON */}
        <button
          onClick={onClose}
          className="bg-green-600 cursor-pointer text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
        >
          Ok
        </button>
      </div>
    </div>
  );
}
