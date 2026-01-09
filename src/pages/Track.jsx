import React, { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // path apne hisaab se check kar lena

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!orderId.trim()) {
      setError("Please enter Order ID");
      return;
    }

    setLoading(true);
    setError("");
    setOrderData(null);

    try {
      const orderRef = doc(db, "orders", orderId);
      const orderSnap = await getDoc(orderRef);

      if (orderSnap.exists()) {
        setOrderData(orderSnap.data());
      } else {
        setError("Order not found ❌");
      }
    } catch (err) {
      setError("Something went wrong");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Track Your Order
        </h2>

        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />

        <button
          onClick={handleTrack}
          className="bg-red-500 text-white w-full py-2 rounded"
        >
          {loading ? "Tracking..." : "Track Order"}
        </button>

        {error && (
          <p className="text-red-500 mt-3 text-center">{error}</p>
        )}

        {orderData && (
          <div className="mt-4 border-t pt-4">
            <p><b>Name:</b> {orderData.name}</p>
            <p><b>Phone:</b> {orderData.phone}</p>
            <p><b>Address:</b> {orderData.address}</p>
            <p><b>Status:</b> 
              <span className="ml-1 text-green-600 font-semibold">
                {orderData.status || "Pending"}
              </span>
            </p>
            <p><b>Total:</b> ₹{orderData.total}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;