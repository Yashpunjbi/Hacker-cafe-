// src/pages/OrderHistory.jsx

import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";
import { format } from "date-fns";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Preparing: "bg-orange-100 text-orange-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const q = query(
            collection(db, "orders"),
            where("email", "==", user.email),
            orderBy("createdAt", "desc")
          );
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(data);
        } catch (err) {
          console.error("Error fetching orders:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setOrders([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p className="text-center p-4">Loading your orders...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
        🧾 Your Order History
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No past orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md p-5 border"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  Order #{order.id.slice(-6)}
                </h3>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${
                    statusColors[order.status] || "bg-gray-200 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-2">
                Placed on:{" "}
                {order.createdAt?.seconds
                  ? format(
                      new Date(order.createdAt.seconds * 1000),
                      "dd MMM yyyy, hh:mm a"
                    )
                  : "Unknown"}
              </p>

              <div className="mb-2 text-gray-700">
                <p>
                  <strong>Name:</strong> {order.name}
                </p>
                <p>
                  <strong>Phone:</strong> {order.phone}
                </p>
                <p>
                  <strong>Address:</strong> {order.address}
                </p>
              </div>

              <div className="mt-2 mb-3">
                <p className="font-medium text-gray-800 mb-1">Items:</p>
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item, i) => (
                    <span
                      key={i}
                      className="bg-pink-100 text-pink-700 text-sm px-3 py-1 rounded-full"
                    >
                      {item.name} × {item.qty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-right text-lg font-bold text-gray-800">
                Total: ₹{order.total}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;