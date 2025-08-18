import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // authentication context
import { db } from "../firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

const OrderHistory = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "orders"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        let data = [];
        snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
        setOrders(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-lg font-semibold">
        Loading your orders...
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-lg font-semibold">
        Please login to view your order history.
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-lg font-semibold">
        No orders found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Order ID: {order.id}
              </span>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status || "Pending"}
              </span>
            </div>
            <div className="text-gray-800 dark:text-gray-200">
              {order.items?.map((item, index) => (
                <p key={index}>
                  {item.name} x {item.quantity}
                </p>
              ))}
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Total: ₹{order.total || 0}
            </div>
            <div className="mt-1 text-xs text-gray-500">
              {order.createdAt?.toDate
                ? order.createdAt.toDate().toLocaleString()
                : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;