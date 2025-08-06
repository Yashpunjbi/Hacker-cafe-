import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "categories"), (snap) => {
      setCategories(snap.docs.map((doc) => doc.data()));
    });
    return unsub;
  }, []);

  return (
    <div className="flex overflow-x-auto whitespace-nowrap py-3 px-2 gap-3 scrollbar-hide">
      {categories.map((cat, i) => (
        <div
          key={i}
          onClick={() => setSelectedCategory(cat.name)}
          className={`cursor-pointer px-4 py-2 rounded-full border 
            ${selectedCategory === cat.name ? "bg-black text-white" : "bg-gray-200 text-black"}
          `}
        >
          {cat.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;