import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Track = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(db, 'orders'),
          where('email', '==', user.email),
          orderBy('timestamp', 'desc'),
          limit(1) // 👈 latest order only
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setOrder({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() });
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  if (!order) return <p className="text-center text-gray-600">No recent order found.</p>;

  const steps = ['Order Confirmed', 'Being Baked', 'Order is Ready', 'Order Picked Up'];
  const currentStep = steps.indexOf(order.status);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Track Your Order</h2>
      <div className="bg-white p-4 rounded shadow">
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>Items:</strong> {order.items.map((item) => item.name).join(', ')}</p>

        {/* Progress Steps */}
        <div className="mt-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center mb-2">
              <div
                className={`w-4 h-4 rounded-full mr-2 ${
                  index <= currentStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
              ></div>
              <span className={index <= currentStep ? 'font-semibold' : 'text-gray-500'}>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Track;