import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      const q = query(collection(db, "orders"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(data);
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-300">No orders found</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="bg-gray-800 p-4 rounded shadow-md">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Items:</strong></p>
              <ul className="ml-4 list-disc">
                {order.cart?.map((item, i) => (
                  <li key={i}>{item.name} x {item.quantity}</li>
                ))}
              </ul>
              <a
                href={`/track?id=${order.id}`}
                className="inline-block mt-2 text-sm text-blue-400 underline"
              >
                Track Order
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;