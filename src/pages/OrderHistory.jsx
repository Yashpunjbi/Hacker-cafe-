import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Copy } from "lucide-react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = auth.currentUser;
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

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    alert("Order ID copied!");
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading your orders...</p>;

  if (orders.length === 0)
    return <p className="text-center mt-10 text-gray-600">No past orders found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-red-600 text-center">Your Orders</h2>
      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-lg rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 transition hover:shadow-xl"
          >
            {/* Left Section: Order Info */}
            <div className="flex-1 space-y-2">
              <p className="font-semibold text-lg text-gray-800">
                {order.items?.[0]?.name || "Order Items"}
              </p>

              {/* Order ID */}
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                <button
                  onClick={() => handleCopy(order.id)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Copy Order ID"
                >
                  <Copy size={16} />
                </button>
              </div>

              {/* Total Amount */}
              <p className="text-gray-700 font-medium">
                Total: <span className="text-green-600">₹{order.amount || order.totalPrice}</span>
              </p>
            </div>

            {/* Right Section: Track Button */}
            <div className="mt-3 md:mt-0">
              <button
                onClick={() => navigate(`/track/${order.id}`)}
                className="px-5 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;