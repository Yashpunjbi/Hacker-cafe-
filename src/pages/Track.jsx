// src/pages/Track.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const steps = ["placed", "preparing", "out for delivery", "delivered"];

const Track = () => {
  const { currentUser } = useAuth();
  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = onSnapshot(doc(db, "users", currentUser.uid), (userDoc) => {
      const orderId = userDoc.data()?.latestOrderId;

      if (orderId) {
        const orderRef = doc(db, "orders", orderId);
        onSnapshot(orderRef, (orderDoc) => {
          if (orderDoc.exists()) {
            setLatestOrder({ id: orderDoc.id, ...orderDoc.data() });
          }
        });
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  const getStatusIndex = (status) => steps.indexOf(status?.toLowerCase());

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">📦 Track Your Order</h2>

      {!latestOrder ? (
        <p className="text-gray-500">No recent order found.</p>
      ) : (
        <div className="space-y-4">
          <p>
            <strong>Order ID:</strong> {latestOrder.id}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="capitalize text-blue-600 font-semibold">
              {latestOrder.status}
            </span>
          </p>

          <div className="mt-6">
            <div className="flex justify-between items-center text-sm font-medium text-gray-600">
              {steps.map((step, i) => (
                <div key={i} className="flex-1 text-center">
                  <div
                    className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
                      i <= getStatusIndex(latestOrder.status)
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="mt-2 capitalize">{step}</div>
                </div>
              ))}
            </div>
            <div className="h-1 w-full bg-gray-300 rounded-full mt-4 relative">
              <div
                className="h-1 bg-green-500 rounded-full absolute top-0 left-0 transition-all"
                style={{
                  width: `${((getStatusIndex(latestOrder.status) + 1) / steps.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Track;