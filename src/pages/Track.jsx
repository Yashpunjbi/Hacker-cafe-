import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const statusStages = ["placed", "preparing", "out for delivery", "delivered"];

const Track = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const ref = doc(db, "orders", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setOrder(snap.data());
      }
    };
    fetchOrder();
  }, [id]);

  const getStageClass = (stage) => {
    const index = statusStages.indexOf(order?.status);
    const current = statusStages.indexOf(stage);
    if (order?.status === "cancelled") return "bg-red-500 text-white";
    if (current < index) return "bg-green-500 text-white";
    if (current === index) return "bg-yellow-500 text-white";
    return "bg-gray-300";
  };

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📦 Track Your Order</h1>
      {!order ? (
        <p>Loading...</p>
      ) : order.status === "cancelled" ? (
        <p className="text-red-600 font-semibold">Order Cancelled ❌</p>
      ) : (
        <div className="space-y-4">
          {statusStages.map((stage, i) => (
            <div key={i} className={`p-3 rounded ${getStageClass(stage)}`}>
              {i + 1}. {stage.toUpperCase()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Track;