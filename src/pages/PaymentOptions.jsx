// src/pages/PaymentOptions.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentOptions() {
  const navigate = useNavigate();

  const handlePaymentSelect = (method) => {
    // यहां पर आप Firebase में order का payment method update कर सकते हैं
    console.log("Selected Payment Method:", method);
    // आगे payment process पर navigate कर सकते हैं
    navigate("/order-confirmation"); 
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Choose Payment Method</h1>

      {/* Payment Options */}
      <div className="space-y-4">
        <div
          onClick={() => handlePaymentSelect("COD")}
          className="border border-gray-300 rounded-lg p-4 flex justify-between items-center cursor-pointer hover:shadow-lg transition"
        >
          <span className="text-lg font-medium text-gray-700">Cash on Delivery (COD)</span>
          <span className="text-sm text-green-600 font-semibold">Pay on Delivery</span>
        </div>

        <div
          onClick={() => handlePaymentSelect("UPI")}
          className="border border-gray-300 rounded-lg p-4 flex justify-between items-center cursor-pointer hover:shadow-lg transition"
        >
          <span className="text-lg font-medium text-gray-700">UPI</span>
          <span className="text-sm text-blue-600 font-semibold">Google Pay / PhonePe / Paytm</span>
        </div>

        <div
          onClick={() => handlePaymentSelect("CARD")}
          className="border border-gray-300 rounded-lg p-4 flex justify-between items-center cursor-pointer hover:shadow-lg transition"
        >
          <span className="text-lg font-medium text-gray-700">Credit / Debit Card</span>
          <span className="text-sm text-purple-600 font-semibold">Visa / MasterCard / RuPay</span>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-6">
        <button
          onClick={() => navigate("/checkout")}
          className="px-4 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
          Back to Checkout
        </button>
      </div>
    </div>
  );
}