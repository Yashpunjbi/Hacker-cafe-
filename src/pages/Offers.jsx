import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Offers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      const snap = await getDocs(collection(db, "offers"));
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOffers(data);
    };
    fetchOffers();
  }, []);

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
        🎁 Special Offers
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-all"
          >
            {/* Banner */}
            <div className="relative">
              <img
                src={offer.banner}
                alt={offer.title}
                className="w-full h-44 object-cover"
              />
              {offer.tag && (
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                  {offer.tag}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800">
                {offer.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                {offer.description}
              </p>

              {/* Products */}
              <div className="bg-gray-100 rounded-lg p-3 mb-4">
                <h4 className="text-sm font-semibold mb-2 text-gray-700">
                  🧾 Items Included
                </h4>
                {offer.products?.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm text-gray-700 border-b last:border-none py-1"
                  >
                    <span>{item.name}</span>
                    <span className="font-semibold">₹{item.price}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-2 rounded-xl font-bold hover:opacity-90">
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {offers.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No offers available right now 😔
        </p>
      )}
    </div>
  );
};

export default Offers;