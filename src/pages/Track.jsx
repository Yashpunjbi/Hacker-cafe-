// src/pages/Track.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const statusStages = ["placed", "preparing", "out for delivery", "delivered"];

const Track = () => {
  const { orderId } = useParams();   // yaha se orderId aa raha hai
  const [order, setOrder] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;

      const docRef = doc(db, "orders", orderId);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        setOrder(snap.data());
        setNotFound(false);
      } else {
        setOrder(null);
        setNotFound(true);
      }
    };

    fetchOrder();
  }, [orderId]);

  const currentIndex = statusStages.indexOf(order?.status);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Track Your Order</h2>

      {notFound && (
        <p className="text-red-600 font-medium">
          Order not found. Please check the ID.
        </p>
      )}

      {order && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-3">Order Progress</h3>
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
                    idx <= currentIndex
                      ? "text-green-600 font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  {stage.charAt(0).toUpperCase() + stage.slice(1)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-1 text-sm">
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> ₹{order.total || order.totalPrice}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Date:</strong> {new Date(order.timestamp?.toDate()).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Track;