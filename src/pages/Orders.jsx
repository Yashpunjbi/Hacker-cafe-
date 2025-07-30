import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Orders = () => {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      const q = query(
        collection(db, "orders"),
        where("email", "==", user.email),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const userOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(userOrders);
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  const getStatusColor = (status) => {
    if (status === "Delivered") return "bg-green-100 border-green-500 text-green-800";
    if (status === "Cancelled") return "bg-red-100 border-red-500 text-red-800";
    return "bg-yellow-100 border-yellow-500 text-yellow-800";
  };

  if (loading) return <div className="text-center py-6 text-gray-700">Loading your orders...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-pink-600">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`border-l-8 p-6 rounded-lg shadow-md bg-white ${getStatusColor(order.status)}`}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">Order #{order.id.slice(-6)}</h3>
                <span className="text-sm font-medium capitalize">
                  {order.status || "Placed"}
                </span>
              </div>

              <div className="text-sm text-gray-700 mb-4 space-y-1">
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

export default Orders;