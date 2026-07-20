"use client";

import { useState, useEffect } from "react";
import { Plus, CreditCard, AlertCircle, Trash2, Edit2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useWithdrawalStore } from "@/store/withdrawalStore";
import AddBankAccountModal from "@/components/profile/AddBankAccountModal";

export default function PaymentMethods() {
  const user = useAuthStore((s: any) => s.user);
  const storeBankAccounts = useWithdrawalStore((s: any) => s.bankAccounts);
  const fetchBankAccounts = useWithdrawalStore((s: any) => s.fetchBankAccounts);
  const deleteBankAccount = useWithdrawalStore((s: any) => s.deleteBankAccount);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchBankAccounts();
  }, [fetchBankAccounts]);

  const userBankAccounts = (user as any)?.bank_accounts || (user as any)?.bankAccounts || [];
  const bankAccounts = storeBankAccounts.length > 0 ? storeBankAccounts : userBankAccounts;

  const handleAddNew = () => {
    setSelectedAccount(null);
    setIsModalOpen(true);
  };

  const handleEdit = (account: any) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  const handleDelete = async (accountId: number) => {
    if (!confirm("Are you sure you want to remove this bank account?")) return;
    setDeletingId(accountId);
    try {
      await deleteBankAccount(accountId);
      await fetchBankAccounts();
    } catch (err) {
      console.error("Failed to delete account", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[15px] font-semibold text-slate-800">Payment Methods</p>
        {bankAccounts.length > 0 && (
          <button
            onClick={handleAddNew}
            className="text-[12px] font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-full hover:bg-emerald-100 transition"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Another Account
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {bankAccounts.length > 0 ? (
          bankAccounts.map((account: any, index: number) => {
            const accNum = account.account_number || account.accountNumber || "";
            const bName = account.bank_name || account.bankName || "Bank Account";
            const accName = account.account_name || account.accountName || null;

            return (
              <div 
                key={account.id || index}
                className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-[14px] px-4 py-3.5 hover:bg-slate-100/60 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <CreditCard className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-slate-800">{bName}</p>
                    <p className="text-[12px] text-slate-500 font-medium mt-0.5">
                      {accName && <span>{accName} · </span>}
                      {accNum ? `••••${String(accNum).slice(-4)} (${accNum})` : "Account added"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(account)}
                    className="text-[12px] text-emerald-600 cursor-pointer font-semibold hover:text-emerald-700 transition bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-emerald-50 flex items-center gap-1 shadow-2xs"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(account.id)}
                    disabled={deletingId === account.id}
                    className="text-[12px] text-rose-500 cursor-pointer font-semibold hover:text-rose-700 transition bg-white border border-slate-200 px-2.5 py-1.5 rounded-lg hover:bg-rose-50 disabled:opacity-50 shadow-2xs"
                    title="Delete Account"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-[14px] px-4 py-3">
              <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-[13px] font-medium text-amber-700">No bank account added</p>
                <p className="text-[12px] text-amber-600 mt-0.5">
                  Add your bank account to receive withdrawals and payments.
                </p>
              </div>
            </div>
            <button
              onClick={handleAddNew}
              className="w-full h-[44px] rounded-full bg-emerald-600 cursor-pointer text-white text-[13px] font-medium flex items-center justify-center gap-2 hover:bg-emerald-700 transition shadow-sm"
            >
              <Plus className="h-4 w-4" />
              Add Payment Method
            </button>
          </div>
        )}
      </div>

      <AddBankAccountModal 
        isOpen={isModalOpen} 
        accountToEdit={selectedAccount}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAccount(null);
          fetchBankAccounts();
        }} 
      />
    </div>
  );
}
