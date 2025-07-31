// src/pages/Track.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const statusSteps = ["placed", "preparing", "out for delivery", "delivered"];

const TrackOrder = () => {
  const location = useLocation();
  const orderId = new URLSearchParams(location.search).get("id");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderId) {
      const fetchOrder = async () => {
        const docRef = doc(db, "orders", orderId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setOrder(docSnap.data());
        }
      };
      fetchOrder();
    }
  }, [orderId]);

  const getStatusIndex = (status) => {
    return statusSteps.indexOf(status.toLowerCase());
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Track Your Order</h1>

      {!order ? (
        <p className="text-center text-gray-300">Loading...</p>
      ) : (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Order ID: {orderId}</h2>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Address:</strong> {order.address}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Items:</h3>
            <ul className="list-disc list-inside space-y-1">
              {order.cart?.map((item, index) => (
                <li key={index}>
                  {item.name} x {item.quantity} – ₹{item.price * item.quantity}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Order Status</h3>
            <div className="flex items-center justify-between gap-2">
              {statusSteps.map((step, index) => {
                const isActive = index <= getStatusIndex(order.status);
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 text-sm font-bold ${
                        isActive ? "bg-green-500 text-white" : "bg-gray-400 text-gray-700"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="text-xs text-center capitalize">{step}</span>
                    {index < statusSteps.length - 1 && (
                      <div className="w-full h-1 bg-gray-400 mt-1">
                        <div
                          className={`h-1 ${
                            isActive && getStatusIndex(order.status) > index
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;