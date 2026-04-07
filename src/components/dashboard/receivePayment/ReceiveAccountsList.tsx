"use client";

import { Copy } from "lucide-react";
import { InternationalAccount } from "@/store/globalPayment";

type Props = {
  accounts: InternationalAccount[];
  currency: string;
  onBack: () => void;
  onCopy: () => void;
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

  const handleCopyAccount = (account: InternationalAccount) => {
    console.log("📋 [COPY ACCOUNT]:", account);

    const text = `
Currency: ${account.currency}
Country: ${account.country}

${(account as any).account_name ? `Account Name: ${(account as any).account_name}` : ""}
${(account as any).bank_name ? `Bank: ${(account as any).bank_name}` : ""}
${(account as any).account_number ? `Account Number: ${(account as any).account_number}` : ""}
${(account as any).routing_number ? `Routing Number: ${(account as any).routing_number}` : ""}
${account.email ? `Email: ${account.email}` : ""}
${(account as any).extra_information ? `Info: ${(account as any).extra_information}` : ""}
    `.trim();

    navigator.clipboard.writeText(text);
    onCopy();
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

        {accounts.map((account, index) => (
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

              {/* ROUTING */}
              {(account as any).routing_number && (
                <Row
                  label="Routing Number"
                  value={(account as any).routing_number}
                />
              )}

              {/* EXTRA INFO */}
              {(account as any).extra_information && (
                <Row label="Info" value={(account as any).extra_information} />
              )}

              {/* COUNTRY */}
              <Row label="Country" value={account.country} />

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 pt-4">
                {/* COPY */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyAccount(account);
                  }}
                  className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition"
                >
                  <Copy size={16} className="inline mr-2" />
                  Copy Details
                </button>

                {/* NOTIFY ADMIN */}
                <button
                  onClick={() => {
                    console.log("📢 [NOTIFY ADMIN CLICKED]:", account);
                    onSelect(account);
                  }}
                  className="flex-1 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition"
                >
                  Notify Admin
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
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
