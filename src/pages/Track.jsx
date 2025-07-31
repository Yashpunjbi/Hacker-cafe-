// src/pages/Track.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Track = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const steps = [
    { key: "placed", label: "Order Placed", color: "bg-yellow-400" },
    { key: "preparing", label: "Preparing", color: "bg-orange-400" },
    { key: "ontheway", label: "On the Way", color: "bg-purple-500" },
    { key: "delivered", label: "Delivered", color: "bg-green-500" },
  ];

  useEffect(() => {
    const fetchOrder = async () => {
      const orderRef = doc(db, "orders", id);
      const orderSnap = await getDoc(orderRef);
      if (orderSnap.exists()) {
        setOrder(orderSnap.data());
      }
    };
    fetchOrder();
  }, [id]);

  const getStepIndex = () =>
    steps.findIndex((step) => step.key === order?.status) || 0;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">📍 Track Your Order</h2>

      {!order ? (
        <p className="text-center text-gray-500">Loading order status...</p>
      ) : (
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
                  index <= getStepIndex() ? step.color : "bg-gray-300"
                }`}
              >
                {index < getStepIndex() ? "✓" : index === getStepIndex() ? "⏳" : "•"}
              </div>
              <span className="ml-4 text-lg">{step.label}</span>
            </div>
          ))}

          <div className="mt-8 p-4 bg-gray-100 rounded shadow">
            <p><strong>👤 Name:</strong> {order.name}</p>
            <p><strong>📞 Phone:</strong> {order.phone}</p>
            <p><strong>📦 Items:</strong></p>
            <ul className="ml-4 list-disc">
              {order.items?.map((item, i) => (
                <li key={i}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Track;