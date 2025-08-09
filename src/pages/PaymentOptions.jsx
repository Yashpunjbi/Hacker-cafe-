// src/pages/PaymentOptions.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentOptions() {
  const location = useLocation();
  const navigate = useNavigate();
  const billTotal = location.state?.total || 0; // Checkout से भेजा total amount

  const handleSelect = (method) => {
    console.log("Selected:", method);
    // यहाँ payment handling या order update कर सकते हो
    navigate("/order-confirmation");
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="text-gray-600 text-lg">←</button>
        <h2 className="text-lg font-semibold">Bill total: ₹{billTotal.toFixed(2)}</h2>
      </div>

      {/* Recommended */}
      <div className="p-4">
        <h3 className="text-xs text-gray-500 mb-2">RECOMMENDED</h3>
        <div
          onClick={() => handleSelect("Shriram One UPI")}
          className="bg-white border border-gray-200 p-3 rounded-lg flex items-center justify-between mb-2 cursor-pointer hover:bg-gray-100"
        >
          <span className="font-medium">Shriram One UPI</span>
        </div>
        <div
          onClick={() => handleSelect("Google Pay")}
          className="bg-white border border-gray-200 p-3 rounded-lg flex items-center justify-between mb-2 cursor-pointer hover:bg-gray-100"
        >
          <span className="font-medium">Google Pay UPI</span>
        </div>
        <div
          onClick={() => handleSelect("PhonePe")}
          className="bg-white border border-gray-200 p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-100"
        >
          <span className="font-medium">PhonePe UPI</span>
        </div>
      </div>

      {/* Cards */}
      <div className="p-4">
        <h3 className="text-xs text-gray-500 mb-2">CARDS</h3>
        <div
          onClick={() => handleSelect("Credit/Debit Card")}
          className="bg-white border border-gray-200 p-3 rounded-lg mb-2 cursor-pointer hover:bg-gray-100"
        >
          <span className="font-medium">Add credit or debit card</span>
        </div>
      </div>

      {/* Pay by UPI App */}
      <div className="p-4">
        <h3 className="text-xs text-gray-500 mb-2">PAY BY ANY UPI APP</h3>
        <div
          onClick={() => handleSelect("New UPI ID")}
          className="bg-white border border-gray-200 p-3 rounded-lg cursor-pointer hover:bg-gray-100"
        >
          <span className="font-medium">Add new UPI ID</span>
        </div>
      </div>

      {/* Wallets */}
      <div className="p-4">
        <h3 className="text-xs text-gray-500 mb-2">WALLETS</h3>
        <div
          onClick={() => handleSelect("Amazon Pay")}
          className="bg-white border border-gray-200 p-3 rounded-lg cursor-pointer hover:bg-gray-100"
        >
          <span className="font-medium">Amazon Pay Balance</span>
        </div>
      </div>

      {/* COD */}
      <div className="p-4">
        <h3 className="text-xs text-gray-500 mb-2">OTHER</h3>
        <div
          onClick={() => handleSelect("Cash on Delivery")}
          className="bg-white border border-gray-200 p-3 rounded-lg cursor-pointer hover:bg-gray-100"
        >
          <span className="font-medium">Cash on Delivery (COD)</span>
        </div>
      </div>
    </div>
  );
}