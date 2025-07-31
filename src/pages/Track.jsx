import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FaCheckCircle, FaShippingFast, FaUtensils, FaShoppingBag } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const steps = [
  { key: "placed", label: "Order Placed", icon: <FaShoppingBag /> },
  { key: "preparing", label: "Being Prepared", icon: <FaUtensils /> },
  { key: "out for delivery", label: "Out for Delivery", icon: <FaShippingFast /> },
  { key: "delivered", label: "Delivered", icon: <FaCheckCircle /> },
];

const Track = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const docRef = doc(db, "orders", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOrder({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) {
    return <div className="text-center mt-10">Loading order...</div>;
  }

  const currentStep = steps.findIndex((step) => step.key === order.status);

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Track Your Order</h2>

      {order.status === "cancelled" ? (
        <div className="bg-red-100 text-red-700 p-4 rounded shadow text-center text-lg font-semibold">
          Your order has been cancelled.
        </div>
      ) : (
        <div className="flex items-center justify-between relative mb-10">
          {steps.map((step, index) => (
            <div className="flex flex-col items-center text-center w-1/4" key={step.key}>
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white mb-2
                ${index <= currentStep ? "bg-green-500" : "bg-gray-300"}`}
              >
                {step.icon}
              </div>
              <span className={`text-sm ${index <= currentStep ? "text-black font-semibold" : "text-gray-400"}`}>
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div className="absolute top-5 left-[12.5%] w-3/4 h-1 bg-gray-300 z-0">
                  <div
                    className="h-1 bg-green-500 z-10"
                    style={{
                      width: `${(currentStep / (steps.length - 1)) * 100}%`,
                      transition: "width 0.3s ease-in-out",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-sm text-gray-600 bg-white p-4 rounded shadow">
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Items:</strong> {order.items?.map((item) => `${item.name} × ${item.quantity}`).join(", ")}</p>
        <p><strong>Phone:</strong> {order.phone}</p>
        <p><strong>Address:</strong> {order.address}</p>
      </div>
    </div>
  );
};

export default Track;