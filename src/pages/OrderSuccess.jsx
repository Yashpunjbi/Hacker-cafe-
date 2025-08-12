// src/components/OrderSuccess.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const { amount, method, orderId, items } = location.state || {};
  const userId = localStorage.getItem("userId") || "guest";

  useEffect(() => {
    const saveOrder = async () => {
      try {
        await addDoc(collection(db, "orders"), {
          userId,               // Customer identify करने के लिए
          items: items || [],   // Cart products
          total: amount || 0,   // Total amount
          method: method || "COD",
          orderId: orderId || `ORD-${Date.now()}`,
          createdAt: serverTimestamp()
        });

        console.log("Order saved in Firebase ✅");
      } catch (error) {
        console.error("Error saving order:", error);
      }
    };

    saveOrder();

    // 3 सेकंड बाद Order History पर redirect
    const timer = setTimeout(() => {
      navigate("/order-history");
    }, 3000);

    return () => clearTimeout(timer);
  }, [amount, method, orderId, items, userId, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-500 text-white">
      <svg
        className="w-24 h-24 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <h1 className="text-3xl font-bold">Order Successful!</h1>
      <p className="mt-2 text-lg">Redirecting to your order history...</p>
    </div>
  );
}