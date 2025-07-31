// src/pages/OrderHistory.jsx
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, 'orders'), where('email', '==', user.email));
        const querySnapshot = await getDocs(q);

        const fetchedOrders = [];
        querySnapshot.forEach((doc) => {
          fetchedOrders.push({ id: doc.id, ...doc.data() });
        });

        setOrders(fetchedOrders);
      } else {
        setOrders([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Order History</h2>

      {loading ? (
        <p className="text-center">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded p-4 shadow">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Date:</strong> {new Date(order.timestamp?.seconds * 1000).toLocaleString()}</p>
              <p><strong>Status:</strong> <span className="font-semibold">{order.status}</span></p>

              <div className="mt-4 space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 border p-2 rounded-md">
                    <img
                      src={item.image || "https://via.placeholder.com/60"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.qty} | ₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4"><strong>Total:</strong> ₹{order.total || 'N/A'}</p>
              <p><strong>Address:</strong> {order.address}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;