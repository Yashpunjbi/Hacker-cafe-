// src/components/PaymentOptions.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentOptions() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    const orderId = "ORD" + Date.now();

    // Order data prepare
    const orderData = {
      orderId,
      amount: totalAmount,
      method: paymentMethod,
      items: cartItems,
      date: new Date().toLocaleString()
    };

    // Save to localStorage (Order History / Admin Panel)
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem("cartItems");

    // Navigate to success page with state
    navigate("/order-success", {
      state: {
        orderId,
        amount: totalAmount,
        method: paymentMethod
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Choose Payment Method</h2>

      <div className="space-y-3">
        {/* COD Option */}
        <label className="block p-3 border rounded cursor-pointer">
          <input
            type="radio"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
            className="mr-2"
          />
          Cash on Delivery
        </label>

        {/* PhonePe / Google Pay Option */}
        <label className="block p-3 border rounded cursor-pointer">
          <input
            type="radio"
            value="PHONEPE"
            checked={paymentMethod === "PHONEPE"}
            onChange={() => setPaymentMethod("PHONEPE")}
            className="mr-2"
          />
          PhonePe / Google Pay
          {paymentMethod === "PHONEPE" && (
            <div className="mt-2 p-2 border rounded bg-gray-100">
              <p className="text-sm">
                Scan this QR or use UPI ID: <strong>hacker@upi</strong>
              </p>
              <img src="/upi-qr.png" alt="UPI QR" className="w-32 mt-2" />
            </div>
          )}
        </label>
      </div>

      {/* Summary */}
      <div className="mt-4 p-3 border rounded bg-gray-50">
        <p className="font-bold text-lg">Total Amount: ₹{totalAmount}</p>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
}