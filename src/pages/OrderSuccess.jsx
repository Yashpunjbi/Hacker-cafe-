// src/components/OrderHistory.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId") || "guest";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", userId),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const ordersData = [];
        querySnapshot.forEach((doc) => {
          ordersData.push({ id: doc.id, ...doc.data() });
        });
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [userId]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="p-4 border rounded bg-white shadow">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Payment:</strong> {order.method}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p className="text-sm text-gray-500">
                {order.createdAt?.toDate().toLocaleString()}
              </p>
              <ul className="mt-2 text-sm">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} × {item.quantity} — ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}