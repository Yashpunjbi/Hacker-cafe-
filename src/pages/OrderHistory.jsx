import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase"; // firebase.js me auth export karna
import { collection, query, where, getDocs } from "firebase/firestore";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = auth.currentUser; // current login user
        if (!user) {
          setLoading(false);
          return;
        }

        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);
        const ordersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersList);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading your orders...</p>;

  if (orders.length === 0) {
    return <p className="text-center mt-10">No past orders found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-4 border rounded-xl shadow-md bg-white flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-lg">{order.items?.[0]?.name || "Order"}</p>
              <p className="text-sm text-gray-600">Order ID: {order.id}</p>
              <p className="text-gray-800 font-medium">₹{order.totalPrice}</p>
            </div>
            <button
              onClick={() => (window.location.href = `/track/${order.id}`)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Track
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;