// components/dashboard/receivePayment/ReceiveErrorModal.tsx

import { XCircle } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  errorMessage?: string;
};

export default function ReceiveErrorModal({
  open,
  onClose,
  errorMessage,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-xl overflow-y-auto max-h-[85vh]">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Transaction Error
          </h3>

          <p className="text-gray-600 mb-6">
            {errorMessage ||
              "Unable to find available accounts. Please check your details and try again."}
          </p>

          <button
            onClick={onClose}
            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
