import React, { useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Track = () => {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState("");

  const handleTrackOrder = async () => {
    setError("");
    setOrderData(null);

    if (!orderId.trim()) {
      setError("Please enter a valid Order ID.");
      return;
    }

    try {
      const docRef = doc(db, "orders", orderId.trim());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setOrderData(docSnap.data());
      } else {
        setError("Order not found. Please check your Order ID.");
      }
    } catch (err) {
      console.error("Error fetching order:", err);
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📦 Track Your Order</h2>
      <input
        type="text"
        placeholder="Enter your Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleTrackOrder}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Track Order
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {orderData && (
        <div className="mt-6 p-4 border rounded shadow bg-white">
          <h3 className="font-semibold text-lg mb-2">Order Status</h3>
          <p>Status: <strong>{orderData.status || "Pending"}</strong></p>
          <p>Items: {orderData.items?.map(item => item.name).join(", ")}</p>
          <p>Total Amount: ₹{orderData.total}</p>
          <p>Phone: {orderData.phone}</p>
          <p>Address: {orderData.address}</p>
          <p>Ordered On: {new Date(orderData.createdAt?.seconds * 1000).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default Track;