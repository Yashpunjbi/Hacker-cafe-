import React from "react";

const Tiffin = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">🍱 School Tiffin<import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Tiffin = () => {
  const [tiffins, setTiffins] = useState([]);

  useEffect(() => {
    const fetchTiffins = async () => {
      const snap = await getDocs(collection(db, "tiffins"));
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTiffins(data);
    };
    fetchTiffins();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🍱 School Tiffin</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tiffins.map(t => (
          <div key={t.id} className="border rounded p-3">
            <img src={t.image} className="h-40 w-full object-cover rounded" />
            <h3 className="font-semibold mt-2">{t.name}</h3>
            <p className="text-green-600 font-bold">₹{t.price}</p>
            <p className="text-sm">
              {t.available ? "Available ✅" : "Not Available ❌"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tiffin;>
      <p>Page is working</p>
    </div>
  );
};

export default Tiffin;