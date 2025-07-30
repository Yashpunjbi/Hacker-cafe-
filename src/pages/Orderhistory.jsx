import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;

    const fetchOrders = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const q = query(
            collection(db, "orders"),
            where("email", "==", user.email),
            orderBy("createdAt", "desc")
          );

          unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setOrders(data);
            setLoading(false);
          });
        } else {
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
        No orders found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6 text-pink-600 text-center">Your Order History</h2>
      {orders.map((order) => (
        <div key={order.id} className="border rounded-md p-4 mb-6 shadow-sm bg-white">
          <p className="text-sm text-gray-500 mb-1">
            <strong>Date:</strong>{" "}
            {order.createdAt?.toDate().toLocaleString() || "N/A"}
          </p>
          <p className="text-sm text-gray-500 mb-1">
            <strong>Order ID:</strong> {order.id}
          </p>
          <p className="text-sm text-gray-500 mb-1">
            <strong>Status:</strong> {order.status}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            <strong>Total:</strong> ₹{order.total}
          </p>

          <div className="mt-2">
            <p className="font-semibold text-gray-700">Items:</p>
            <ul className="pl-4 list-disc text-sm">
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} × {item.qty} — ₹{item.price}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;