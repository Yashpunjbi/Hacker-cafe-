import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Pizza, CookingPot, Utensils, ShoppingBag } from "lucide-react";

const steps = [
  { label: "Order Confirmed", icon: Pizza },
  { label: "Being Prepared", icon: CookingPot }, // Oven replaced
  { label: "Order is Ready", icon: Utensils },
  { label: "Order Picked Up", icon: ShoppingBag },
];

const Track = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Live time update
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Real-time Firestore listener
    const docRef = doc(db, "orders", orderId);
    const unsubscribe = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        setOrder(snap.data());
      }
    });

    return () => unsubscribe();
  }, [orderId]);

  const currentStep = order?.status
    ? steps.findIndex((s) => s.label === order.status)
    : -1;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Track Your Order</h2>

      {/* Progress Tracker */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center relative">
          {/* Line */}
          <div className="absolute top-6 left-0 w-full h-1 bg-gray-300 -z-10"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= currentStep;
            return (
              <div key={index} className="flex flex-col items-center w-1/4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                    isActive
                      ? "bg-green-100 border-green-600 text-green-600"
                      : "bg-gray-100 border-gray-400 text-gray-400"
                  }`}
                >
                  <Icon size={24} />
                </div>
                <p
                  className={`text-sm mt-2 ${
                    isActive ? "text-green-600 font-medium" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Details */}
      <div className="mt-6 p-4 border rounded-lg bg-white shadow">
        <p>
          <strong>Order ID:</strong> {orderId}
        </p>
        <p>
          <strong>Total:</strong> ₹{order?.totalAmount || 0}
        </p>
        <p>
          <strong>Address:</strong> {order?.address || "-"}
        </p>
        <p>
          <strong>Order Placed:</strong>{" "}
          {order?.createdAt?.toDate
            ? order.createdAt.toDate().toLocaleString()
            : "-"}
        </p>
        <p>
          <strong>Current Time:</strong> {currentTime.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Track;