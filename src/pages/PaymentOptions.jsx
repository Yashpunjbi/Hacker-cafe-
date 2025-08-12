import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function PaymentOptions() {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const {
    name,
    address,
    phone,
    email,
    cart,
    itemsTotal,
    deliveryCharge,
    discount,
    totalAmount,
  } = location.state || {};

  const handlePlaceOrder = async () => {
    const userId = localStorage.getItem("userId") || "guest";

    const orderData = {
      userId,
      name: name || "Guest",
      email: email || "Not provided",
      phone: phone || "Not provided",
      address: address || "Not provided",
      items: cart,
      itemsTotal,
      deliveryCharge,
      discount,
      amount: totalAmount,
      method: paymentMethod,
      createdAt: serverTimestamp(),
    };

    try {
      // Save to Firebase & get document reference
      const docRef = await addDoc(collection(db, "orders"), orderData);

      // Add the Firebase-generated orderId to data
      const finalOrderData = { ...orderData, orderId: docRef.id };

      // Clear cart
      localStorage.removeItem("cartItems");

      // Navigate to success page with correct ID
      navigate("/order-success", {
        state: finalOrderData,
      });
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Choose Payment Method</h2>

      <div className="space-y-3">
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
                Scan QR or use UPI ID: <strong>hacker@upi</strong>
              </p>
              <img src="/upi-qr.png" alt="UPI QR" className="w-32 mt-2" />
            </div>
          )}
        </label>
      </div>

      <div className="mt-4 p-3 border rounded bg-gray-50">
        <p className="font-bold text-lg">Total Amount: ₹{totalAmount}</p>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
}