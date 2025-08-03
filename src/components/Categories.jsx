// src/components/Categories.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "categories"), (snap) => {
      setCategories(snap.docs.map((doc) => doc.data()));
    });
    return unsub;
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Explore Categories</h2>
      <div className="flex overflow-x-auto gap-3 scrollbar-hide">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex flex-col items-center w-[90px]"
          >
            <img
              src={cat.imageUrl}
              alt={cat.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
            />
            <p className="text-xs mt-1 text-center">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;