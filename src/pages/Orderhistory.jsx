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
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);

        const q = query(
          collection(db, "orders"),
          where("email", "==", user.email),
          orderBy("createdAt", "desc")
        );

        const unsubscribeOrders = onSnapshot(
          q,
          (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setOrders(data);
            setLoading(false);
          },
          (error) => {
            console.error("Firestore Error:", error);
            setOrders([]);
            setLoading(false);
          }
        );

        return () => unsubscribeOrders();
      } else {
        setUserEmail(null);
        setOrders([]);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500 text-lg">Loading your orders...</div>
    );
  }

  if (!userEmail) {
    return (
      <div className="text-center mt-10 text-gray-600 text-lg">Please login to view your orders.</div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600 text-lg">No orders found.</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-6">
      <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">Your Order History</h2>
      {orders.map((order) => (
        <div key={order.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-500">
            <strong>Date:</strong>{" "}
            {order.createdAt?.toDate
              ? order.createdAt.toDate().toLocaleString()
              : "No date"}
          </p>
          <p className="text-sm text-gray-500"><strong>Order ID:</strong> {order.id}</p>
          <p className="text-sm text-gray-500"><strong>Status:</strong> {order.status}</p>
          <p className="text-sm text-gray-500"><strong>Total:</strong> ₹{order.total}</p>
          <p className="mt-2 font-semibold">Items:</p>
          <ul className="list-disc pl-5 text-sm">
            {order.items?.map((item, index) => (
              <li key={index}>
                {item.name} × {item.qty} — ₹{item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;