// src/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Orders = () => {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      const q = query(
        collection(db, "orders"),
        where("email", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      const userOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(userOrders);
      setLoading(false);
    };
    fetchOrders();
  }, [user]);

  if (loading) return <div className="p-6 text-center text-gray-600">Loading your orders...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg shadow-lg p-6 bg-white dark:bg-gray-900 transition hover:shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-indigo-600">Order #{order.id.slice(0, 8)}</h3>
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {order.status || "Pending"}
                </span>
              </div>
              <div className="mb-2">
                <strong>Items:</strong>
                <ul className="list-disc list-inside ml-4 text-sm text-gray-700 dark:text-gray-300">
                  {order.items?.map((item, idx) => (
                    <li key={idx}>
                      {item.name} × {item.qty}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-4">
                <p><strong>Total:</strong> ₹{order.total || 0}</p>
                <p><strong>Date:</strong> {order.timestamp?.toDate().toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;