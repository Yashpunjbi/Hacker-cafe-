import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setOrders([]);
          setLoading(false);
          return;
        }

        const ordersRef = collection(db, "orders");
        const q = query(
          ordersRef,
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);

        const fetchedOrders = [];
        querySnapshot.forEach((doc) => {
          fetchedOrders.push({ id: doc.id, ...doc.data() });
        });

        setOrders(fetchedOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center mt-6">Loading your orders...</p>;
  }

  if (orders.length === 0) {
    return <p className="text-center mt-6">No orders found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Your Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border p-4 rounded-lg shadow-md bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold">Order ID: {order.id}</p>
              <p className="text-gray-600">
                {order.items?.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}
                    {idx < order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>
              <p className="font-bold mt-1">₹{order.totalAmount}</p>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(order.id);
                  alert("Order ID copied!");
                }}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                Copy ID
              </button>
              <button
                onClick={() => navigate(`/track/${order.id}`)}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Track
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;