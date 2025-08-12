// PaymentOptions.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentOptions() {
  const location = useLocation();
  const navigate = useNavigate();
  const billTotal = location.state?.total || 0;

  // Success redirect function
  const goToSuccess = (paymentMethod) => {
    navigate("/order-success", {
      state: {
        amount: billTotal,
        method: paymentMethod,
        orderId: "ORD" + Math.floor(Math.random() * 1000000),
      },
    });
  };

  // UPI payment handler
  const handleUPIPayment = (method) => {
    const upiURL = `upi://pay?pa=merchant@upi&pn=Merchant%20Name&mc=0000&tid=${Date.now()}&tr=TXN${Math.floor(
      Math.random() * 100000
    )}&tn=Order%20Payment&am=${billTotal}&cu=INR&url=https://yourapp.com`;

    // Open UPI App
    window.location.href = upiURL;

    // Simulate success after few seconds (real app में callback handle होगा)
    setTimeout(() => {
      goToSuccess(method);
    }, 4000);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          Bill total: ₹{billTotal.toFixed(2)}
        </h2>
      </div>

      <div className="p-4 space-y-3">
        {/* Google Pay */}
        <div
          onClick={() => handleUPIPayment("Google Pay")}
          className="bg-white border border-gray-200 p-3 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-gray-100"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Google_Pay_Logo.svg"
            alt="Google Pay"
            className="w-8 h-8"
          />
          <span className="text-gray-800 font-medium">Google Pay UPI</span>
        </div>

        {/* PhonePe */}
        <div
          onClick={() => handleUPIPayment("PhonePe")}
          className="bg-white border border-gray-200 p-3 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-gray-100"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/f0/PhonePe_Logo.svg"
            alt="PhonePe"
            className="w-8 h-8"
          />
          <span className="text-gray-800 font-medium">PhonePe UPI</span>
        </div>

        {/* Cash on Delivery */}
        <div
          onClick={() => goToSuccess("Cash on Delivery")}
          className="bg-white border border-gray-200 p-3 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-gray-100"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2331/2331966.png"
            alt="Cash on Delivery"
            className="w-8 h-8"
          />
          <span className="text-gray-800 font-medium">
            Cash on Delivery (COD)
          </span>
        </div>
      </div>
    </div>
  );
}