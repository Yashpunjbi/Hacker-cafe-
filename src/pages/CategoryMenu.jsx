import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const CategoryMenu = () => {
  const { categoryName } = useParams(); // e.g. "pizza"
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("category", "==", categoryName.toLowerCase()) // lowercase match
        );
        const querySnapshot = await getDocs(q);
        const itemList = [];
        querySnapshot.forEach((doc) => {
          itemList.push({ id: doc.id, ...doc.data() });
        });
        setItems(itemList);
      } catch (error) {
        console.error("Error fetching category items:", error);
      }
    };

    fetchItems();
  }, [categoryName]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 capitalize">{categoryName}</h2>

      {items.length === 0 ? (
        <p>No items in this category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-3 shadow-md bg-white"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">₹{item.price}</p>
              <p className="text-xs text-gray-400 capitalize">
                Category: {item.category}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryMenu;