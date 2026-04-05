// components/dashboard/receivePayment/ReceiveAccountsList.tsx
"use client";

import { Copy } from "lucide-react";
import { InternationalAccount } from "@/store/globalPayment";

type Props = {
  accounts: InternationalAccount[];
  currency: string;
  onBack: () => void;
  onCopy: () => void;
};

export default function ReceiveAccountsList({
  accounts,
  currency,
  onBack,
  onCopy,
}: Props) {
  const handleCopyAccount = (account: InternationalAccount) => {
    const details = account.account_details || {};

    const text = `
Payment Method: ${account.payment_method}
Currency: ${account.currency}
Country: ${account.country}

${Object.entries(details)
  .map(([key, value]) => `${key}: ${value}`)
  .join("\n")}
    `.trim();

    navigator.clipboard.writeText(text);
    onCopy();
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="text-sm text-gray-600 mb-6 cursor-pointer hover:text-gray-800 transition"
      >
        ← Back
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
            <span className="text-lg">{currency === "USD" ? "🇺🇸" : "💰"}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            {currency} Available Accounts
          </h3>
        </div>
        <p className="text-sm text-gray-500">
          Select an account below and share details with your sender
        </p>
      </div>

      {/* Accounts List */}
      <div className="space-y-4">
        {accounts.map((account, index) => (
          <div
            key={account.id || index}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
          >
            {/* Account Header */}
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 px-6 py-4 border-b border-emerald-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-700 font-medium">
                    {account.payment_method}
                  </p>
                  <p className="text-xs text-emerald-600">
                    {account.currency} • {account.country}
                  </p>
                </div>
                <button
                  onClick={() => handleCopyAccount(account)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition cursor-pointer"
                >
                  <Copy size={16} />
                  Copy
                </button>
              </div>
            </div>

            {/* Account Details */}
            <div className="px-6 py-4 space-y-3">
              {account.account_details &&
                Object.entries(account.account_details).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-sm text-gray-600 capitalize">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {String(value)}
                    </span>
                  </div>
                ))}

              {account.email && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Email:</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {account.email}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Gender:</span>
                <span className="text-sm font-semibold text-gray-800 capitalize">
                  {account.gender}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
