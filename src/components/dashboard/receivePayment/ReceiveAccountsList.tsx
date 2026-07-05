"use client";

import { useState } from "react";
import { Copy, Check, Loader2 } from "lucide-react";
import { InternationalAccount } from "@/store/globalPayment";
import CopySuccessModal from "./CopySuccessModal";

type Props = {
  accounts: InternationalAccount[];
  currency: string;
  onBack: () => void;
  onCopy: (account: InternationalAccount) => void;
  onSelect: (account: InternationalAccount) => void;
};

export default function ReceiveAccountsList({
  accounts,
  currency,
  onBack,
  onCopy,
  onSelect,
}: Props) {
  console.log("📺 [ACCOUNTS LIST RECEIVED]:", accounts);

  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [successIds, setSuccessIds] = useState<number[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCopyAndNotify = async (account: InternationalAccount) => {
    if (loadingIds.includes(account.id) || successIds.includes(account.id)) return;

    const isVenmo = (account as any).payment_method?.name?.toLowerCase().includes("venmo") || 
                    (account as any).payment_method_name?.toLowerCase().includes("venmo") ||
                    (account as any).type?.toLowerCase().includes("venmo");
    const isCashApp = (account as any).payment_method?.name?.toLowerCase().includes("cash app") || 
                      (account as any).payment_method_name?.toLowerCase().includes("cash app") ||
                      (account as any).type?.toLowerCase().includes("cash app");

    // 1. Copy account details to clipboard
    const text = `
Currency: ${account.currency}
Country: ${account.country}

${(account as any).account_name ? `Account Name: ${(account as any).account_name}` : ""}
${(account as any).bank_name ? `Bank: ${(account as any).bank_name}` : ""}
${(account as any).account_number ? `Account Number: ${(account as any).account_number}` : ""}
${(account as any).username ? `${isCashApp ? "Cashtag" : "Username"}: ${(account as any).username}` : ""}
${(account as any).routing_number ? `${isVenmo ? "Last Digit(s)" : "Routing Number"}: ${(account as any).routing_number}` : ""}
${account.email ? `Email: ${account.email}` : ""}
${(account as any).extra_information ? `Info: ${(account as any).extra_information}` : ""}
    `.trim();

    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.error("Clipboard copy failed", e);
    }

    // 2. Notify the backend API
    setLoadingIds((prev) => [...prev, account.id]);
    try {
      await onSelect(account);
    } catch (err) {
      console.error("Failed to notify admin", err);
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== account.id));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      {/* Back */}
      <button
        onClick={onBack}
        className="text-sm text-gray-600 mb-6 hover:text-gray-800 transition"
      >
        ← Back
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {currency} Available Accounts
        </h3>
        <p className="text-sm text-gray-500">
          Copy details or notify admin after payment
        </p>
      </div>

      {/* Accounts */}
      <div className="space-y-4">
        {accounts.length === 0 && (
          <div className="text-center text-gray-500">No accounts available</div>
        )}

        {accounts.map((account, index) => {
          const isVenmo = (account as any).payment_method?.name?.toLowerCase().includes("venmo") || 
                          (account as any).payment_method_name?.toLowerCase().includes("venmo") ||
                          (account as any).type?.toLowerCase().includes("venmo");
          const isCashApp = (account as any).payment_method?.name?.toLowerCase().includes("cash app") || 
                            (account as any).payment_method_name?.toLowerCase().includes("cash app") ||
                            (account as any).type?.toLowerCase().includes("cash app");

          return (
            <div
              key={account.id || index}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <div className="p-6 space-y-3">
                {/* ACCOUNT NAME */}
                {(account as any).account_name && (
                  <Row
                    label="Account Name"
                    value={(account as any).account_name}
                  />
                )}

                {/* EMAIL */}
                {account.email && <Row label="Email" value={account.email} />}

                {/* USERNAME / CASHTAG */}
                {(account as any).username && (
                  <Row
                    label={isCashApp ? "Cashtag" : "Username"}
                    value={(account as any).username}
                  />
                )}

                {/* BANK */}
                {(account as any).bank_name && (
                  <Row label="Bank" value={(account as any).bank_name} />
                )}

                {/* ACCOUNT NUMBER */}
                {(account as any).account_number && (
                  <Row
                    label="Account Number"
                    value={(account as any).account_number}
                  />
                )}

                {/* ROUTING / LAST DIGITS */}
                {(account as any).routing_number && (
                  <Row
                    label={isVenmo ? "Last Digit(s)" : "Routing Number"}
                    value={(account as any).routing_number}
                  />
                )}

                {/* EXTRA INFO */}
                {(account as any).extra_information && (
                  <Row label="Info" value={(account as any).extra_information} />
                )}

                {/* COUNTRY */}
                <Row label="Country" value={account.country} />

                {/* ACTION BUTTON */}
                <div className="pt-4">
                  <button
                    onClick={() => handleCopyAndNotify(account)}
                    disabled={loadingIds.includes(account.id)}
                    className="w-full py-3.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {loadingIds.includes(account.id) ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Copy size={16} />
                    )}
                    Copy Details & Continue
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <CopySuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}

/* ---------------- ROW ---------------- */

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-semibold text-gray-800 text-right">
        {value}
      </span>
    </div>
  );
}
