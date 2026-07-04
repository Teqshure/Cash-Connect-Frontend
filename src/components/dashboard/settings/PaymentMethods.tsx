"use client";

import { useState } from "react";
import { Plus, CreditCard, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import AddBankAccountModal from "@/components/profile/AddBankAccountModal";

export default function PaymentMethods() {
  const user = useAuthStore((s: any) => s.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if user has a bank account stored in bank_accounts relation list
  const bankAccounts = (user as any)?.bank_accounts || (user as any)?.bankAccounts || [];
  const bankAccount = bankAccounts[0] || (user as any)?.bank_account || null;

  const accountNumber = bankAccount?.account_number || (user as any)?.account_number || null;
  const accountName = bankAccount?.account_name || (user as any)?.account_name || null;
  const bankName = bankAccount?.bank_name || (user as any)?.bank_name || null;

  const hasAccount = bankAccounts.length > 0 || !!accountNumber;

  return (
    <div className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-sm">
      <p className="text-[15px] font-semibold text-slate-800 mb-4">Payment Methods</p>

      {/* Add/Manage Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full h-[44px] rounded-full bg-emerald-600 cursor-pointer text-white text-[13px] font-medium flex items-center justify-center gap-2 mb-4 hover:bg-emerald-700 transition"
      >
        <Plus className="h-4 w-4" />
        {hasAccount ? "Manage Payment Methods" : "Add Payment Method"}
      </button>

      <div className="flex flex-col gap-3">
        {hasAccount ? (
          <div className="flex items-center justify-between bg-slate-50 rounded-[14px] px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-slate-800">{bankName || "Bank Account"}</p>
                <p className="text-[12px] text-slate-500">
                  {accountName && <span>{accountName} · </span>}
                  {accountNumber ? `••••${String(accountNumber).slice(-4)}` : "Account added"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-[12px] text-emerald-600 cursor-pointer font-medium hover:text-emerald-700 transition"
            >
              Edit
            </button>
          </div>
        ) : (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-[14px] px-4 py-3">
            <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-[13px] font-medium text-amber-700">No bank account added</p>
              <p className="text-[12px] text-amber-600 mt-0.5">
                Add your bank account to receive withdrawals and payments.
              </p>
            </div>
          </div>
        )}
      </div>

      <AddBankAccountModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
