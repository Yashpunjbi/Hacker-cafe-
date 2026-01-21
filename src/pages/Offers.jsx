import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const SchoolTiffin = () => {
  const [tiffins, setTiffins] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDocs(collection(db, "tiffins"));
      setTiffins(snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(t => t.available));
    };
    fetch();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🍱 School Tiffin</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tiffins.map(t => (
          <div key={t.id} className="border rounded shadow p-2 bg-white">
            <img src={t.image} className="h-32 w-full object-cover rounded mb-2" />
            <h3 className="font-semibold">{t.name}</h3>
            <p className="text-green-600 font-bold">₹{t.price}</p>
            <button className="mt-2 bg-red-500 text-white w-full py-1 rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolTiffin;