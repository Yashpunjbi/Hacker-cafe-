// src/components/PaymentOptions.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function PaymentOptions() {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Checkout page se aaye data
  const { name, address, phone, email, cartItems } = location.state || {};

  // Agar location.state se cart na aaye to localStorage ka fallback
  const cart = cartItems || JSON.parse(localStorage.getItem("cartItems")) || [];

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    const orderId = "ORD" + Date.now();
    const userId = localStorage.getItem("userId") || "guest";

    // Order data prepare with customer details
    const orderData = {
      userId,
      orderId,
      name: name || "Guest",
      email: email || "Not provided",
      phone: phone || "Not provided",
      address: address || "Not provided",
      amount: totalAmount,
      method: paymentMethod,
      items: cart,
      createdAt: serverTimestamp(),
    };

    try {
      // Save to Firebase
      await addDoc(collection(db, "orders"), orderData);

      // Save locally (optional for instant UI update)
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      orders.push(orderData);
      localStorage.setItem("orders", JSON.stringify(orders));

      // Clear cart
      localStorage.removeItem("cartItems");

      // Navigate to success page
      navigate("/order-success", {
        state: {
          orderId,
          amount: totalAmount,
          method: paymentMethod,
          items: cart,
        },
      });
    } catch (error) {
      console.error("Error saving order:", error);
    }
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