import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null); // ✅ Store email for debug

  useEffect(() => {
    let unsubscribe;

    const fetchOrders = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("✅ Logged in user:", user.email);
          setUserEmail(user.email);

          try {
            const q = query(
              collection(db, "orders"),
              where("email", "==", user.email),
              orderBy("createdAt", "desc")
            );

            unsubscribe = onSnapshot(
              q,
              (snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }));
                console.log("📦 Orders fetched:", data);
                setOrders(data);
                setLoading(false);
              },
              (error) => {
                console.error("❌ Snapshot error:", error);
                setLoading(false);
              }
            );
          } catch (error) {
            console.error("❌ Firestore query error:", error);
            setLoading(false);
          }
        } else {
          console.warn("⚠️ User not logged in");
          setOrders([]);
          setLoading(false);
        }
      });
    };

    fetchOrders();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600 font-medium text-lg">
        Loading your orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600 font-medium text-lg">
        No orders found for <strong>{userEmail}</strong>.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6 text-pink-600 text-center">
        Your Order History
      </h2>
      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-md p-4 mb-6 shadow-sm bg-white"
        >
          <p className="text-sm text-gray-500 mb-1">
            <strong>Date:</strong>{" "}
            {order.createdAt?.toDate?.().toLocaleString() || "N/A"}
          </p>
          <p className="text-sm text-gray-500 mb-1">
            <strong>Order ID:</strong> {order.id}
          </p>
          <p className="text-sm text-gray-500 mb-1">
            <strong>Status:</strong> {order.status || "Pending"}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            <strong>Total:</strong> ₹{order.total || "N/A"}
          </p>

          <div className="mt-2">
            <p className="font-semibold text-gray-700">Items:</p>
            <ul className="pl-4 list-disc text-sm">
              {Array.isArray(order.items)
                ? order.items.map((item, index) => (
                    <li key={index}>
                      {item.name || "Item"} × {item.qty || 1} — ₹
                      {item.price || "0"}
                    </li>
                  ))
                : "No items found"}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;