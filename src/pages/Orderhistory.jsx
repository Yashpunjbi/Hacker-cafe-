// src/pages/OrderHistory.jsx
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, "orders"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        const userOrders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(userOrders);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5">
      <h2 className="text-2xl font-bold mb-4">Your Order History</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.id} className="border p-4 rounded-lg shadow-sm">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Items:</strong> {order.cart?.map(item => `${item.name} (x${item.qty})`).join(', ')}</p>
              <p><strong>Total:</strong> ₹{order.total || '—'}</p>
              <p><strong>Status:</strong> {order.status || 'Pending'}</p>
              <p><strong>Date:</strong> {order.date || 'N/A'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;