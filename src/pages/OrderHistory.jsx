
// src/pages/OrderHistory.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useCart(); // yahi se user email lena hai

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user?.email) {
          setLoading(false);
          return;
        }

        const q = query(
          collection(db, "orders"),
          where("email", "==", user.email)
        );
        const querySnapshot = await getDocs(q);

        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  const copyId = (id) => {
    navigator.clipboard.writeText(id);
    alert("Order ID copied!");
  };

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{order.name}</p>
                <p className="text-gray-600">₹{order.price}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    ID: {order.id.substring(0, 8)}...
                  </span>
                  <button
                    onClick={() => copyId(order.id)}
                    className="text-blue-600 text-xs"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <button
                onClick={() => navigate(`/track/${order.id}`)}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm"
              >
                Track
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}