// src/pages/OrderHistory.jsx

import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const email = user.email;
        setUserEmail(email);

        try {
          const q = query(
            collection(db, "orders"),
            where("email", "==", email),
            orderBy("createdAt", "desc")
          );
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(data);
        } catch (err) {
          console.error("Error fetching orders:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setUserEmail("");
        setOrders([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p className="text-center p-4">Loading your orders...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">
        Your Order History
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You have no past orders.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded shadow-sm bg-white">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">Order #{order.id.slice(-6)}</h3>
                <span className="text-sm text-gray-500">{order.status}</span>
              </div>
              <p className="text-gray-700 mb-1">
                <strong>Name:</strong> {order.name}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Phone:</strong> {order.phone}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Address:</strong> {order.address}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Total:</strong> ₹{order.total}
              </p>

              <ul className="pl-4 list-disc text-sm text-gray-700">
                {order.cart && order.cart.map((item, index) => (
                  <li key={index}>
                    {item.name} × {item.qty} = ₹{item.price * item.qty}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;