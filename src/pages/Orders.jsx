// src/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { FaBox, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

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

  const getStatusIcon = (status) => {
    if (status === "Delivered") return <FaCheckCircle className="text-green-600 mr-2" />;
    if (status === "Cancelled") return <FaTimesCircle className="text-red-600 mr-2" />;
    return <FaClock className="text-yellow-500 mr-2" />;
  };

  const getStatusColor = (status) => {
    if (status === "Delivered") return "bg-green-100 border-green-400";
    if (status === "Cancelled") return "bg-red-100 border-red-400";
    return "bg-yellow-100 border-yellow-400";
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet. Place something delicious!</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`border-l-8 p-6 rounded-lg shadow-md bg-white dark:bg-gray-900 ${getStatusColor(order.status)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-100">
                  <FaBox className="mr-2 text-indigo-600" />
                  Order #{order.id.slice(0, 8)}
                </div>
                <div className="flex items-center text-sm font-medium">
                  {getStatusIcon(order.status)}
                  <span className="capitalize">{order.status || "Pending"}</span>
                </div>
              </div>

              <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                <strong>Items:</strong>{" "}
                {order.items?.map((item) => `${item.name} x${item.qty}`).join(", ")}
              </div>

              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
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