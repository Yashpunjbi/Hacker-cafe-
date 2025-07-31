// src/pages/OrderHistory.jsx
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);
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
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded p-4 shadow">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Date:</strong> {new Date(order.timestamp?.seconds * 1000).toLocaleString()}</p>
              <p><strong>Status:</strong> <span className="font-semibold">{order.status}</span></p>
              <p><strong>Items:</strong> {order.items.map(item => item.name).join(', ')}</p>
              <p><strong>Total:</strong> ₹{order.total || 'N/A'}</p>
              <p><strong>Address:</strong> {order.address}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;