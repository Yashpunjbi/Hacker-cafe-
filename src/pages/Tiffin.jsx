import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Tiffin = () => {
  const [tiffins, setTiffins] = useState([]);

  useEffect(() => {
    const fetchTiffins = async () => {
      const snap = await getDocs(collection(db, "Tiffins"));
      setTiffins(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchTiffins();
  }, []);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        🏫 School Tiffin Service
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {tiffins.map((t) => (
          <div
            key={t.id}
            className={`bg-white rounded-2xl shadow-md overflow-hidden ${
              !t.available ? "opacity-70" : ""
            }`}
          >
            {/* Image */}
            <div className="relative">
              <img
                src={t.image}
                alt={t.name}
                className="h-40 w-full object-cover"
              />

              {/* Stock Badge */}
              <span
                className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full ${
                  t.available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {t.available ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Content */}
            <div className="p-3">
              <h2 className="font-semibold text-lg text-gray-800">
                {t.name}
              </h2>

              <p className="text-green-600 font-bold text-lg mt-1">
                ₹{t.price}
              </p>

              <button
                disabled={!t.available}
                className={`w-full mt-3 py-2 rounded-xl font-semibold transition ${
                  t.available
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {t.available ? "Add to Cart" : "Unavailable"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tiffin;