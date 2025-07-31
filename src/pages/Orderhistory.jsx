// src/pages/Orders.jsx or OrderHistory.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(db, "orders"),
          where("email", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(data);
        setLoading(false);
      } else {
        setOrders([]);
        setLoading(false);
      }
    });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border p-4 rounded shadow bg-white dark:bg-gray-800"
            >
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><strong>Date:</strong> {new Date(order.timestamp?.toDate()).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;