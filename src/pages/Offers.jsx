// src/components/Offers.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const Offers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "offers"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOffers(data);
    });

    return () => unsub();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-red-500">🔥 Today's Offers</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={offer.imageUrl}
              alt={offer.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <h3 className="font-semibold text-lg">{offer.title}</h3>
              <p className="text-green-600 font-bold text-sm">₹{offer.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;