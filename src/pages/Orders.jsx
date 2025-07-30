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

  if (loading) return <div className="p-4">Loading your orders...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Order History</h2>
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
              <p><strong>Status:</strong> {order.status || "Pending"}</p>
              <p><strong>Items:</strong> {order.items?.map(i => `${i.name} x${i.qty}`).join(", ")}</p>
              <p><strong>Total:</strong> ₹{order.total || 0}</p>
              <p><strong>Placed on:</strong> {order.timestamp?.toDate().toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;