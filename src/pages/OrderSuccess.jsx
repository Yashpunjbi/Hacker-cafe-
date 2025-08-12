// OrderSuccess.jsx
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function OrderSuccess() {
  const location = useLocation();
  const { amount, method, orderId, items } = location.state || {};

  useEffect(() => {
    const saveOrder = async () => {
      if (!orderId || !amount || !method || !items) return; // data missing तो save नहीं करेगा

      const userId = localStorage.getItem("userId") || "guest";

      const orderData = {
        userId,
        orderId,
        items,
        total: amount,
        method,
        createdAt: serverTimestamp()
      };

      try {
        await addDoc(collection(db, "orders"), orderData);
      } catch (error) {
        console.error("Error saving order in success page:", error);
      }
    };

    saveOrder();
  }, [amount, method, orderId, items]);

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col justify-center items-center p-6">
      <img
        src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
        alt="Success"
        className="w-20 h-20 mb-4"
      />
      <h1 className="text-2xl font-bold text-green-600">Order Successful!</h1>
      <p className="mt-2 text-gray-700">Thank you for your purchase.</p>

      <div className="mt-4 p-4 bg-gray-100 rounded-lg w-full">
        <p>
          <strong>Order ID:</strong> {orderId}
        </p>
        <p>
          <strong>Amount:</strong> ₹{amount?.toFixed(2)}
        </p>
        <p>
          <strong>Payment Method:</strong> {method}
        </p>
      </div>

      <Link
        to="/"
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
}