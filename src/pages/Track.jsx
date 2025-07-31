import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const statusSteps = ["placed", "preparing", "out_for_delivery", "delivered"];

const TrackOrder = () => {
  const { currentUser } = useAuth();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "orders"),
      where("userEmail", "==", currentUser.email),
      orderBy("createdAt", "desc"),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const latestOrder = snapshot.docs[0]?.data();
      setOrder(latestOrder);
    });

    return () => unsubscribe();
  }, [currentUser]);

  if (!currentUser) {
    return <div className="text-center mt-10">Please login to track your order.</div>;
  }

  if (!order) {
    return <div className="text-center mt-10">No active order found.</div>;
  }

  const currentStatus = statusSteps.indexOf(order.status);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">📦 Track Your Order</h2>
      <div className="flex flex-col gap-5">
        {statusSteps.map((step, index) => (
          <div key={step} className="flex items-center gap-4">
            <div className={`w-5 h-5 rounded-full 
              ${index <= currentStatus ? 'bg-green-500' : 'bg-gray-300'}`} />
            <div className={`${index <= currentStatus ? 'text-black font-medium' : 'text-gray-400'}`}>
              {step.replace(/_/g, ' ').toUpperCase()}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-500 text-center">
        Order ID: {order.id || 'Auto-ID'} <br />
        Last updated: {new Date(order.createdAt?.seconds * 1000).toLocaleString()}
      </p>
    </div>
  );
};

export default TrackOrder;