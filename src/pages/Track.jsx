import React, { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  Search,
  MapPin,
  Phone,
  User,
  IndianRupee,
  CheckCircle,
  CookingPot,
  Package,
  Bike,
} from "lucide-react";

const statusSteps = [
  { key: "Placed", label: "Order Placed", icon: CheckCircle },
  { key: "Preparing", label: "Preparing Food", icon: CookingPot },
  { key: "Ready", label: "Order Ready", icon: Package },
  { key: "OutForDelivery", label: "Out for Delivery", icon: Bike },
];

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
      console.error(err);
      setError("Something went wrong");
    }

    setLoading(false);
  };

  const getStepIndex = (status) =>
    statusSteps.findIndex((s) => s.key === status);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-red-500 text-white p-6 text-center">
          <h2 className="text-2xl font-bold">Track Your Order</h2>
          <p className="text-sm opacity-90 mt-1">
            Real-time order status
          </p>
        </div>

        {/* Input */}
        <div className="p-5 space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="border rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
              onClick={handleTrack}
              className="bg-red-500 text-white px-4 rounded-xl flex items-center gap-1"
            >
              <Search size={18} />
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-center text-sm">
              {error}
            </p>
          )}
        </div>

        {/* Order Data */}
        {orderData && (
          <div className="px-5 pb-5 space-y-5">

            {/* Status Timeline */}
            <div>
              <h3 className="font-semibold mb-3">Order Status</h3>
              <div className="space-y-4">
                {statusSteps.map((step, index) => {
                  const Icon = step.icon;
                  const active =
                    index <= getStepIndex(orderData.status);

                  return (
                    <div
                      key={step.key}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`w-9 h-9 flex items-center justify-center rounded-full ${
                          active
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          active ? "text-black" : "text-gray-500"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-2">
              <p className="flex items-center gap-2">
                <User size={16} /> {orderData.name}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} /> {orderData.phone}
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5" />
                {orderData.address}
              </p>
            </div>

            {/* Payment */}
            <div className="flex justify-between items-center border-t pt-3 text-sm font-semibold">
              <span className="flex items-center gap-1">
                <IndianRupee size={16} /> Total
              </span>
              <span className="text-green-600">
                ₹{orderData.total}
              </span>
            </div>
          </div>
        )}

        {loading && (
          <p className="text-center py-4 text-gray-500">
            Tracking your order...
          </p>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;