import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("✅ Logged-in user:", user.email);
        try {
          const q = query(
            collection(db, "orders"),
            where("email", "==", user.email),
            orderBy("createdAt", "desc")
          );
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("✅ Fetched orders:", data);
          setOrders(data);
        } catch (err) {
          console.error("❌ Error fetching orders:", err);
        } finally {
          setLoading(false);
        }
      } else {
        console.warn("⚠️ User not logged in");
        setOrders([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p className="text-center p-6 text-gray-600">Loading your orders...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-pink-600 mb-8 text-center">
        Your Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">
          You have no past orders.
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-200"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-lg text-gray-800">
                  Order #{order.id.slice(-6)}
                </h3>
                <span className="text-sm text-blue-600 font-medium capitalize">
                  {order.status || "Placed"}
                </span>
              </div>

              <div className="text-sm text-gray-700 space-y-1 mb-4">
                <p><strong>Name:</strong> {order.name}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Total:</strong> ₹{order.total}</p>
              </div>

              <div className="text-sm">
                <p className="font-semibold mb-1 text-gray-800">Items:</p>
                <ul className="list-disc ml-5 space-y-1 text-gray-700">
                  {order.items?.map((item, index) => (
                    <li key={index}>
                      {item.name} × {item.qty} = ₹{item.qty * item.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;