import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const CategoryMenu = () => {
  const { categoryName } = useParams(); // URL se category name milega
  const [items, setItems] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "products"),
      where("category", "==", categoryName)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setItems(data);
    });

    return () => unsub();
  }, [categoryName]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 capitalize">{categoryName}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <div key={i} className="border rounded-xl p-3 shadow">
            <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover rounded" />
            <h3 className="font-semibold mt-2">{item.name}</h3>
            <p className="text-sm text-gray-500">₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;