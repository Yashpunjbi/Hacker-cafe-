import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase"; // make sure this is correctly imported
import { onAuthStateChanged } from "firebase/auth";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        const q = query(
          collection(db, "orders"),
          where("email", "==", user.email)
        );

        const unsubscribeOrders = onSnapshot(q, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(data);
        });

        return () => unsubscribeOrders();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">🧾 Order History</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-md p-4 mb-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Order ID: <strong>{order.id}</strong>
              </span>
              <span
                className={`text-sm px-2 py-1 rounded ${
                  order.status === "cancelled"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="text-sm text-gray-500 mb-2">
              Date: {order.createdAt}
            </div>

            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center mb-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded object-cover mr-3"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ₹{item.price} x {item.qty}
                  </p>
                </div>
              </div>
            ))}

            <div className="text-right mt-2 font-bold">
              Total: ₹{order.total}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;