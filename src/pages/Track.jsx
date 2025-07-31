// src/pages/Track.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const statusStages = ["placed", "preparing", "out for delivery", "delivered"];

const Track = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const docRef = doc(db, "orders", id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setOrder(snap.data());
      } else {
        setOrder(null);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) return <p className="text-center mt-10">Order not found...</p>;

  const currentIndex = statusStages.indexOf(order.status);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Track Your Order</h2>
      <div className="space-y-4">
        {statusStages.map((stage, idx) => (
          <div key={stage} className="flex items-center space-x-3">
            <div
              className={`w-4 h-4 rounded-full ${
                idx <= currentIndex ? "bg-green-500" : "bg-gray-300"
              }`}
            ></div>
            <p
              className={`${
                idx <= currentIndex ? "text-green-600 font-semibold" : "text-gray-500"
              }`}
            >
              {stage.charAt(0).toUpperCase() + stage.slice(1)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded shadow">
        <p><strong>Order ID:</strong> {id}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total:</strong> ₹{order.total}</p>
        <p><strong>Address:</strong> {order.address}</p>
      </div>
    </div>
  );
};

export default Track;