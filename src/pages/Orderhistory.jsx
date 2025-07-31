import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);
        const q = query(
          collection(db, "orders"),
          where("email", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(data);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧾 Order History</h1>
      {orders.length === 0 ? (
        <p>No orders yet!</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border p-4 rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">Order ID: {order.id}</p>
                <p>Status: <span className="capitalize">{order.status}</span></p>
                <p>Total: ₹{order.total}</p>
              </div>
              <Link
                to={`/track/${order.id}`}
                className="text-blue-600 underline"
              >
                Track →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;