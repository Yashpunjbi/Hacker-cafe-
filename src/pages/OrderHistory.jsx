import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(
          collection(db, "orders"),
          where("email", "==", user.email),
          orderBy("createdAt", "desc")
        );

        const unsubscribeSnap = onSnapshot(q, (snapshot) => {
          const fetchedOrders = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(fetchedOrders);
          setLoading(false);
        });

        return () => unsubscribeSnap();
      } else {
        setOrders([]);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  if (loading) return <p className="text-center">Loading orders...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={order.id}
              className="border rounded-lg shadow p-4 flex flex-col gap-3"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <p className="font-semibold">
                  {order.method === "COD" ? "Cash on Delivery" : "Takeaway"}
                </p>
                <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                  {order.status || "ORDER CONFIRMED"}
                </span>
              </div>

              {/* Order Info */}
              <p className="text-sm text-gray-600">
                Order #{index + 1} &nbsp; | &nbsp;
                {order.createdAt?.seconds
                  ? new Date(order.createdAt.seconds * 1000).toLocaleString()
                  : "N/A"}
              </p>

              {/* Item Preview */}
              <div className="border rounded-md p-3 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{order.items?.[0]?.name}</p>
                  <p className="text-sm text-gray-600">
                    Qty: {order.items?.[0]?.qty}
                  </p>
                </div>
                <p className="font-bold">₹{order.amount}</p>
              </div>

              {/* Track Button */}
              <button
                onClick={() =>
                  navigate("/track-order", { state: { order } })
                }
                className="bg-red-500 text-white py-2 rounded-md font-semibold"
              >
                Track
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;