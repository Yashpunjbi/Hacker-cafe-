
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Bike } from "lucide-react";

const steps = ["Placed", "Preparing", "Out for delivery", "Delivered"];

const Track = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const docRef = doc(db, "orders", orderId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setOrder(snap.data());
        }
      } catch (err) {
        console.error("Error fetching order:", err);
      }
    };

    fetchOrder();
  }, [orderId]);

  const currentStep = order?.status
    ? steps.indexOf(order.status)
    : -1; // Placed, Preparing, Out for delivery, Delivered

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        Track Your Order
      </h2>

      {/* Progress Bar */}
      <div className="relative flex justify-between items-center">
        {/* Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 -z-10"></div>

        {/* Steps */}
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center w-1/4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div>
            <p className="text-xs mt-2">{step}</p>
          </div>
        ))}

        {/* Animated Bike */}
        {currentStep >= 0 && (
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ type: "spring", stiffness: 70, damping: 15 }}
            className="absolute -top-8"
          >
            <Bike size={28} className="text-blue-600" />
          </motion.div>
        )}
      </div>

      {/* Details */}
      <div className="mt-8 p-4 border rounded-lg bg-white shadow">
        <p>
          <strong>Order ID:</strong> {orderId}
        </p>
        <p>
          <strong>Status:</strong> {order?.status || "Pending"}
        </p>
        <p>
          <strong>Total:</strong> ₹{order?.totalAmount || 0}
        </p>
        <p>
          <strong>Address:</strong> {order?.address || "-"}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {order?.createdAt?.toDate
            ? order.createdAt.toDate().toLocaleString()
            : "-"}
        </p>
      </div>
    </div>
  );
};

export default Track;