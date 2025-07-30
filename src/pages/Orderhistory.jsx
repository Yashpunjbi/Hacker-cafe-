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

  if (loading) return <p className="text-center py-6">Loading your orders...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-purple-600">🧾 Order History</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg shadow-md mb-6 bg-white overflow-hidden"
          >
            <div className="p-4 border-b bg-gray-100">
              <p className="text-sm text-gray-600">Order No. <strong>#{order.id.slice(-6)}</strong></p>
              <p className="text-sm text-gray-600">
                {new Date(order.createdAt?.toDate?.()).toLocaleString()}
              </p>
            </div>

            <div className="p-4 space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="border-b pb-3">
                  <p className="font-semibold">{item.name}</p>
                  {item.crust && <p className="text-sm"><strong>Crust:</strong> {item.crust}</p>}
                  {item.size && <p className="text-sm"><strong>Size:</strong> {item.size}</p>}
                  {item.topping && (
                    <p className="text-sm"><strong>Topping:</strong> {item.topping}</p>
                  )}
                  <div className="flex justify-between mt-1 text-sm">
                    <span><strong>Qty:</strong> {item.qty}</span>
                    <span><strong>Sub Total:</strong> ₹{item.qty * item.price}</span>
                  </div>
                </div>
              ))}

              <div className="bg-gray-50 p-3 rounded text-sm">
                <p><strong>Order Type:</strong> Home Delivery</p>
                <p><strong>Order From:</strong> Mobile</p>
                <p><strong>Payment Method:</strong> {order.paymentMethod || "COD"}</p>
                <p><strong>Grand Total:</strong> ₹{order.total}</p>
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-100 flex justify-between items-center text-sm">
              <span className="font-medium text-green-600">✔️ {order.status || "Successful"}</span>
              <span className="font-medium text-gray-700">Total Items: {order.items.length}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;