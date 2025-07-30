import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      const q = query(
        collection(db, "orders"),
        where("email", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      const fetchedOrders = [];
      querySnapshot.forEach((doc) => {
        fetchedOrders.push({ id: doc.id, ...doc.data() });
      });
      setOrders(fetchedOrders);
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Order History</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700"
            >
              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-black dark:text-white">Order ID:</strong> {order.id}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-black dark:text-white">Status:</strong> {order.status}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-black dark:text-white">Items:</strong>{" "}
                {order.cart?.map((item) => `${item.name} x${item.quantity}`).join(", ")}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-black dark:text-white">Total:</strong> ₹{order.total}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-black dark:text-white">Placed on:</strong>{" "}
                {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleString() : "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;