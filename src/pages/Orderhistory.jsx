import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const q = query(
          collection(db, "orders"),
          where("user", "==", currentUser.email),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(fetchedOrders);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="p-4 text-center text-gray-500">Loading your orders...</div>;

  if (!user) return <div className="p-4 text-center text-red-600">Please login to view order history.</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Order History</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-sm text-gray-600">Order ID: <span className="font-semibold">{order.id}</span></p>
                  <p className="text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <Link
                  to={`/track/${order.id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Details →
                </Link>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm font-semibold text-gray-700">
                  Total: ₹{order.items.reduce((sum, item) => sum + item.price, 0)}
                </p>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    order.status === "cancelled"
                      ? "bg-red-100 text-red-600"
                      : order.status === "delivered"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;