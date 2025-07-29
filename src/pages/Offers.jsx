import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Offers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      const querySnapshot = await getDocs(collection(db, "offers")); // Capital O here
      const offersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOffers(offersData);
    };
    fetchOffers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🎁 Current Offers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <div key={offer.id} className="border p-4 rounded shadow">
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h3 className="text-lg font-semibold">{offer.title}</h3>
            <p className="text-yellow-600 font-bold">₹{offer.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;