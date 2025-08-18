import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Copy } from "lucide-react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useCart(); // cart context se user nikal rahe hai
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) return;
      try {
        const q = query(
          collection(db, "orders"),
          where("email", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        const orderList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [user]);

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    alert("Order ID copied!");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 border rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">Order: {order.name}</p>
                <p>Price: ₹{order.total}</p>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-600">ID: {order.id}</p>
                  <button
                    onClick={() => handleCopy(order.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
              <button
                onClick={() => navigate(`/track/${order.id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
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