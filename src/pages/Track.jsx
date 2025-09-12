import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Pizza, CookingPot, Bike, Package } from "lucide-react";
import { db } from "../firebase";

const steps = [
  { icon: Pizza, label: "Order Placed", key: "placed" },
  { icon: CookingPot, label: "Preparing", key: "preparing" },
  { icon: Bike, label: "Out for Delivery", key: "outForDelivery" },
  { icon: Package, label: "Delivered", key: "delivered" },
];

export default function Track() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [elapsedTime, setElapsedTime] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const unsub = onSnapshot(doc(db, "orders", orderId), (snap) => {
      if (snap.exists()) {
        setOrder({ id: snap.id, ...snap.data() });
      } else {
        setOrder(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [orderId]);

  // running time ⏱️
  useEffect(() => {
    if (!order?.createdAt) return;
    const created = order.createdAt.toDate();
    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.floor((now - created) / 1000); // sec
      const min = Math.floor(diff / 60);
      const sec = diff % 60;
      setElapsedTime(`${min}m ${sec}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, [order?.createdAt]);

  if (loading) {
    return <div className="p-6 text-center">⏳ Loading your order...</div>;
  }

  if (!order) {
    return <div className="p-6 text-center text-red-500">❌ Order not found</div>;
  }

  const currentStep =
    steps.findIndex((s) => s.key === order.status) !== -1
      ? steps.findIndex((s) => s.key === order.status)
      : 0; // default to first step

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* Order Info */}
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold">Track Your Order</h1>
        <p className="text-gray-600">Order ID: {order.id}</p>
        <p className="text-gray-600">
          Placed On:{" "}
          {order?.createdAt?.toDate
            ? order.createdAt.toDate().toLocaleString()
            : "N/A"}
        </p>
        <p className="text-green-600 font-semibold">
          Running Time: {elapsedTime || "0m 0s"}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex flex-col gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const active = index <= currentStep;
          return (
            <div key={step.key} className="flex items-center gap-4">
              <div
                className={`p-3 rounded-full ${
                  active ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                <Icon size={24} />
              </div>
              <div>
                <p
                  className={`font-medium ${
                    active ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>
                {active && index === currentStep && (
                  <p className="text-xs text-gray-400">In Progress...</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}