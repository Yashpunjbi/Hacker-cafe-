import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { IndianRupee } from "lucide-react";

const Tiffin = () => {
  const [tiffins, setTiffins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tiffins"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTiffins(list);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading tiffins...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔴 TOP BANNER */}
      <div className="bg-red-500 text-white p-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold">🎒 School Tiffin</h1>
        <p className="text-sm opacity-90 mt-1">
          Fresh & healthy food for kids
        </p>
      </div>

      {/* 🧺 TIFFIN LIST */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tiffins.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No tiffin items available
          </p>
        ) : (
          tiffins.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover"
              />

              <div className="p-4">
                <h3 className="font-bold text-lg">{item.name}</h3>

                <p className="flex items-center gap-1 text-green-600 font-semibold mt-1">
                  <IndianRupee size={16} />
                  {item.price}
                </p>

                <button
                  disabled={!item.available}
                  className={`mt-3 w-full py-2 rounded-xl text-sm font-semibold ${
                    item.available
                      ? "bg-red-500 text-white"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  {item.available ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tiffin;