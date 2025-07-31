import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(db, 'orders'),
          where('email', '==', user.email),
          orderBy('createdAt', 'desc') // sort by newest
        );
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
            <div key={order.id} className="border rounded-lg p-4 shadow">
              <p className="text-sm text-gray-500">Order ID: {order.id}</p>
              <p><strong>Date:</strong> {order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleString() : 'N/A'}</p>
              <p><strong>Status:</strong> <span className="font-semibold">{order.status || 'Pending'}</span></p>

              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {order.items?.map((item, index) => (
                  <div key={index} className="border p-2 rounded flex items-center space-x-4">
                    <img
                      src={item.image || 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-2"><strong>Total:</strong> ₹{order.total || 'N/A'}</p>
              <p><strong>Address:</strong> {order.address}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;