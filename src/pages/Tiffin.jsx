import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Tiffin = () => {
  const [tiffins, setTiffins] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDocs(collection(db, "Tiffins"));
      setTiffins(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetch();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        🏫 School Tiffin Service
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tiffins.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-xl shadow p-3"
          >
            <img
              src={t.image}
              className="h-36 w-full object-cover rounded"
            />
            <h2 className="font-semibold mt-2">{t.name}</h2>
            <p className="text-green-600 font-bold">₹{t.price}</p>

            <button className="w-full bg-orange-500 text-white py-2 rounded mt-2">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tiffin;