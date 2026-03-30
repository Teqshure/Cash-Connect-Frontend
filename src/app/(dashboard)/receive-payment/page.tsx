"use client";

import { useState } from "react";
import ReceivePaymentFlow from "../../../components/dashboard/receivePayment/ReceivePaymentFlow";

export default function ReceivePaymentPage() {
  const [isOpen, setIsOpen] = useState(true);

  const handleBack = () => {
    setIsOpen(false);
    // Add navigation logic here if needed
    // router.back() or router.push('/dashboard')
  };

  if (!isOpen) return null;

  return <ReceivePaymentFlow onBack={handleBack} />;
}
