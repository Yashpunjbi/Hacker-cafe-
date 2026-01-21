import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const Tiffin = () => {
  const [tiffins, setTiffins] = useState([]);

  useEffect(() => {
    const fetchTiffins = async () => {
      const q = query(
        collection(db, "tiffins"),
        where("available", "==", true)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTiffins(data);
    };

    fetchTiffins();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
        🧒 School Tiffin Menu
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tiffins.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-44 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {item.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-green-600">
                  ₹{item.price}
                </span>
                <button className="bg-green-500 text-white px-4 py-1 rounded-full text-sm">
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tiffin;