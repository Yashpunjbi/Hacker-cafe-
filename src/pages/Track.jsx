import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import {
  FaClipboardCheck,
  FaUtensils,
  FaMotorcycle,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const Track = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [statusIndex, setStatusIndex] = useState(0);

  const steps = [
    { label: "Order Placed", icon: <FaClipboardCheck /> },
    { label: "Preparing", icon: <FaUtensils /> },
    { label: "Out for Delivery", icon: <FaMotorcycle /> },
    { label: "Delivered", icon: <FaCheckCircle /> },
  ];

  const getStatusIndex = (status) => {
    switch (status) {
      case "placed":
        return 0;
      case "preparing":
        return 1;
      case "out for delivery":
        return 2;
      case "delivered":
        return 3;
      case "cancelled":
        return -1;
      default:
        return 0;
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const orderRef = doc(db, "orders", orderId);
      const orderSnap = await getDoc(orderRef);
      if (orderSnap.exists()) {
        const data = orderSnap.data();
        setOrder(data);
        setStatusIndex(getStatusIndex(data.status));
      }
    };
    fetchOrder();
  }, [orderId]);

  if (!order) return <div className="p-5 text-center text-gray-500">Loading...</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Track Order</h1>

      {/* Track Progress Bar */}
      <div className="bg-white shadow-md rounded-lg p-5 mb-4">
        {order.status === "cancelled" ? (
          <div className="text-center text-red-600">
            <FaTimesCircle size={50} className="mx-auto mb-2" />
            <p className="text-lg font-semibold">This order was cancelled</p>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center w-1/4">
                <div
                  className={`text-xl p-2 rounded-full ${
                    index <= statusIndex ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {step.icon}
                </div>
                <span
                  className={`text-sm mt-1 ${
                    index <= statusIndex ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {order.status !== "cancelled" && (
          <div className="text-center mt-4 text-sm text-gray-600">
            Your order is <span className="font-semibold text-green-600">{order.status}</span>
          </div>
        )}
      </div>

      {/* Restaurant Info */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="font-semibold text-gray-800 mb-2">Please reach</h2>
        <p className="text-sm text-gray-700">
          AIRPORT ROAD, INDORE<br />
          Shop no-1 Ground Floor, Itashree Residency, Mohta Baugh,<br />
          Airport Road, Indore, MP - 452005<br />
          📞 07312611260
        </p>
        <a
          href="https://www.google.com/maps"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm mt-2 inline-block"
        >
          Get Directions
        </a>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="font-semibold text-gray-800 mb-2">Order No #{orderId}</h2>
        <p className="text-sm text-gray-700 mb-1">
          Placed on: {new Date(order.createdAt).toLocaleString()}
        </p>
        <div className="mt-2 border-t pt-2">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm text-gray-800">
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm font-bold mt-2">
            <span>Total</span>
            <span>₹{order.items.reduce((sum, i) => sum + i.price, 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;